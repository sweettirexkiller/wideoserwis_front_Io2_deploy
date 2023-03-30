import axios from "axios";

const API_URL = "https://videoserviceapi.azurewebsites.net";

const register = ( nickname, name, lastname,userType,email, password) => {
  return axios.post(API_URL + "/api/register", {
    nickname,
    name,
    lastname,
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
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      // console.log(response.data.accessToken);

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
