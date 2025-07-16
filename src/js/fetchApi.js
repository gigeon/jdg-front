import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8081",

});

// 세션 추가 필요
function HEADER_JSON() {
    return {
        headers: {
            "Content-Type": "application/json",
            
        }
    }
}

//세션 인증 필요
function checkSession() {

}

export default{
    get: function(path, param, onSuccess, onFail) {
        checkSession();
        let url = "/api" + path + "?";
        if (param instanceof Object) {
            for (let property in param) {
                url += `${property}=${param[property]}&`;
            }
        }

        axiosInstance
            .get(url, HEADER_JSON())
            .then((res) => onSuccess?.(res.data))
            .catch((err) => onFail?.(err));
    },
    write: function(path, param, onSuccess, onFail) {
        axiosInstance
            .post("/api" + path, param, {
                ...HEADER_JSON(),
                withCredentials: true,
            })
            .then((res) => onSuccess?.(res.data))
            .catch((err) => onFail?.(err));
    },
}