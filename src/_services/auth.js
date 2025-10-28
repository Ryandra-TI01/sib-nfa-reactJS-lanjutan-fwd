import { useJwt } from "react-jwt";
import API from "../_api"

// REGISTER USER
export const register = async ({ name, email, password, password_confirmation }) => {
    try {
        const { data } = await API.post('/register', { name, email, password, password_confirmation })
        return data
    } catch (error) {
        console.log(error);
        throw error
    }
}

// LOGIN USER
export const login = async ({ email, password }) => {
  try {
    const { data } = await API.post('/login', { email, password })
    return data
  } catch (error) {
    console.log(error);
    throw error
  }
}

// LOGOUT USER
export const logout = async ({token}) => {
    try {
        const { data } = await API.post('/logout', { token }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        return data
    } catch (error) {
        console.log(error);
        throw error
        
    }
}

// DECODE TOKEN
export const useDecodeToken = (token) => {
  const { decodedToken, isExpired } = useJwt(token);

  try {
    if (isExpired) {
      return {
        success: false,
        message: "Token expired",
        data: null
      }
    }

    return {
      success: true,
      message: "Token valid",
      data: decodedToken
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null
    }
  }
}