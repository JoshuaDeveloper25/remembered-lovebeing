import { useNavigate, useSearchParams } from "react-router-dom";
import getFastApiErrors from "../../utils/getFastApiErrors";
import CarouselSignIn from "./components/CarouselSignIn";
import { useMutation } from "@tanstack/react-query";
import AppContext from "../../context/AppProvider";
import { toast } from "react-toastify";
import Form from "./components/Form";
import { useContext } from "react";
import axios from "axios";

const SignIn = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setUserInfo } = useContext(AppContext);
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (userInfo) => {
      return await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userInfo
      );
    },
    onSuccess: (res) => {
      toast.success("¡Successfully logged in!");
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      setUserInfo(res.data);

      // If there's query we go to All My Profiles, if not, to Home page
      navigate(
        searchParams?.get("redirect") ? searchParams?.get("redirect") : "/"
      );

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

  return (
    <section className="container-page px-2 my-8">
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-2.5 shadow-md rounded-2xl p-6 bg-gradient-to-r from-[#FBFBFE]">
        <CarouselSignIn />

        {/* Sign Up Form */}
        <Form isPending={isPending} handleSubmit={handleSubmit} />
      </div>
    </section>
  );
};

export default SignIn;
