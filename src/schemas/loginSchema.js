import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("შეიყვანე სწორი ელფოსტა")
    .required("ელფოსტის შეყვანა აუცილებელია"),

  password: yup
    .string()
    .required("პაროლის შეყვანა აუცილებელია")
    .min(6, "პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს"),
});