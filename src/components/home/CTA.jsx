import React from "react";

const CTA = () => {
  return (
    <section
      id="cta"
      className="mb-20 bg-gray-900 rounded-lg"
      style={{
        background:
          "linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, .6)),url('https://hijra.id/wp-content/uploads/2023/07/blog-new-11.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col items-center gap-4 p-24 max-lg:p-10 max-lg:h-96 max-lg:justify-center max-lg:text-center">
        <h2 className="text-4xl font-bold text-teal-400">
          Interested in Shopping Here?
        </h2>
        <p className="text-white">
          Click the button below to shop at our store
        </p>

        <button className="btn bg-teal-500 hover:bg-teal-600 text-white border-none">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default CTA;
