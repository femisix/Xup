import axios from "axios";

export const loginCall = async (userCredentials, dispatch) =>{
    dispatch({ type: "LOGIN_START" });

    try{
        const res = await axios.post("auth/login", userCredentials)
        dispatch({type:"LOGIN_SUCCESS", payload:res.data});         //reason why i put data is cos this response includes our data, status, etc
    }catch(err){
        dispatch({type:"LOGIN_FAILURE", payload:err});         
    }
};
