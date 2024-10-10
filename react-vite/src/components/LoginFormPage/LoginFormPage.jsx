import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import logo from '/logo.jpg'
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  const handleDemo = async (e) => {
    e.preventDefault()
    const serverResponse = await dispatch(
      thunkLogin({
        email: 'demo@aa.io',
        password: 'password',
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  const handleNavigate = (e) => {
    e.preventDefault()
    navigate('/signup')
  }

  return (
    <>
      <div className="login-outer-container">
        <div className='login-inner-container'>
          <h1 className="title-h1">WELCOME TO</h1>
          <img className='login-signup-logo' src={logo} alt="logo" />
          {errors.length > 0 &&
            errors.map((message) => <p className="errors" key={message}>{message}</p>)}
          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p className="errors">{errors.email}</p>}
            <label>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <p className="errors">{errors.password}</p>}
            <button className="login-submit" type="submit">Log In</button>
          </form>
          <button onClick={handleNavigate}>Sign Up</button>
          <button onClick={handleDemo}>Log In as Demo</button>
        </div>
      </div>

    </>
  );
}

export default LoginFormPage;
