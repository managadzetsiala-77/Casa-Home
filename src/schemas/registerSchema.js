import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup
    .string()
    .required("სახელის შეყვანა აუცილებელია")
    .min(2, "სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს"),

  email: yup
    .string()
    .email("შეიყვანე სწორი ელფოსტა")
    .required("ელფოსტის შეყვანა აუცილებელია"),

  password: yup
    .string()
    .required("პაროლის შეყვანა აუცილებელია")
    .min(6, "პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს"),

  confirmPassword: yup
    .string()
    .required("გაიმეორე პაროლი")
    .oneOf(
      [yup.ref("password")],
      "პაროლები ერთმანეთს არ ემთხვევა"
    ),
});