// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Img from "../../assets/static-image.gif";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";

const Singup = () => {
  const { createUser, googleSignIn } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
 
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { name, email, password } = data;
    createUser(email, password)
        .then(result => {
            const userInfo = { name, email, password };
            console.log(userInfo);
            return { data: { insertedId: true }, user: result.user };
        })
        .then(res => {
            if (res.data.insertedId) {
                console.log('User added to the database');
                reset();
                console.log(res.user);
                // swal("Good job!", "You clicked the button!", "success");
                navigate('/');
            }
        })
        .catch(error => {
            console.error(error);
        });
};

  const handleGoogleSignIn = async () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        console.log("google Error", error);
      });
  };

  return (
    <div className="mt-5 mb-5 p-10 ">
      <div className="grid grid-cols-1  md:grid-cols-2  h-full w-full overflow-hidden rounded-xl shadow-md ">
        <img
          className="h-full object-cover mx-auto "
          src={Img}
          alt="Side graphic"
        />

        <div className="flex w-full flex-col justify-center bg-white ">
          <form
            className={`p-8 w-full ${
              register
                ? "lg:translate-x-0"
                : "lg:-translate-x-full hidden lg:block"
            } duration-500`}
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="backdrop-blur-sm text-2xl lg:text-4xl pb-4">
              Register
            </h1>
            <div className="space-y-5">
              <label htmlFor="name" className="block">
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name", { required: true })}
                placeholder="John Doe"
                className="p-3 block w-full outline-none border rounded-md invalid:border-red-700 valid:border-black"
              />
              {errors.name && <p>Name is required</p>}
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
              {errors.email && <p>email is required</p>}
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
            </div>
            {/* button type will be submit for handling form submission*/}
            <button
              type="submit"
              className="py-2 px-5 mb-4 mx-auto mt-8 shadow-lg border rounded-md border-black block"
            >
              Submit
            </button>
            <p className="mb-3 text-center">
              Already have an account?
              <Link className="underline font-semibold">Login</Link>
            </p>
            <hr />
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="py-2 px-5 mb-4 mt-8 mx-auto block shadow-lg border rounded-md border-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current inline-block mr-2"
              >
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Singup;
