import { useContext, useRef } from 'react';
import './login.css';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';

function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    ); //as we have stated in the apiCall.js, we use the userCredentials first and then dispatch
  };

  console.log(user);
  return (
    <div className="login">
      <div className="loginwrapper">
        <div className="logintop">
          <div className="loginlogo">XUPP</div>
          <span className="logindesc">
            Connect with friends and the world around you on <span>XUPP</span>
          </span>
        </div>
        <div className="loginmain">
          <form className="loginbox" onSubmit={handleClick}>
            <input
              type="email"
              required
              placeholder="Email"
              className="logininput"
              ref={email}
            />
            <input
              type="password"
              required
              minLength="6"
              placeholder="Password"
              className="logininput"
              ref={password}
            />
            <button className="loginbutton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress style={{ color: 'white' }} />
              ) : (
                'Log in'
              )}
            </button>
            <span className="loginforgot">Forgot Password?</span>
            <button className="loginregisterbutton">
              {isFetching ? (
                <CircularProgress style={{ color: 'white' }} />
              ) : (
                'Create new account'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
