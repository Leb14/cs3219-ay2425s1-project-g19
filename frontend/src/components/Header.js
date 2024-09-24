// import React, { useState } from "react";

// const Header = ({onSearchResult}) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);

//   const handleSearch = async (e) => {
//     e.preventDefault(); // Prevent the form from submitting in the default way
//     try {
//       const data = await getQuestionByTitle(searchTerm);
//       setResult(data);
//       onSearchResult(data, null); // Pass the result to Questions
//       setError(null);
//     } catch (err) {
//       setError("Error fetching question");
//       onSearchResult(null, "Error fetching question"); // Pass error to Questions
//     }
//   };

//   return (
//     <header className="header navbar navbar-dark flex-md-nowrap shadow">
//       <form
//         className="nav col-12 col-md-auto flex-fill justify-content-center"
//         role="search"
//         method="GET"
//         action="/search"
//         onSubmit={handleSearch} // Handle form submit
//       >
//         <input
//           type="search"
//           name="searchTerm"
//           className="form-control form-control-dark w-100 rounded-0 border-0"
//           placeholder="Search..."
//           aria-label="Search"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input
//         />
//       </form>
//       {/* Display results or error message */}
//       <div className="search-results">
//         {error && <p>{error}</p>}
//         {result && (
//           <div>
//             <h4>Search Results:</h4>
//             {/* Render the result data */}
//             <pre>{JSON.stringify(result, null, 2)}</pre>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;
