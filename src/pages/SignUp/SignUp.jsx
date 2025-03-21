import getFastApiErrors from "../../utils/getFastApiErrors";
import CarouselSignUp from "./components/CarouselSignUp";
import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import AppContext from "../../context/AppProvider";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import Form from "./components/Form";
import axios from "axios";

const SignUp = () => {
  const [isRegisterGooglePending, setIsRegisterGooglePending] = useState(false);
  const { setUserInfo } = useContext(AppContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: async (userInfo) => {
      return await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        userInfo
      );
    },
    onSuccess: (res) => {
      toast.success(t("Successfully registered!"));
      navigate("/check-mailbox");
    },
    onError: (err) => {
      toast.error(getFastApiErrors(err));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const userInfo = {
      email: e?.target?.email?.value.trim(),
      password: e?.target?.password?.value.trim(),
      name: e?.target?.name?.value.trim(),
      created_at: new Date(),
    };

    // Form validation
    if (
      [
        userInfo?.email,
        userInfo?.password,
        userInfo?.name,
        e?.target?.repeatPassword?.value,
      ].includes("")
    ) {
      return toast.error(t("Fill up the blanks!"));
    } else if (
      e?.target?.password?.value !== e?.target?.repeatPassword?.value
    ) {
      return toast.error(t("Passwords are not the same!"));
    }

    // Sign up user
    mutate(userInfo);
  };

  // Functionallity to register with google, here we send the access_token to server
  const register = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setIsRegisterGooglePending(true);

        const { data } = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/googlelogin`,
          {
            access_token: tokenResponse?.access_token,
            created_at: new Date(),
          }
        );

        navigate("/my-profiles/");
        toast.success(t("User authenticated!"));
        localStorage.setItem("userInfo", JSON.stringify(data));

        setUserInfo(data);
      } catch (error) {
        toast.error(getFastApiErrors(error));
      } finally {
        setIsRegisterGooglePending(false);
      }
    },
    onNonOAuthError: (err) => {
      console.log(err);
    },
  });

  return (
    <section className="flex flex-col justify-center items-center h-screen">
      <Helmet>
        <title>Eternal MemoriesX | {t("Sign Up")}</title>
      </Helmet>

      <div className="container-page px-2">
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-2.5 shadow-md rounded-2xl p-6 bg-gradient-to-r from-[#FBFBFE] border border-gray-300">
          <CarouselSignUp />

          {/* Sign Up Form */}
          <Form
            register={register}
            isPending={isPending}
            handleSubmit={handleSubmit}
            isRegisterGooglePending={isRegisterGooglePending}
          />
        </div>
      </div>
    </section>
  );
};

export default SignUp;
