import { useTranslation } from "react-i18next";
import { InputForm } from "../../../components/InputForm";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Form = ({
  isRegisterGooglePending,
  register,
  isPending,
  handleSubmit,
}) => {
  const { t } = useTranslation();

  return (
    <form className={`flex-1`} onSubmit={handleSubmit}>
      <div className="text-end px-4 sm:pt-0 pt-3">
        <h3 className="text-fourth-color/70">
          {t("Already a member?")}{" "}
          <Link className="text-primary-color-light" to={"/sign-in"}>
            {t("Sign in now")}
          </Link>
        </h3>
      </div>

      <div className="flex flex-col justify-center h-full max-w-xs mx-auto sm:pb-0 pb-8">
        <h2 className="text-center text-black heading-title text-[1.6rem]">
          {t("Get Started")}
        </h2>
        <p className="text-center leading-4 text-fourth-color/70 mt-1.5">
          {t("Welcome to Eternal MemoriesX - Let's create your account")}
        </p>

        <div className="mt-6 mb-2">
          <InputForm
            additionalInputClassnames={
              "shadow-md rounded-lg px-5 py-3 placeholder:text-fourth-color/35"
            }
            inputPlaceholder={t("Enter username")}
            inputLabelClassName={"mb-4 block"}
            inputName={"name"}
            inputType={"text"}
            inputLabel={false}
          />

          <InputForm
            additionalInputClassnames={
              "shadow-md rounded-lg px-5 py-3 placeholder:text-fourth-color/35"
            }
            inputLabelClassName={"mb-4 block"}
            inputPlaceholder={t("Enter email")}
            inputName={"email"}
            inputType={"email"}
            inputLabel={false}
          />

          <InputForm
            additionalInputClassnames={
              "shadow-md rounded-lg px-5 py-3 placeholder:text-fourth-color/35"
            }
            inputLabelClassName={"mb-4 block"}
            inputPlaceholder={t("Password")}
            inputName={"password"}
            inputType={"password"}
            inputPassword={true}
            inputLabel={false}
          />

          <InputForm
            additionalInputClassnames={
              "shadow-md rounded-lg px-5 py-3 placeholder:text-fourth-color/35"
            }
            inputPlaceholder={t("Repeat Password")}
            inputLabelClassName={"mb-4 block"}
            inputName={"repeatPassword"}
            inputType={"password"}
            inputPassword={true}
            inputLabel={false}
          />
        </div>

        <div className="mt-0">
          <div>
            <button
              type="submit"
              className="btn bg-[#F56965] disabled:opacity-30 hover:shadow-lg px-3 hover:opacity-70 hover:shadow-[#F56965] text-white border-transparent py-3 font-light shadow-[#F56965] shadow-md w-full"
              disabled={isPending}
            >
              {isPending ? t("Loading...") : t("Sign Up")}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 my-4">
          <div className="w-full h-[1px] bg-white"></div>

          <div>
            <p className="text-nowrap text-fourth-color/65 text-sm">
              {t("Or continue with")}
            </p>
          </div>

          <div className="w-full h-[1px] bg-white"></div>
        </div>

        <div>
          <button
            className={`${
              isRegisterGooglePending
                ? "border-2 flex items-center gap-4 animate-pulse pointer-events-none bg-black text-white justify-center border-fourth-color/70 text-fourth-color/70 rounded-full p-1 w-full hover:shadow-lg animation-fade"
                : "border-2 flex items-center gap-4 hover:bg-black hover:text-white justify-center border-fourth-color/70 text-fourth-color/70 rounded-full p-1 w-full hover:shadow-lg animation-fade"
            } `}
            disabled={isRegisterGooglePending}
            onClick={() => register()}
            type="button"
          >
            <FcGoogle size={36} />{" "}
            {isRegisterGooglePending
              ? t("Loading...")
              : t("Sign up with Google")}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
