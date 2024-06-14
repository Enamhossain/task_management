import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Img from "../../assets/static-image.gif"; // Ensure this is the correct path to your static image
import { AuthContext } from "../../AuthProvider/AuthProvider";

const SignIn = () => {
  const { googleSignIn, signInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log("Sign-in Error", error);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log("Google Sign-In Error", error);
      });
  };

  return (
    <div className="mt-5 mb-5 p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full overflow-hidden rounded-xl shadow-md">
        {/* Image side */}
        <img className="h-[80%]  object-cover mx-auto" src={Img} alt="Side graphic" />

        {/* Form side */}
        <div className="mx-auto justify-center bg-white py-10 lg:w-[60%]">
          <h2 className="pb-8 text-center text-3xl font-bold text-[#8EA7E9]">
            Login Here
          </h2>
          <form
            className="p-8 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="backdrop-blur-sm text-2xl lg:text-4xl pb-4">
              Login
            </h1>
            <div className="space-y-5">
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: true })}
                placeholder="example@example.com"
                className="p-3 block w-full outline-none border rounded-md invalid:border-red-700 valid:border-black"
              />
              {errors.email && <p>Email is required</p>}
              <label htmlFor="password" className="block">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password", { required: true }, { minLength: 5 })}
                placeholder=".............."
                className="p-3 block w-full outline-none border rounded-md invalid:border-red-700 valid:border-black"
              />
              {errors.password && <p>Password is required</p>}
            </div>
            {/* button type will be submit for handling form submission*/}
            <button
              type="submit"
              className="py-2 px-5 mb-4 mx-auto mt-8 shadow-lg border rounded-md border-black block"
            >
              Submit
            </button>
            <p className="mb-3 text-center">
              Don't have an account?
              <Link to="/signup" className="underline font-semibold"> Register</Link>
            </p>
            <hr />
          </form>
          {/* Divider */}
          <div className="my-8 flex items-center px-8">
            <hr className="flex-1" />
            <div className="mx-4 text-gray-400">OR</div>
            <hr className="flex-1" />
          </div>
          {/* Sign in with Google */}
          <div
            onClick={handleGoogleSignIn}
            className="mx-auto flex h-[50px] w-[200px] items-center overflow-hidden rounded-full shadow-md duration-300 hover:scale-95 hover:shadow"
          >
            <div className="flex h-full w-[50%] items-center bg-[#8EA7E9] pl-4 text-sm text-white">
              Sign In With
            </div>
            <span className="right-0 top-0 h-0 w-0 -rotate-90 border-b-[50px] border-r-[50px] border-b-transparent border-r-[#8EA7E9] group-hover:hidden"></span>
            <span className="pr-4 text-4xl font-bold text-[#8EA7E9]">G+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
