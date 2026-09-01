import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../schemas/loginSchema";
import "./Login.scss";



function Login() {
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    const savedUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (!savedUser) {
      setLoginError(
        "მომხმარებელი ვერ მოიძებნა. გთხოვ, ჯერ გაიარე რეგისტრაცია."
      );

      return;
    }

    if (
      savedUser.email !== data.email ||
      savedUser.password !== data.password
    ) {
      setLoginError(
        "ელფოსტა ან პაროლი არასწორია."
      );

      return;
    }

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        name: savedUser.name,
        email: savedUser.email,
      })
    );

    navigate("/");
  };

  return (
    <main className="auth-page">

      <div className="auth-page__card">

        <div className="auth-page__header">

          <Link
            to="/"
            className="auth-page__logo"
          >
            CasaHome
          </Link>

          <h1>
            კეთილი იყოს შენი დაბრუნება
          </h1>

          <p>
            შედი შენს CasaHome ანგარიშზე
          </p>

        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit(onSubmit)}
        >

          <div className="auth-form__group">

            <label htmlFor="email">
              ელფოსტა
            </label>

            <input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              {...register("email")}
            />

            {errors.email && (
              <span className="auth-form__error">
                {errors.email.message}
              </span>
            )}

          </div>

          <div className="auth-form__group">

            <label htmlFor="password">
              პაროლი
            </label>

            <input
              id="password"
              type="password"
              placeholder="შეიყვანე პაროლი"
              {...register("password")}
            />

            {errors.password && (
              <span className="auth-form__error">
                {errors.password.message}
              </span>
            )}

          </div>

          {loginError && (
            <div className="auth-form__login-error">
              {loginError}
            </div>
          )}

          <button
            type="submit"
            className="auth-form__button"
          >
            შესვლა
          </button>

        </form>

        <div className="auth-page__footer">

          <span>
            არ გაქვს ანგარიში?
          </span>

          <Link to="/register">
            რეგისტრაცია
          </Link>

        </div>

      </div>

    </main>
  );
}

export default Login;