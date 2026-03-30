import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACKEND_URI;

const apiConstant = axios.create({
    baseURL: apiUrl,
    withCredentials: true
})

export async function register({ username, email, password }) {
    try {
        const response =await apiConstant.post('/auth/register', {
            username,
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }

}

export async function login({email,password}){
    try{
        const response = await apiConstant.post('/auth/login',{
            email,
            password
        });
        return response.data;
    }catch(err){
        console.log(err);
    }
}

export async function logout(){
    try{
        const response = await apiConstant.get('/auth/logout');
        return response.data;
    }catch(err){
        console.log(err);
    }
}

export async function getMe() {
    try {
        const response = await apiConstant.get('/auth/get-me');
        return response.data;
    } catch (error) {
        console.log(error)
    }
}