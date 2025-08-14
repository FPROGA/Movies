import { Link } from "react-router-dom";
import { Button } from "../../../components/Buttons";
import { useSelector } from "react-redux";
import { RootState } from "../../../features/auth/store";
import { uselogout } from "../../../hooks/Logout/uselogout";
import emailImage from "../../../assets/myaccount/email.svg";
import "./FetchSettings.css";

export function FetchSettings() {
  const name = useSelector((state: RootState) => state.auth.user.name);
  const email = useSelector((state: RootState) => state.auth.user.email);
  const surname = useSelector((state: RootState) => state.auth.user.surname);
  const logoutMutation = uselogout();

  const letterOfName = name?.toString().substring(0, 1).toLocaleLowerCase();
  const letterOfSurname = surname
    ?.toString()
    .substring(0, 1)
    .toLocaleLowerCase();

  const exit = () => {
    logoutMutation.mutate();
  };
  return (
    <div className="settings-page">
      <div className="name">
        <div className="name-image">
          {" "}
          {letterOfName} {letterOfSurname}
        </div>
        <div className="name-info">
          <h3>Имя Фамилия</h3>
          <div className="name-text">
            {name} {surname}{" "}
          </div>
        </div>
      </div>
      <div className="email">
        <img className="email-image" src={emailImage} />
        <div className="email-info">
          <h3>Электронная почта</h3>
          <div className="email-text">{email}</div>
        </div>
      </div>
      <Link to="/login">
        <Button className="logout-button" onClick={exit}>
          Выйти из аккаунта
        </Button>
      </Link>
    </div>
  );
}
