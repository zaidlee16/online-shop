// import React from "react";

// const SideBar = ({ setSearchQuery, setSortOrder, setKategori }) => {
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleSortChange = (e) => {
//     setSortOrder(e.target.value);
//   };

//   const handleCategoryChange = (e) => {
//     const { value } = e.target;
//     setKategori((prevKategori) =>
//       prevKategori.includes(value)
//         ? prevKategori.filter((cat) => cat !== value)
//         : [...prevKategori, value]
//     );
//   };

//   return (
//     <div className="sidebar p-6 bg-teal-100 dark:bg-teal-800 dark:text-white rounded-lg shadow-md w-full sm:w-80 md:w-80 lg:w-80 xl:w-80">
//       <h3 className="text-xl font-semibold text-teal-600 dark:text-teal-300 mb-4">
//         Product Filters
//       </h3>
//       <input
//         type="text"
//         onChange={handleSearchChange}
//         placeholder="Search products..."
//         className="p-3 w-full mb-4 rounded-md border-2 border-teal-500 bg-white dark:bg-teal-700 dark:border-teal-600 text-teal-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
//       />
//       <div className="flex flex-col mb-6">
//         <label className="text-teal-600 dark:text-teal-300 font-medium mb-2">
//           Sort by Name
//         </label>
//         <select
//           onChange={handleSortChange}
//           className="p-3 w-full rounded-md bg-white dark:bg-teal-700 border-2 border-teal-500 text-teal-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
//         >
//           <option value="asc">Sort A-Z</option>
//           <option value="desc">Sort Z-A</option>
//         </select>
//       </div>
//       <div>
//         <h4 className="text-teal-600 dark:text-teal-300 font-medium mb-2">
//           Categories
//         </h4>
//         <div className="flex flex-wrap">
//           <label className="inline-flex items-center mr-4 mb-4">
//             <input
//               type="checkbox"
//               value="makanan"
//               onChange={handleCategoryChange}
//               className="form-checkbox h-4 w-4 text-teal-600 dark:text-teal-300"
//             />
//             <span className="ml-2 text-teal-600 dark:text-teal-300">Food</span>
//           </label>
//           <label className="inline-flex items-center mr-4 mb-4">
//             <input
//               type="checkbox"
//               value="minuman"
//               onChange={handleCategoryChange}
//               className="form-checkbox h-4 w-4 text-teal-600 dark:text-teal-300"
//             />
//             <span className="ml-2 text-teal-600 dark:text-teal-300">Drink</span>
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SideBar;
