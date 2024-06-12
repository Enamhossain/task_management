import React from 'react';
import { Link } from "react-router-dom";
import Img from '../../assets/static-image.gif'; // Ensure this is the correct path to your static image

const SignIn = () => {
    return (
        <div className="mt-5 mb-5 p-10 ">
            <div className="grid grid-cols-1  md:grid-cols-2  h-full w-full overflow-hidden rounded-xl shadow-md ">
                {/* Image side */}
                  <img className="h-full object-cover mx-auto " src={Img} alt="Side graphic" />
            
                {/* Form side */}
                <div className="flex w-full flex-col justify-center bg-white py-10 lg:w-[60%]">
                    <h2 className="pb-8 text-center text-3xl font-bold text-[#8EA7E9]">Login Here</h2>
                    <form className="flex w-full flex-col items-center justify-center gap-4">
                        <input
                            className="w-[80%] rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 md:w-[60%]"
                            type="email"
                            placeholder="Email"
                            name="email"
                        />
                        <input
                            className="w-[80%] rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 md:w-[60%]"
                            type="password"
                            placeholder="Password"
                            name="password"
                        />
                        <p className="text-[14px] text-gray-400">
                            Do not have an account? <Link to="/signup" className="text-[#8EA7E9]">Create one</Link>
                        </p>
                        <input
                            className="w-[80%] rounded-lg bg-[#8EA7E9] px-6 py-2 font-medium text-white md:w-[60%]"
                            type="submit"
                            value="Sign In"
                        />
                    </form>
                    {/* Divider */}
                    <div className="my-8 flex items-center px-8">
                        <hr className="flex-1" />
                        <div className="mx-4 text-gray-400">OR</div>
                        <hr className="flex-1" />
                    </div>
                    {/* Sign in with Google */}
                    <div className="mx-auto flex h-[50px] w-[200px] items-center overflow-hidden rounded-full shadow-md duration-300 hover:scale-95 hover:shadow">
                        <div className="flex h-full w-[50%] items-center bg-[#8EA7E9] pl-4 text-sm text-white">Sign With</div>
                        <span className="right-0 top-0 h-0 w-0 -rotate-90 border-b-[50px] border-r-[50px] border-b-transparent border-r-[#8EA7E9] group-hover:hidden"></span>
                        <span className="pr-4 text-4xl font-bold text-[#8EA7E9]">G+</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
