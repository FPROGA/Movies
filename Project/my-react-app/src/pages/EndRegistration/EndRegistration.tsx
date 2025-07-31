import "./EndRegistration.css";
import { Button } from "../../components/Buttons/Button";
import { Logo } from "../../components/Logo/Logo";
import { CloseButton } from "../../components/Buttons/CloseButton";

function EndRegisterForm() {
  

  
  const onSubmit = () => {
    
  };
  return (
    <div className="container">
    
    <form className="register-form" onSubmit={onSubmit}>
      <div className="register-wrapper">
        <Logo size={35} position="center" />
      </div>

      <div className="form-wrapper">
        <h1> Регистрация завершена </h1>
        <p> Используйте вашу электронную почту для входа </p>
        <Button >
          Войти
        </Button>
      </div>
    </form>
    <CloseButton/>
    </div>
  );
}
export default EndRegisterForm;
