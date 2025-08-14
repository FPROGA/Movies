import { zodResolver } from "@hookform/resolvers/zod";
import "./LoginForm.css";
import { useForm } from "react-hook-form";
import { FormField } from "../../components/FormField";
import { getUser, loginUser, UserLog, UserLogSchema } from "../../api/User";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { Button } from "../../components/Buttons/Button";
import { Logo } from "../../components/Logo/Logo";
import { BlackButton } from "../../components/Buttons/BlackButton";
import { CloseButton } from "../../components/Buttons/CloseButton";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/auth/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { uselogout } from "../../hooks/Logout/uselogout";

function LoginForm() {
  const logoutMutation = uselogout();
  const navigate = useNavigate();
  const exit = () => {
    navigate("/login");
    logoutMutation.mutate();
  };

  const dispatch = useDispatch();
  const getUserQuery = useQuery(
    {
      queryKey: ["getUser"],
      queryFn: () => getUser(),
      staleTime: 1000 * 60 * 5,
    },
    queryClient
  );

  if (getUserQuery.isError) {
    console.error("Ошибка получения пользователя:", getUserQuery.error);
  } else if (getUserQuery.isSuccess) {
    dispatch(
      loginSuccess({
        name: getUserQuery.data.name!,
        surname: getUserQuery.data.surname!,
        email: getUserQuery.data.email!,
      })
    );
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UserLog>({
    resolver: zodResolver(UserLogSchema),
  });

  const email = watch("email");

  const loginMutation = useMutation(
    {
      mutationFn: (formData: UserLog) => loginUser(formData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["auth", "profile"] });
        navigate("/");
      },
    },
    queryClient
  );
  const onSubmit = (data: UserLog) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="login-container">
      <div className="container">
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="login-wrapper">
            <Logo size={143} position="center" color={"black"} />
          </div>

          <div className="form-wrapper">
            <FormField
              placeholder="Электронная почта"
              errorMessage={errors.email?.message}
            >
              <input type="email" {...register("email")} />
            </FormField>
            <FormField
              placeholder="Пароль"
              errorMessage={errors.password?.message}
            >
              <input type="password" {...register("password")} />
            </FormField>
            {loginMutation.isError && (
              <span>{loginMutation.error.message}</span>
            )}
            {loginMutation.isSuccess && (
              <span>Добро пожаловать, {email}! </span>
            )}
            <Button type="submit" isLoading={loginMutation.isPending}>
              Войти
            </Button>
            <Link to="/register">
              <BlackButton>Регистрация</BlackButton>
            </Link>
          </div>
        </form>
        <CloseButton className="close-button" onClick={exit} />
      </div>
    </div>
  );
}
export default LoginForm;
