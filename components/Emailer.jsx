import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const welcomeVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 1, duration: 1.5 },
  },
  exit: {
    x: "-100vh",
    transition: { ease: "easeInOut" },
  },
};

const textVariants = {
  hidden: {
    opacity: 0,
    y: 450,
  },
  visible: {
    opacity: 1,
    y: 10,
    transition: { delay: 2, type: "spring", stiffness: 40 },
  },
  exit: {
    x: "-100vh",
    transition: { ease: "easeInOut" },
  },
};

const buttonVariants = {
  hidden: {
    opacity: 0,
    y: 450,
  },
  visible: {
    opacity: 1,
    y: 10,
    transition: { delay: 2.6, type: "spring", stiffness: 40 },
  },
  exit: {
    x: "-100vh",
    transition: { ease: "easeInOut" },
  },
};

export const Emailer = () => {
  const [animate, setAnimate] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      email,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.status === 200) {
        setSubmitted(true);
        setEmail("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      setAnimate(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="bg-black relative text-white">
      <div className="flex flex-col absolute z-50 h-4/5 w-full items-start justify-center space-y-4 space-x-8">
        <div></div>
        <motion.p
          variants={welcomeVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="text-4xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-pink-700 to-blue-300"
        >
          Welcome to <br />
          Emailer
        </motion.p>
        <form className="w-full">
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <input
              placeholder="Email"
              className="bg-transparent py-4 px-2 w-1/4 font-bold rounded-lg text-white border-2 border-slate-400 mb-6"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
                setSubmitted(false);
              }}
              name="email"
            />
          </motion.div>
          {submitted && (
            <p className="font-bold text-lg text-slate-400">
              Email sent successfully
            </p>
          )}
          <motion.button
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            type="submit"
            onClick={(e) => {
              handleSubmit(e);
            }}
            className={`py-4 font-bold rounded-lg text-white bg-gradient-to-r from-blue-400 to-pink-500 
          ${animate && "animate-pulse"} hover:animate-none w-1/4`}
          >
            Get Your Email
          </motion.button>
        </form>
      </div>
      <div className="w-full h-screen">
        <Image src="/moon-36.gif" layout="fill" objectFit="cover" />
      </div>
    </div>
  );
};
