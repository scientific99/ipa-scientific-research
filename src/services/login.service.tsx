import axios from "axios";
import { API_BASE_URL } from "../constants";

export const sendLoginAdmin = (
    username: string,
    password: string
) => {
    axios.defaults.headers.common["Content-Type"] = "application/json";

    return axios
        .post(`${API_BASE_URL}/admin/login`, {
            username: username,
            password: password,
        })
        .then((response) => {
            if (response && response.data) {
                const accessToken = response.data["access_token"];
                localStorage.setItem('accessToken', accessToken);
                return true;
            } else {
                console.log(response);
                throw new Error("Invalid response from server");
            }
        });
};

export const getUrlTts = (
    text: string,
    lang_input: string,
    lang_output: string
) => {
    const encoded_text = encodeURIComponent(text)
    const url = `${API_BASE_URL}/translate/convert-tts?text=${encoded_text}&lang_input=${lang_input}&lang_output=${lang_output}`;
    return url
};