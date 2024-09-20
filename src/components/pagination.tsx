// import React from 'react';

// interface MovieDetails {
//     pageCount: number; // Total number of pages
//     currentPage: number; // Current active page
// }

// interface PaginationProps {
//     movieDetails: MovieDetails;
//     pageLimit: number;
//     getAllMovies: (pageNumber: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({ movieDetails, pageLimit, getAllMovies }) => {
//     const generateRangeArray = (count: number) => Array.from({ length: count }, (_, i) => i + 1);

//     // const totalPages = Math.ceil(movieDetails.pageCount / pageLimit);
//     const totalPages = Math.ceil(100);
//     const pages = generateRangeArray(totalPages);

//     const firstPages = pages.slice(0, 2); // First 5 pages
//     const lastPages = pages.slice(-1); // Last 3 pages
//     const currentPage = movieDetails.currentPage;

//     // Determine if we need to show ellipsis
//     const showEllipsis = totalPages > 8;

//     return (
//         <div className="pagination-container">
//             {firstPages.map((num, i) => (
//                 <button
//                     key={i}
//                     className={`px-2 p-1 rounded-md ${currentPage === num ? 'bg-secondary' : 'bg-black'} text-white m-1`}
//                     onClick={() => getAllMovies(num)}
//                 >
//                     {num}
//                 </button>
//             ))}

//             {/* Show ellipsis if necessary */}
//             {showEllipsis && currentPage < totalPages - 1 && (
//                 <span className="text-white px-2">...</span>
//             )}

//             {/* Display last 3 pages */}
//             {lastPages.map((num, i) => (
//                 <button
//                     key={`last-${i}`}
//                     className={`px-2 p-1 rounded-md ${currentPage === num ? 'bg-secondary' : 'bg-black'} text-white m-1`}
//                     onClick={() => getAllMovies(num)}
//                 >
//                     {num}
//                 </button>
//             ))}
//         </div>
//     );
// };

// export default Pagination;


import React from 'react';

interface MovieDetails {
    pageCount: number; // Total number of pages
    currentPage: number; // Current active page
}

interface PaginationProps {
    movieDetails: MovieDetails;
    pageLimit: number;
    getAllMovies: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ movieDetails, pageLimit, getAllMovies }) => {
    const generateRangeArray = (count: number) => Array.from({ length: count }, (_, i) => i + 1);

    const totalPages = Math.ceil(movieDetails.pageCount / pageLimit);
    const pages = generateRangeArray(totalPages);
    const currentPage = movieDetails.currentPage;

    const showAllPages = totalPages <= 10; // Show all pages if 10 or less
    const showEllipsis = totalPages > 10;

    // Handle display logic
    const firstPages = pages.slice(0, 2); // First 2 pages
    const lastPage = pages.slice(-1); // Last page
    const middlePages = pages.slice(2, 4); // Pages 3 and 4

    return (
        <div className="pagination-container">
            {/* If total pages are <= 10, show all pages */}
            {showAllPages
                ? pages.map((num, i) => (
                    <button
                        key={i}
                        className={`px-2 p-1 rounded-md ${currentPage === num ? 'bg-secondary' : 'bg-black'} text-white m-1`}
                        onClick={() => getAllMovies(num)}
                    >
                        {num}
                    </button>
                ))
                : (
                    <>
                        {/* Always show the first 2 pages */}
                        {firstPages.map((num, i) => (
                            <button
                                key={i}
                                className={`px-2 p-1 rounded-md ${currentPage === num ? 'bg-secondary' : 'bg-black'} text-white m-1`}
                                onClick={() => getAllMovies(num)}
                            >
                                {num}
                            </button>
                        ))}

                        {/* Show middle pages 3, 4 when on or near page 2 */}
                        {currentPage === 2 || currentPage > 2
                            ? middlePages.map((num, i) => (
                                <button
                                    key={`mid-${i}`}
                                    className={`px-2 p-1 rounded-md ${currentPage === num ? 'bg-secondary' : 'bg-black'} text-white m-1`}
                                    onClick={() => getAllMovies(num)}
                                >
                                    {num}
                                </button>
                            ))
                            : null}

                        {/* Show ellipsis if the current page is not close to the end */}
                        {showEllipsis && currentPage < totalPages - 2 && (
                            <span className="text-white px-2">...</span>
                        )}

                        {/* Always show the last page */}
                        {lastPage.map((num, i) => (
                            <button
                                key={`last-${i}`}
                                className={`px-2 p-1 rounded-md ${currentPage === num ? 'bg-secondary' : 'bg-black'} text-white m-1`}
                                onClick={() => getAllMovies(num)}
                            >
                                {num}
                            </button>
                        ))}
                    </>
                )}
        </div>
    );
};

export default Pagination;
