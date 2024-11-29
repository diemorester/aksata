import axiosInstance from "../axios"

export const registerUser = async (payload: IRegister) => {
    const res = await axiosInstance.post(`user/register`, {
        name: payload.name,
        email: payload.email,
        password: payload.password
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    return res
}

export const fetchEmail = async (token: string) => {
    const res = await axiosInstance.patch(`user/verify`, {

    }, {
        headers: {

            Authorization: `Bearer ${token}`
        }
    })
    return res
}

export const loginUser = async (payload: ILogin) => {
    const res = await axiosInstance.post(`user/login`, {
        email: payload.email,
        password: payload.password
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res
}

export const forgotPasswordFetch = async (payload: {email: string}) => {
    const res = await axiosInstance.post('user/forgot-password', {
        email: payload.email
    });
    return res
}

export const resetPasswordFetch = async (password: string, token: string) => {
    const res = await axiosInstance.post('user/reset-password', {
        password
    }, {headers: {
        Authorization: `Bearer ${token}`
    }});
    return res
}