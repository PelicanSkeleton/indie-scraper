import axios from "axios";

export default {
    getUser: function () {
        return axios.get("/auth/user");
    },
    logout: function () {
        return axios.post("/auth/logout");
    },
    login: function (username, password) {
        return axios.post("/auth/login", { username, password });
    },
    signup: function (userData) {
        return axios.post("/auth/signup", userData);
    }
};