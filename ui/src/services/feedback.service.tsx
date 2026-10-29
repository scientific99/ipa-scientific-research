import axios from "axios";
import { API_BASE_URL } from "../constants";

export const send_feedback = (
    fullName: any,
    jobTitle: any,
    description: any
) => {
    axios.defaults.headers.common["Content-Type"] =
        "application/json charset=utf-8";

    return axios
        .post(`${API_BASE_URL}/feedback/send`, {
            full_name: fullName,
            job_title: jobTitle,
            description: description
        })
        .then((response) => {
            if (response && response.data) {
                return response.data.data;
            } else {
                console.log(response)
                throw new Error("Invalid response from server");
            }
        });
};

export const getListFeedback = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        throw new Error("Token not found in localStorage");
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.defaults.headers.common["Content-Type"] = "application/json";

    return axios
        .get(`${API_BASE_URL}/feedback/get`)
        .then((response) => {
            if (response && response.data) {
                return response.data.data;
            } else {
                console.log(response)
                throw new Error("Invalid response from server");
            }
        });
};