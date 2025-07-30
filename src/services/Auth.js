import { API_URL } from "src/config/const";
import { supabase } from "src/integrations/supabase/client";
import PostService from "src/utils/http/PostService";

export const GetUserDetails = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) throw error;
    return { data: user };
};

export const getBackendToken = async (data) => {
    let apiURL = '/login'
    const token = await PostService(API_URL + apiURL, {
        email: data.email,
        name: data.name,
        profile_pic: data.picture
    })
    return token
}

export const AuthLogoutService = async () => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        window.location.href = '/';
    } catch (error) {
        console.error("logout failed:", error);
    }  
};

export const AuthLoginService = () => {
    window.location.href = '/';  
};
