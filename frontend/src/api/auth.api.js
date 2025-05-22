import axios from "axios";


const API_URL = "/api/auth";

export const loginUser = async (email, password) => {
  
  return axios.post(
    `${API_URL}/login`,
    { email, password },
    { withCredentials: true }// as we use cookies
  );
};

export const registerUser = async(email,password) =>{
    return axios.post(
        `${API_URL}/signup`,
        { email,password},
        {withCredentials:true }
    )
}