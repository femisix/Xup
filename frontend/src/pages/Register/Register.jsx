import "./register.css";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from 'react-router';

function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate();
    

    const handleClick = async (e) =>{
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            passwordAgain.current.setCustomValidity("Passwords don't match!");           //the notification will show on the passwordAgain input area
        }else{
            const user ={
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            try{
                await axios.post("/auth/register", user);
                navigate("/login");
            }catch(err){
                console.log(err);
            }

        }

    }

  return (
    <div className='login'>
        <div className="loginwrapper">
            <div className="logintop">
                <div className="loginlogo">XUPP</div>
                <span className="logindesc">Connect with friends and the world around you on <span>XUPP</span></span>
            </div>
            <div className="loginmain">
                <form className="loginbox" onSubmit={handleClick}>
                    <input placeholder="Username" required ref={username} className="logininput" />
                    <input placeholder="Email" type="email" required ref={email} className="logininput" />
                    <input placeholder="Password" minLength="6" type="password" required ref={password} className="logininput" />
                    <input placeholder="Password again" minLength="6" type="password" required ref={passwordAgain} className="logininput" />
                    <button className="loginbutton" type="submit">Sign up</button>
                    <button className="loginregisterbutton">Log into Account</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register