import getFastApiErrors from "../../utils/getFastApiErrors";
import CarouselSignUp from "./components/CarouselSignUp";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Form from "./components/Form";
import axios from "axios";

const SignUp = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (userInfo) => {
      return await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        userInfo
      );
    },
    onSuccess: (res) => {
      toast.success("¡Successfully registered!");
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
      return toast.error("¡Fill up the blanks available!");
    } else if (
      e?.target?.password?.value !== e?.target?.repeatPassword?.value
    ) {
      return toast.error("¡Passwords are not the same!");
    }

    // Sign up user
    mutate(userInfo);
  };

  return (
    <section className="container-page px-2 my-8">
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-2.5 shadow-md rounded-2xl p-1.5 bg-gradient-to-r from-[#FBFBFE]">
        <CarouselSignUp />

        {/* Sign Up Form */}
        <Form isPending={isPending} handleSubmit={handleSubmit} />
      </div>
    </section>
  );
};

export default SignUp;
