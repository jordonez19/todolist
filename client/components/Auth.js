import { useState } from "react";
import { useCookies } from "react-cookie";

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      setError("* Make sure password match!");
      return;
    }

    const response = await fetch(`http://localhost:8000/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data);
    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie("Email", data.email);
      setCookie("AuthToken", data.token);
      window.location.reload();
    }
  };

  return (
    <>
      <div className="auth-container">
        <div className="auth-container-box">
          <form>
            <h2>{isLogin ? "Please Log in" : "Please sign up "}</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input
              type={"email"}
              placeholder={"email"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type={"password"}
              placeholder={"password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isLogin && (
              <input
                type={"password"}
                placeholder={"confirm password"}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
            <input
              type={"submit"}
              className={"create"}
              onClick={(e) => {
                handleSubmit(e, isLogin ? "login" : "signup");
              }}
            />
          </form>
          <div className="auth-options">
            <button
              onClick={() => viewLogin(false)}
              style={{
                background: !isLogin
                  ? "rgb(255, 255, 255)"
                  : "rgb(188, 188, 188)",
              }}
            >
              Sign Up
            </button>
            <button
              onClick={() => viewLogin(true)}
              style={{
                background: !!isLogin
                  ? "rgb(255, 255, 255)"
                  : "rgb(188, 188, 188)",
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
