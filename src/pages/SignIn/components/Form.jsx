import { useNavigate, useSearchParams } from "react-router-dom";
import getFastApiErrors from "../../../utils/getFastApiErrors";
import { InputForm } from "../../../components/InputForm";
import AppContext from "../../../context/AppProvider";
import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Form = ({ onSuccess = null }) => {
  const { t } = useTranslation();

  const [isLoginGooglePending, setIsLoginGooglePending] = useState(false);
  const [searchParams] = useSearchParams();
  const { setUserInfo } = useContext(AppContext);
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (userInfo) =>
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userInfo
      ),
    onSuccess: (res) => {
      toast.success(t("Successfully logged in!"));
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      setUserInfo(res.data);

      // Placing globally the token
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res?.data?.access_token}`;

      if (onSuccess) return onSuccess();

      // If there's query we go to All My Profiles, if not, to Home page
      const redirect = searchParams?.get("redirect");

      if (redirect) {
        if (redirect === "/posts") {
          navigate("/posts");
        } else {
          navigate(redirect);
        }
      } else {
        navigate("/my-profiles/");
      }
    },
    onError: (err) => {
      toast.error(getFastApiErrors(err));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e?.target);

    formData.append("username", e?.target?.email?.value.trim());
    formData.append("password", e?.target?.password?.value.trim());
    formData.append("created_at", new Date());

    // Form validation
    if ([formData.get("username"), formData.get("password")].includes("")) {
      return toast.error("¡Fill up the blanks available!");
    }

    // Sign in user
    mutate(formData);
  };

  // Functionallity to login with google, here we send the access_token to server
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setIsLoginGooglePending(true);

        const { data } = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/googlelogin`,
          {
            access_token: tokenResponse?.access_token,
            created_at: new Date(),
          }
        );

        toast.success(t("User authenticated!"));
        localStorage.setItem("userInfo", JSON.stringify(data));
        setUserInfo(data);

        if (onSuccess) return onSuccess();

        const redirect = searchParams?.get("redirect");

        if (redirect) {
          if (redirect === "/posts") {
            navigate("/posts");
          } else {
            navigate(redirect);
          }
        } else {
          navigate("/my-profiles/");
        }
      } catch (error) {
        toast.error(getFastApiErrors(error));
      } finally {
        setIsLoginGooglePending(false);
      }
    },
    onNonOAuthError: (err) => {
      console.log(err);
    },
  });

  return (
    <form className={`flex-1`} onSubmit={handleSubmit}>
      <div className="text-end px-4 sm:pt-0 pt-3">
        <h3 className="text-fourth-color/70">
          {t("Not a member?")}{" "}
          <Link className="text-primary-color-light" to={"/sign-up"}>
            {t("Register now")}
          </Link>
        </h3>
      </div>

      <div className="flex flex-col justify-center h-full max-w-xs mx-auto sm:pb-0 pb-8">
        <h2 className="text-center text-black heading-title text-[1.6rem]">
          {t("Hello Again!")}
        </h2>
        <p className="text-center text-fourth-color/70 mt-1.5">
          {t("Welcome back you've been missed!")}
        </p>

        <div className="mt-6 mb-2">
          <InputForm
            inputName={"email"}
            inputType={"text"}
            inputLabel={false}
            inputPlaceholder={t("Enter username")}
            inputLabelClassName={"mb-4 block"}
            additionalInputClassnames={
              "shadow-md rounded-lg px-5 py-3 placeholder:text-fourth-color/35"
            }
          />

          <InputForm
            inputPassword={true}
            inputName={"password"}
            inputType={"password"}
            inputLabel={false}
            inputPlaceholder={t("Password")}
            inputLabelClassName={"mb-4 block"}
            additionalInputClassnames={
              "shadow-md rounded-lg px-5 py-3 placeholder:text-fourth-color/35"
            }
          />
        </div>

        <div className="text-end">
          <Link to={"#"} className="text-fourth-color/65">
            {t("Recovery Password")}
          </Link>
        </div>

        <div className="mt-6">
          <div>
            <button
              type="submit"
              className="btn bg-[#F56965] disabled:opacity-30 hover:shadow-lg px-3 hover:opacity-70 hover:shadow-[#F56965] text-white border-transparent py-3 font-light shadow-[#F56965] shadow-md w-full"
              disabled={isPending}
            >
              {isPending ? t("Loading...") : t("Sign In")}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 my-6">
          <div className="w-full h-[1px] bg-white"></div>

          <div>
            <p className="text-center text-nowrap text-fourth-color/65 text-sm">
              {t("Or continue with")}
            </p>
          </div>

          <div className="w-full h-[1px] bg-white"></div>
        </div>

        <div>
          <button
            className="border-2 flex items-center gap-4 hover:bg-black hover:text-white justify-center border-fourth-color/70 text-fourth-color/70 rounded-full p-1 w-full hover:shadow-lg animation-fade"
            disabled={isLoginGooglePending}
            onClick={() => login()}
            type="button"
          >
            <FcGoogle size={36} />{" "}
            {isLoginGooglePending ? t("Loading...") : t("Sign in with Google")}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
