// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Navigation = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    logOut()
      .then(() => console.log("user succesfullyLogout"))
      .catch((err) => console.log(err));
  };

  return (
    <section className="bg-[#fcf2e8] ">
      <div
        className="absolute right-5 top-[30px]  lg:hidden"
        onClick={toggleMenu}
      >
        {isOpen ? (
          <FaTimes size={24} color="#160042" />
        ) : (
          <FaBars size={24} color="#160042" />
        )}
      </div>
      <div className="h-auto w-screen">
        <nav className="font-inter mx-auto h-auto w-full max-w-[1600px] lg:relative lg:top-0">
          <div className="flex flex-col px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-4 xl:px-20">
            <a
              href="#"
              className="bg-[#d1ff2c] p-1 rounded-lg text-2xl font-bold"
            >
              Free Task
            </a>
            <div>
              <div
                className={`mt-14 flex flex-col space-y-8 lg:mt-0 lg:flex lg:flex-row lg:space-x-1 lg:space-y-0 ${
                  isOpen ? "show" : "hidden"
                }`}
              >
                <Link
                  to="/"
                  className=" rounded-lg lg:px-6 lg:py-4 lg:hover:bg-gray-50 lg:hover:text-gray-800"
                >
                  Home
                </Link>
                <Link
                  to="/Features"
                  className=" rounded-lg lg:px-6 lg:py-4 lg:hover:bg-gray-50 lg:hover:text-gray-800"
                >
                  Features
                </Link>
                <Link
                  to="/#pricing"
                  className=" rounded-lg lg:px-6 lg:py-4 lg:hover:bg-gray-50 lg:hover:text-gray-800"
                >
                  Pricing
                </Link>
                <Link
                  to="/dashboard"
                  className=" rounded-lg lg:px-6 lg:py-4 lg:hover:bg-gray-50 lg:hover:text-gray-800"
                >
                  Dashboard
                </Link>
                <a
                  href="#"
                  className=" rounded-lg pb-8 lg:px-6 lg:py-4 lg:pb-0 lg:hover:bg-gray-50 lg:hover:text-gray-800"
                >
                  FAQs
                </a>

                {user ? (
                  <Link
                    onClick={() => handleSignOut()}
                    className="rounded-lg lg:px-6 lg:py-4 lg:hover:bg-gray-50 lg:hover:text-gray-800"
                  >
                    Log Out
                  </Link>
                ) : (
                  <div
                    className={`flex flex-col space-y-8 lg:flex lg:flex-row lg:space-x-3 lg:space-y-0 ${
                      isOpen ? "show" : "hidden"
                    }`}
                  >
                    <Link
                      to="/SingIn"
                      className="rounded-lg lg:px-6 lg:py-4 lg:hover:bg-gray-50 lg:hover:text-gray-800"
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/Registertion"
                      className="relative inline-block rounded-xl border border-[#1353FE] bg-[#d1ff2c] px-8 py-4 text-center font-semibold text-[#000000] hover:border-black md:mr-6"
                    >
                      Start For Free
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Navigation;
