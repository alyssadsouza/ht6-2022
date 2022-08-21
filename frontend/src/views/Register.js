import { Link } from 'react-router-dom';
import './Login.css';
function Register() {
  return <div className="Login Login">
    <div className="Login TitleSummary">
      <h3>Register</h3>
      <div className="Login container">
        <b>email:</b>
        <div className="Login containerFormInput">
        <form action="/action_page.php" onsubmit="return validateForm()" method="post">
           <input type="text" id="email" />
        </form>

        <b>password:</b>
        <form action="/action_page.php" onsubmit="return validateForm()" method="post">
           <input type="password" id="pass"/>
        </form>

        <b>confirm password:</b>
        <form action="/action_page.php" onsubmit="return validateForm()" method="post">
           <input type="password" id="pass"/>
        </form>
        </div>
      </div>
    <div className="Login tapIn">
    <Link to="/">
      <b>Tap In!</b>
      </Link>
    </div>

    <b>Already have an account?</b>
    <br></br>
    <Link to="/login">
    <b>Login</b>
    </Link>
    </div>
    </div>;
}

export default Register;