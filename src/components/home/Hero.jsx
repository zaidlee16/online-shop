import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.8 } },
  };

  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 1 } },
  };

  return (
    <section id="home" className="">
      <div className="bg-teal-500 dark:bg-teal-600 rounded-md h-auto p-8 md:p-14 flex flex-col md:flex-row items-center md:h-[500px]">
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <motion.div
            initial="hidden"
            animate="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            <motion.h1
              className="font-display text-3xl dark:text-white mt-12 md:text-4xl lg:text-7xl font-bold tracking-[-0.02em] drop-shadow-sm leading-[2.5rem] md:leading-[3rem] lg:leading-[5rem]"
              variants={FADE_DOWN_ANIMATION_VARIANTS}
            >
              Welcome <br />
              to Jejet Store
            </motion.h1>

            <motion.div
              className="mt-4"
              variants={FADE_DOWN_ANIMATION_VARIANTS}
            >
              <Link
                to={"product"}
                className="btn bg-teal-500 hover:bg-teal-600 text-white rounded-xl px-4 py-2 md:px-6 md:py-3 text-sm md:text-base"
              >
                Shop Now
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <motion.img
            src="./hero.svg"
            alt="Hero Gif"
            className="w-full h-auto max-w-xs md:max-w-md lg:max-w-lg"
            initial="hidden"
            animate="show"
            variants={FADE_IN_ANIMATION_VARIANTS}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
