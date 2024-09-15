import { useEffect } from 'react'
import useApi from '../../hooks/useApi'
import { IMovie } from '../../models';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, MVProRootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, setMovies, setPageCount } from '../../redux/slicers/movie.slice';
import CategoryList from './categoryList';
import { generateRangeArray } from '../../utils/rangeArray';

function MovieFeed() {
    const getAllMovie = useApi();
    const getCategory = useApi();
    const dispatch: AppDispatch = useDispatch();
    const movieDetails = useSelector((mov: MVProRootState) => mov.MovieReducer);
    const navigate = useNavigate();
    const pagelimit = 18;




    useEffect(() => {
        (async () => {
            await getAllMovies(1);
            await getCategory.sendRequest({
                method: 'GET',
                url: 'category',
            });
        })()
    }, [])

    const getAllMovies = async (page: number) => {
        const res = await getAllMovie.sendRequest({
            method: 'GET',
            url: `movie?page=${page}&limit=${pagelimit}`
        });

        if (res) {
            const resMovies = res.result as { movies: IMovie[], total: number, page: number, limit: number }
            dispatch(setPageCount(resMovies.total));
            dispatch(setCurrentPage(resMovies.page));
            dispatch(setMovies(resMovies.movies));
        }
    }



    // h-[calc(100%-3.5rem)]
    // grid-rows-12 sm:grid-rows-8 md:grid-rows-6 lg:grid-rows-4
    return (
        <div className='grid grid-cols-1 md:grid-cols-12  '>

            <div className='col-span-1  hidden lg:block p-1 '>
                <h3 className='bg-primary p-2 rounded-md'>Categories</h3>
                <CategoryList />
            </div>

            <div>
                {generateRangeArray(Math.ceil(movieDetails.pageCount / pagelimit)).map((num, i) =>
                    <button className={`px-2 p-1 rounded-md ${movieDetails.currentPage === num ? 'bg-primary' : 'black'}  text-white m-1`} key={i} onClick={() => getAllMovies(num)}>{num}</button>
                )}
            </div>

            {
                movieDetails.movies &&

                <div className='
                col-span-12
                lg:col-span-10
                grid
                grid-rows-3
                grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5
                gap-4 p-4
                justify-start
                '>
                    {
                        movieDetails.movies.map((movie: IMovie, i: number) => <div key={i}
                            className='rounded-md'
                            style={{
                                backgroundColor: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'flex - start'
                            }}
                            onClick={() => {
                                navigate(`/movie/watch?vid=${movie.id}`);
                            }}>
                            <div className='max-h-[170px] '>
                                <img
                                    className='max-h-[165px]'
                                    src={movie.thumbnail_url !== null ?
                                        movie.thumbnail_url === "" ?
                                            `https://img.freepik.com/premium-vector/adults-only-18-plus-sensitive-content-explicit-video-vector-stock-illustration_100456-10148.jpg` :
                                            movie.thumbnail_url : ""}
                                    style={{ objectFit: 'contain', width: "100%", borderTopLeftRadius: "6px", borderTopRightRadius: "6px" }}
                                    alt={''}
                                />
                            </div>
                            <span className='text-white line-clamp-2 p-1 '> {movie.name}</span>
                        </div>)
                    }
                </div>
            }
        </div >
    )
}

export default MovieFeed
