import "./EndRegistration.css";
import { Button } from "../../components/Buttons/Button";
import { Logo } from "../../components/Logo/Logo";
import { CloseButton } from "../../components/Buttons/CloseButton";
import { Link } from "react-router-dom";

function EndRegisterForm() {
  

  
  const onSubmit = () => {
    
  };
  return (
    <div className="container">
    
    <form className="register-form" onSubmit={onSubmit}>
      <div className="register-wrapper">
        <Logo size={35} position="center" color={"black"}/>
      </div>

      <div className="form-wrapper">
        <h1 className="reg-end"> Регистрация завершена </h1>
        <p className="reg-end"> Используйте вашу электронную почту для входа </p>
        <Link to={`/login`} >
          <Button>Войти</Button>
        </Link>
      </div>
    </form>
    <CloseButton/>
    </div>
  );
}
export default EndRegisterForm;
