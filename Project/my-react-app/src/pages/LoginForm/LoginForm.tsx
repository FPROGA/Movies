import { zodResolver } from "@hookform/resolvers/zod";
import "./LoginForm.css";
import { useForm } from "react-hook-form";
import { FormField } from "../../components/FormField";
import { loginUser, UserLog, UserLogSchema } from "../../api/User";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { Button } from "../../components/Buttons/Button";
import { Logo } from "../../components/Logo/Logo";
import { BlackButton } from "../../components/Buttons/BlackButton";
import { CloseButton } from "../../components/Buttons/CloseButton";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/auth/AuthSlice";
import { Link, useNavigate } from "react-router-dom";


function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UserLog>({
    resolver: zodResolver(UserLogSchema),
  });

  const dispatch = useDispatch();
  const loginMutation = useMutation({
    mutationFn: (formData: UserLog) => loginUser(formData),
    onSuccess: (responseData) => { 
      queryClient.invalidateQueries({ queryKey: ["auth", "profile"] });
      dispatch(loginSuccess({
        token: responseData.token 
      }));
      navigate('/');
    },
  }, queryClient);
  const onSubmit = (data: UserLog) => {
    loginMutation.mutate(data);
  };
  const email = watch("email");
  return (
    <div className="container">
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="login-wrapper" >
        <Logo size={35} position="center" />
      </div>

      <div className="form-wrapper">
      <FormField  placeholder="Электронная почта"  errorMessage={errors.email?.message}>
        <input type="email" {...register("email")} />
      </FormField>
      <FormField placeholder="Пароль" errorMessage={errors.password?.message}>
        <input type="password"   {...register("password")} />
      </FormField>
      {loginMutation.isError && <span>{loginMutation.error.message}</span>}
      {loginMutation.isSuccess && <span>Добро пожаловать, {email}! </span>}
      <Button type="submit" isLoading={loginMutation.isPending}>
        Войти
      </Button>
      <Link to="/register">
        <BlackButton>Регистрация</BlackButton>
      </Link>
      </div>  

    </form>
    <CloseButton/>
    </div>
  );
}
export default LoginForm;
