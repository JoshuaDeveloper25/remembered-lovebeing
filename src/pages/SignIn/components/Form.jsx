import { InputForm } from "../../../components/InputForm";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Form = ({ isPending, handleSubmit }) => {
  return (
    <form className={`flex-1`} onSubmit={handleSubmit}>
      <div className="text-end px-4">
        <h3 className="text-fourth-color/70">
          Not a member?{" "}
          <Link className="text-primary-color-light" to={"/sign-up"}>
            Register now
          </Link>
        </h3>
      </div>

      <div className="flex flex-col justify-center h-full max-w-xs mx-auto">
        <h2 className="text-center text-black heading-title text-[1.6rem]">
          Hello Again!
        </h2>
        <p className="text-center text-fourth-color/70 mt-1.5">
          Welcome back you've been missed!
        </p>

        <div className="mt-6 mb-2">
          <InputForm
            inputName={"email"}
            inputType={"text"}
            inputLabel={false}
            inputPlaceholder={"Enter username"}
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
            inputPlaceholder={"Password"}
            inputLabelClassName={"mb-4 block"}
            additionalInputClassnames={
              "shadow-md rounded-lg px-5 py-3 placeholder:text-fourth-color/35"
            }
          />
        </div>

        <div className="text-end">
          <Link to={"#"} className="text-fourth-color/65">
            Recovery Password
          </Link>
        </div>

        <div className="mt-6">
          <div>
            <button
              type="submit"
              className="btn bg-[#F56965] disabled:opacity-30 hover:shadow-lg px-3 hover:opacity-70 hover:shadow-[#F56965] text-white border-transparent py-3 font-light shadow-[#F56965] shadow-md w-full"
              disabled={isPending}
            >
              {isPending ? "Loading..." : "Sign In"}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 my-6">
          <div className="w-full h-[1px] bg-white"></div>

          <div>
            <p className="text-nowrap text-fourth-color/65 text-sm">
              Or continue with
            </p>
          </div>

          <div className="w-full h-[1px] bg-white"></div>
        </div>

        <div>
          <button
            type="button"
            className="border-2 flex items-center gap-4 hover:bg-black hover:text-white justify-center border-fourth-color/70 text-fourth-color/70 rounded-full p-1 w-full hover:shadow-lg animation-fade"
          >
            <FcGoogle size={36} /> Sign in with Google
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
