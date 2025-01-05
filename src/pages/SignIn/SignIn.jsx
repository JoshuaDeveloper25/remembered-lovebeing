import { useNavigate, useSearchParams } from "react-router-dom";
import getFastApiErrors from "../../utils/getFastApiErrors";
import CarouselSignIn from "./components/CarouselSignIn";
import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import AppContext from "../../context/AppProvider";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import Form from "./components/Form";
import axios from "axios";

const SignIn = () => {
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
      toast.success("¡Successfully logged in!");
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      setUserInfo(res.data);

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

      // Placing globally the token
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res?.data?.access_token}`;
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
          }
        );

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
        
        toast.success("User Authenticated!");
        localStorage.setItem("userInfo", JSON.stringify(data));
        setUserInfo(data);
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
    <section className="flex flex-col justify-center items-center h-screen">
      <div className="container-page px-2">
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-2.5 shadow-md rounded-2xl p-6 bg-gradient-to-r from-[#FBFBFE] border border-gray-300">
          <CarouselSignIn />

          {/* Sign In Form */}
          <Form
            login={login}
            isPending={isPending}
            handleSubmit={handleSubmit}
            isLoginGooglePending={isLoginGooglePending}
          />
        </div>
      </div>
    </section>
  );
};

export default SignIn;
