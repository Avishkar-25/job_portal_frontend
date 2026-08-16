import axios from "axios";

const api = axios.create({
    baseURL: "https://job-portal-backend-ijso.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});


// =========================
// Request Interceptor
// =========================

api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => Promise.reject(error)
);


// =========================
// Response Interceptor
// =========================

api.interceptors.response.use(
    (response) => response,

    (error) => {

        if (error.response) {

            switch (error.response.status) {

                case 401: {

                    const userType =
                        localStorage.getItem("userType");

                    localStorage.removeItem("token");
                    localStorage.removeItem("userType");

                    if (userType === "company") {

                        window.location.href =
                            "/company/login";

                    } else {

                        window.location.href =
                            "/employee/login";
                    }

                    break;
                }


                case 403:

                    alert("Access Denied");

                    break;


                case 500:

                    console.error(
                        "Internal Server Error"
                    );

                    break;


                default:
                    break;
            }
        }

        return Promise.reject(error);
    }
);


export default api;