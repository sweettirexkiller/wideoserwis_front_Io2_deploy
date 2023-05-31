import axios from "axios";

// const apiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;
// export const API_URL = "https://videoserviceapi.azurewebsites.net";
export const API_URL = process.env.REACT_APP_API_URL;

const register = ( nickname, firstname, lastname,userType,email, password, avatarImage) => {
  return axios.post(API_URL + "/api/register", {
    nickname,
    name : firstname,
    Surname: lastname,
    userType,
    email,
    password,
    avatarImage
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