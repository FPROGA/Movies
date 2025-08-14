import { zodResolver } from "@hookform/resolvers/zod";
import "./RegistrationForm.css";
import { useForm } from "react-hook-form";
import { FormField } from "../../components/FormField";
import { registerUser, UserReg, UserRegSchema } from "../../api/User";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { Button } from "../../components/Buttons/Button";
import { Logo } from "../../components/Logo/Logo";
import { BlackButton } from "../../components/Buttons/BlackButton";
import { CloseButton } from "../../components/Buttons/CloseButton";

import { Link, useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UserReg>({
    resolver: zodResolver(UserRegSchema),
    mode: "onChange",
  });

  const regMutation = useMutation(
    {
      mutationFn: (data: UserReg) =>
        registerUser(
          data
        ),
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["auth", "profile"] });
        navigate('/end-register');
      },
    },
    queryClient
  );
  const onSubmit = (data: UserReg) => {
    regMutation.mutate(data);
  };
 
  const name = watch("name");
  return (
    <div className="container">
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="register-wrapper">
          <Logo size={143} position="center" color={"black"} />
        </div>

        <div className="form-wrapper">
          <FormField
            placeholder="Электронная почта"
            errorMessage={errors.email?.message}
          >
            <input type="email" {...register("email")} />
          </FormField>
          <FormField placeholder="Имя" errorMessage={errors.name?.message}>
            <input type="text" {...register("name")} />
          </FormField>
          <FormField
            placeholder="Фамилия"
            errorMessage={errors.surname?.message}
          >
            <input type="text" {...register("surname")} />
          </FormField>
          <FormField
            placeholder="Пароль"
            errorMessage={errors.password?.message}
          >
            <input type="password" {...register("password")} />
          </FormField>
          <FormField
            placeholder="Подтвердите пароль"
            errorMessage={errors.confirmPassword?.message}
          >
            <input type="password" {...register("confirmPassword")} />
          </FormField>
          {regMutation.isError && <span>{regMutation.error.message}</span>}
          {regMutation.isSuccess && <span>Добро пожаловать, {name}! </span>}
          <Button type="submit" isLoading={regMutation.isPending}>
            Создать аккаунт
          </Button>
          <Link to ="/login">
          <BlackButton>У меня есть пароль </BlackButton>
          </Link>
        </div>
      </form>
      <CloseButton />
    </div>
  );
}
export default RegisterForm;
