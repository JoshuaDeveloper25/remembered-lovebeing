import { Helmet } from "react-helmet-async";
import CarouselSignIn from "./components/CarouselSignIn";
import Form from "./components/Form";

const SignIn = () => {
  return (
    <section className="flex flex-col justify-center items-center h-screen">
      <Helmet>
        <title>Eternal MemoriesX | Sign In</title>
      </Helmet>

      <div className="container-page px-2">
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-2.5 shadow-md rounded-2xl p-6 bg-gradient-to-r from-[#FBFBFE] border border-gray-300">
          <CarouselSignIn />

          {/* Sign In Form */}
          <Form />
        </div>
      </div>
    </section>
  );
};

export default SignIn;
