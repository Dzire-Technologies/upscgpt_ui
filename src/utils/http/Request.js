import axios from "axios";
import { useTokenStore } from "src/store/authStore";

const defaultConfig = {
  showLoader: true,
  fullLoader: false,
  loaderText: "Getting Data",
  allowAuthHeaders: true,
};


const defaultAxiosConfig = {
    withCredentials: true,
};


const Request = (method, url, data = {}, params = {}, config = {}, axiosConfig = {})=>{
    const allConfig = { ...defaultConfig, ...config };
    const allAxiosConfig = { ...defaultAxiosConfig, ...axiosConfig };


    const loaderContainer = document.querySelector(".dashboard-loader-container");
    const loaderTextPara = document.querySelector(".dashboard-loader-message");


    const token = useTokenStore.getState().token; // FIX: was `toke` and unused


    if (loaderContainer && allConfig.showLoader) {
        loaderContainer.style.display = "block";
        if (allConfig.fullLoader) {
            loaderContainer.style.width = "100%";
        }
        if (allConfig.loaderText && loaderTextPara) {
            loaderTextPara.innerHTML = allConfig.loaderText;
        }
    }


    const headers = {
        ...(allConfig.allowAuthHeaders && token ? { token } : {}), // backend expects `token`
        ...allAxiosConfig.headers,
    };


    const requestConfig = {
        method,
        url,
        data,
        params,
        headers,
        withCredentials: true,
        ...allAxiosConfig,
    };


    return new Promise((resolve, reject) => {
        axios
        .request(requestConfig)
        .then((response) => {
            if (loaderContainer) loaderContainer.style.display = "none";
            if (response.data?.status === false) return reject(response);
                return resolve(response);
        })
        .catch((error) => {
            if (loaderContainer) loaderContainer.style.display = "none";
            if (error.response?.status === 401) {
                window.location.href = "/";
                return null;
            }
            return reject(error);
        });
    });
};


export default Request;