import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Contact.scss";

const schema = yup.object({
  name: yup
    .string()
    .required("სახელი სავალდებულოა")
    .min(2, "სახელი ძალიან მოკლეა"),

  email: yup
    .string()
    .email("შეიყვანე სწორი ელფოსტა")
    .required("ელფოსტა სავალდებულოა"),

  message: yup
    .string()
    .required("შეტყობინება სავალდებულოა")
    .min(10, "შეტყობინება მინიმუმ 10 სიმბოლო უნდა იყოს"),
});

function Contact() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("შეტყობინება:", data);

    setSent(true);
    reset();
  };

  return (
    <main className="contact">
      <div className="contact__container">

        <div className="contact__header">
          <span>CASAHOME</span>

          <h1>დაგვიკავშირდი</h1>

          <p>
            გაქვს კითხვა? ჩვენ სიამოვნებით დაგეხმარებით.
          </p>
        </div>

        <div className="contact__content">

          <div className="contact__info">

            <h2>მოდით ვისაუბროთ</h2>

            <p>
              ჩვენი გუნდი მზად არის დაგეხმაროს პროდუქტის,
              შეკვეთის ან მიწოდების საკითხებთან დაკავშირებით.
            </p>

            <div className="contact__item">
              <span>📍</span>
              <div>
                <strong>მისამართი</strong>
                <p>თბილისი, საქართველო</p>
              </div>
            </div>

            <div className="contact__item">
              <span>📞</span>
              <div>
                <strong>ტელეფონი</strong>
                <p>+995 555 12 34 56</p>
              </div>
            </div>

            <div className="contact__item">
              <span>✉</span>
              <div>
                <strong>ელფოსტა</strong>
                <p>info@casahome.ge</p>
              </div>
            </div>

          </div>

          <form
            className="contact__form"
            onSubmit={handleSubmit(onSubmit)}
          >

            <h2>მოგვწერე</h2>

            <div className="contact__field">
              <label>სახელი</label>

              <input
                type="text"
                placeholder="შეიყვანე სახელი"
                {...register("name")}
              />

              {errors.name && (
                <span>{errors.name.message}</span>
              )}
            </div>

            <div className="contact__field">
              <label>ელფოსტა</label>

              <input
                type="email"
                placeholder="example@gmail.com"
                {...register("email")}
              />

              {errors.email && (
                <span>{errors.email.message}</span>
              )}
            </div>

            <div className="contact__field">
              <label>შეტყობინება</label>

              <textarea
                rows="6"
                placeholder="დაწერე შენი შეტყობინება..."
                {...register("message")}
              />

              {errors.message && (
                <span>{errors.message.message}</span>
              )}
            </div>

            <button type="submit">
              შეტყობინების გაგზავნა
            </button>

            {sent && (
              <div className="contact__success">
                ✓ შეტყობინება წარმატებით გაიგზავნა!
              </div>
            )}

          </form>

        </div>
      </div>
    </main>
  );
}

export default Contact;