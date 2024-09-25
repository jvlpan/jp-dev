import { FormEvent, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import classes from "./EmailForm.module.css";

export default function EmailForm({ className }: { className?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const [captchaEnabled, setCaptchaEnabled] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const fd = new FormData(event.target as HTMLFormElement);

    if (
      fd.get("user_email") === "" ||
      fd.get("user_name") === "" ||
      fd.get("message") === ""
    ) {
      setMessage(
        "Error: One or more required fields are empty. Please fill out all fields and try again."
      );
      return;
    }

    if (!fd.get("user_email")?.toString().includes("@")) {
      setMessage("Error: Please enter a valid email address and try again.");
      return;
    }

    if (recaptchaRef.current) {
      console.log(recaptchaRef.current);
      try {
        const token = await recaptchaRef.current.executeAsync();
        if (token) {
          sendEmail(token, fd);
          console.log(token);
        } else {
          console.error("No token received from reCAPTCHA");
        }
      } catch (error) {
        console.error("Error executing reCAPTCHA:", error);
      }
    }
  }

  async function sendEmail(token: string, fd: FormData) {
    setMessage(null);
    setIsSending(true);

    const params = {
      user_email: fd.get("user_email"),
      user_name: fd.get("user_name"),
      message: fd.get("message"),
      "g-recaptcha-response": token,
    };

    if (formRef.current) {
      emailjs
        .send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          params,
          {
            publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
          }
        )
        .then(
          (result) => {
            console.log("SUCCESS: ", result.text);
            setMessage(
              "Thank you! Your message was sent, and I will reach back to you shortly."
            );
            formRef.current!.reset();
            recaptchaRef.current!.reset();
          },
          (error) => {
            console.log("FAILED... ", error.text);
            setMessage(`Error: ${error.text} - please try again.`);
          }
        )
        .finally(() => {
          setIsSending(false);
        });
    }
  }

  return (
    <form
      className={`${classes.form} ${className}`}
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <label>Name</label>
      <input type="text" name="user_name" placeholder="J. Doe" required />
      <label>Email</label>
      <input
        type="email"
        name="user_email"
        placeholder="example@email.com"
        required
        onFocus={() => setCaptchaEnabled(true)}
      />
      <label>Message</label>
      <textarea
        name="message"
        placeholder="What can I help you with?"
        required
      />
      {captchaEnabled && (
        <ReCAPTCHA
          size="invisible"
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
          ref={recaptchaRef}
        />
      )}

      <small className={classes.captcha}>
        This site is protected by reCAPTCHA and the Google{" "}
        <a href="https://policies.google.com/privacy">Privacy Policy</a> and{" "}
        <a href="https://policies.google.com/terms">Terms of Service</a> apply.
      </small>
      {message && <small className={classes.message}>{message}</small>}
      <button type="submit" disabled={isSending}>
        {isSending ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
