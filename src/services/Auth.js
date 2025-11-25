// src/services/Auth.js
// Central auth helpers that talk to your FastAPI backend.
//
// Exports:
//  - exchangeCodeForUser(code)
//  - getBackendToken({ email, name, profile_pic })
//  - startGoogleLogin()
//  - GetUserDetails(tokenParam)
//  - AuthLogoutService(tokenParam)
//  - AuthLoginService() (alias)

import { API_URL } from "src/config/const";
import PostService from "src/utils/http/PostService";
import { useTokenStore, storeToken } from "src/store/authStore";

/**
 * Exchange the OAuth code with your backend which calls Google token/userinfo.
 * Backend endpoint: GET /auth/google?code=...
 * Returns backend JSON (e.g. { email, name, picture } or wrapped in .data)
 */
export const exchangeCodeForUser = async (code) => {
  try {
    const res = await fetch(`${API_URL}/auth/google?code=${code}`);
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json?.message || "Failed to exchange code for user");
    }
    // return raw json so callers can look into .data or top-level fields
    return json;
  } catch (e) {
    console.error("exchangeCodeForUser error:", e);
    throw e;
  }
};

/**
 * Calls backend /login to mint app token. Expects `data` with
 * { email, name, profile_pic }.
 * Returns object: { token, raw } — token is string or null.
 */
export const getBackendToken = async (data) => {
  try {
    const res = await PostService(
      `${API_URL}/login`,
      {
        email: data.email,
        name: data.name,
        profile_pic: data.profile_pic || data.picture || data.avatar,
      },
      { allowAuthHeaders: false }
    );

    const payload = res?.data || res;
    const token =
      payload?.data?.x_token ||
      payload?.data?.token ||
      payload?.token ||
      payload?.x_token ||
      null;

    return { token, raw: payload };
  } catch (e) {
    console.error("getBackendToken error:", e);
    throw e;
  }
};

/**
 * Start full OAuth flow by asking backend for its Google login URL (/login/google),
 * then redirecting the browser.
 */
export const startGoogleLogin = async () => {
  try {
    const res = await fetch(`${API_URL}/login/google`); // , { credentials: "include" }
    const json = await res.json();
    if (!res.ok) throw new Error(json?.message || "Failed to get login URL");
    const url = json?.url || json?.data?.url;
    if (!url) throw new Error("Login URL missing in backend response");
    window.location.href = url;
  } catch (e) {
    console.error("startGoogleLogin error:", e);
    throw e;
  }
};

/**
 * Fetch logged-in user's profile from backend (/profile).
 * If `tokenParam` not provided, uses localStorage.x_token or token from store.
 * Returns backend response.data (expected fields: email, name, profile_pic, chats, etc.)
 */
export const GetUserDetails = async (tokenParam) => {
  try {
    const token =
      tokenParam || useTokenStore.getState().token || localStorage.getItem("x_token");
    if (!token) return null;

    const res = await fetch(`${API_URL}/profile`, {
      method: "GET",
      headers: { token },
      // credentials: "include",
    });

    const json = await res.json();
    if (!res.ok) {
      throw new Error(json?.message || "Failed to get profile");
    }

    return json.data ? json.data : json;
  } catch (e) {
    console.error("GetUserDetails error:", e);
    throw e;
  }
};

/**
 * Logout: call backend /logout (DELETE) and clear client token
 */
export const AuthLogoutService = async (tokenParam) => {
  try {
    const token = tokenParam || localStorage.getItem("x_token") || useTokenStore.getState().token;
    if (!token) {
      storeToken("");
      localStorage.removeItem("x_token");
      window.location.href = "/";
      return true;
    }

    const res = await fetch(`${API_URL}/logout`, {
      method: "DELETE",
      headers: { token },
      // credentials: "include",
    });

    storeToken("");
    localStorage.removeItem("x_token");

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      console.warn("Logout returned non-ok:", json);
    }

    window.location.href = "/";
    return true;
  } catch (e) {
    console.error("AuthLogoutService error:", e);
    storeToken("");
    localStorage.removeItem("x_token");
    window.location.href = "/";
    return false;
  }
};

/** Alias */
export const AuthLoginService = () => {
  startGoogleLogin();
};
