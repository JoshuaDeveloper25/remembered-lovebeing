import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { useRef } from "react";

const Form = ({ children, setIsLoading }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const form = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (!form.current) {
      return toast.error(t("Fill up the blanks!"));
    }

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_PUBLIC_KEY
      );
      console.log("SUCCESS!");
      navigate("/email-sent-successfully");
    } catch (error) {
      console.log(error);
      console.log("FAILED...", error?.text);
      toast.error(error?.text);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form ref={form} onSubmit={handleSubmit} className="space-y-4">
      {children}
    </form>
  );
};

export default Form;
