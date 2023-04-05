import axios from "axios";

export const API_URL = "https://videoserviceapi.azurewebsites.net";

const register = ( nickname, firstname, lastname,userType,email, password) => {
  return axios.post(API_URL + "/api/register", {
    nickname,
    name : firstname,
    Surname: lastname,
    userType,
    email,
    password,
    avatarImage: "twojamordka.png"
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "/api/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", JSON.stringify(response.data));
      }
      return response.data;
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

const logout = () => {
  localStorage.removeItem("token");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
