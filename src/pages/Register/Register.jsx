import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";

import { registerSchema } from "../../schemas/registerSchema";

import "./Register.scss";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data) => {
    localStorage.setItem(
      "user",
      JSON.stringify(data)
    );

    navigate("/login");
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
            შექმენი ანგარიში
          </h1>

          <p>
            შემოგვიერთდი CasaHome-ს
          </p>

        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit(onSubmit)}
        >

          <div className="auth-form__group">

            <label htmlFor="name">
              სახელი
            </label>

            <input
              id="name"
              type="text"
              placeholder="შეიყვანე სახელი"
              {...register("name")}
            />

            {errors.name && (
              <span className="auth-form__error">
                {errors.name.message}
              </span>
            )}

          </div>

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
              placeholder="მინიმუმ 6 სიმბოლო"
              {...register("password")}
            />

            {errors.password && (
              <span className="auth-form__error">
                {errors.password.message}
              </span>
            )}

          </div>

          <div className="auth-form__group">

            <label htmlFor="confirmPassword">
              გაიმეორე პაროლი
            </label>

            <input
              id="confirmPassword"
              type="password"
              placeholder="გაიმეორე პაროლი"
              {...register("confirmPassword")}
            />

            {errors.confirmPassword && (
              <span className="auth-form__error">
                {errors.confirmPassword.message}
              </span>
            )}

          </div>

          <button
            type="submit"
            className="auth-form__button"
          >
            ანგარიშის შექმნა
          </button>

        </form>

        <div className="auth-page__footer">

          <span>
            უკვე გაქვს ანგარიში?
          </span>

          <Link to="/login">
            შესვლა
          </Link>

        </div>

      </div>

    </main>
  );
}

export default Register;