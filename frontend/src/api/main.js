import axios from "axios";
import { initialize } from "../redux/slices/userSlice";

export const infoLoader = async (dispatch) => {
    try {
        
        const resp = await axios({
            url: '/info',
            method: 'get',
        })

        if(resp.data.auth){
            dispatch(initialize(resp.data))
        }

    } catch (error) {
        dispatch(initialize({auth: false, userId: '', user: {}}))
    }
}

export const login = async (data) => {
    try {
        const resp = await axios({
            url: '/login',
            method: 'post',
            data
        })

        return resp.data
    } catch (error) {
        return {success: false, message: 'Some error occurred'}
    }
}

export const register = async (data) => {
    try {
        const resp = await axios({
            url: '/register',
            method: 'post',
            data
        })

        return resp.data
    } catch (error) {
        return {success: false, message: 'Some error occurred'}
    }
}