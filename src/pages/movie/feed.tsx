import { useEffect } from 'react'
import useApi from '../../hooks/useApi'
import { IMovie } from '../../models';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, MVProRootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setMovies } from '../../redux/slicers/movie.slice';
import CategoryList from './categoryList';

function MovieFeed() {
    const getAllMovie = useApi();
    const getCategory = useApi();
    const dispatch: AppDispatch = useDispatch();
    const movieDetails = useSelector((mov: MVProRootState) => mov.MovieReducer);

    const navigate = useNavigate();



    useEffect(() => {
        (async () => {
            await getAllMovies();
            await getCategory.sendRequest({
                method: 'GET',
                url: 'category'
            });
        })()
    }, [])

    const getAllMovies = async () => {
        const res = await getAllMovie.sendRequest({
            method: 'GET',
            url: 'movie'
        })
        if (res) {
            dispatch(setMovies(res.result as IMovie[]));
        }
    }



    // h-[calc(100%-3.5rem)]
    // grid-rows-12 sm:grid-rows-8 md:grid-rows-6 lg:grid-rows-4
    return (
        <div className='grid grid-cols-1 md:grid-cols-12  '>

            <div className='col-span-2  hidden lg:block p-1 '>
                <h3 className='bg-primary p-2 rounded-md'>Categories</h3>
                <CategoryList />
            </div>

            {
                movieDetails.movies &&

                <div className='
                col-span-12
                lg:col-span-10
                grid
                grid-rows-3
                grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
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
