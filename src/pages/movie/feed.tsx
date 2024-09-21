import { useEffect } from 'react'
import useApi from '../../hooks/useApi'
import { IMovie } from '../../models';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch, MVProRootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategory, setCurrentPage, setMovies, setPageCount } from '../../redux/slicers/movie.slice';
import CategoryList from './categoryList';
import { generateRangeArray } from '../../utils/rangeArray';
import { loadMovieLimit } from '../../utils/constant';
import ResponsiveImage from '../../components/responsiveImage';
import { formatDistanceToNow } from 'date-fns';

function MovieFeed() {
    const getAllMovie = useApi();
    const getCategory = useApi();
    const dispatch: AppDispatch = useDispatch();
    const movieDetails = useSelector((mov: MVProRootState) => mov.MovieReducer);
    const navigate = useNavigate();
    const pagelimit = loadMovieLimit;
    const location = useLocation();



    useEffect(() => {
        (async () => {
            document.title = `mgzaw (မောင်ဇော်)`;
            await getAllMovies(1);
            await getCategory.sendRequest({
                method: 'GET',
                url: 'category',
            });
        })()
    }, [])

    const getAllMovies = async (page: number) => {

        let categorypath = location.pathname.split('/');
        if (location.pathname.includes('/video/category')) {
            dispatch(setActiveCategory(decodeURIComponent(categorypath[categorypath.length - 1])));
        }
        const res = await getAllMovie.sendRequest({
            method: 'GET',
            url: location.pathname.includes('/video/category') ?
                `movie?page=${page}&limit=${pagelimit}&category_id=${categorypath[categorypath.length - 1]}` :
                `movie?page=${page}&limit=${pagelimit}`
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

            <div className='col-span-2  hidden p-1  lg:flex flex-col justify-start  h-[calc(100vh-137px)] '>
                <h3 className='bg-primary p-2 rounded-md text-white'>Categories</h3>
                <CategoryList />
                {/* <div className='bg-[#f00] h-[200px]'>
                    AD component
                </div> */}
            </div>

            <div className='
                col-span-12
                lg:col-span-10
                gap-4 p-0 sm:p-2
                h-fit
                grid-rows-3
            '>
                {/* <div className='flex  h-[60px]'>
                    AD component
                </div> */}

                {
                    movieDetails.movies && <div className='
                grid
                grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5
                 gap-4 p-2
                justify-start
                '>
                        {
                            movieDetails.movies.map((movie: IMovie, i: number) => <div key={i}
                                className='rounded-md bg-black'
                                style={{
                                    display: 'flex', flexDirection: 'column', justifyContent: 'flex - start'
                                }}
                                onClick={() => {
                                    navigate(`/movie/watch/${movie.name}`);
                                }}>
                                <div className='max-h-[170px] bg-black'>
                                    <ResponsiveImage
                                        alt=''
                                        containerHeight={150}
                                        src={movie.thumbnail_url !== null ?
                                            movie.thumbnail_url === "" ?
                                                `https://img.freepik.com/premium-vector/adults-only-18-plus-sensitive-content-explicit-video-vector-stock-illustration_100456-10148.jpg` :
                                                movie.thumbnail_url : ""}
                                    />
                                </div>
                                <div className='px-1 pb-2 flex flex-col'>
                                    <span className='text-white text-[0.8em] line-clamp-2  '> {movie.name}</span>
                                    <span className='text-[#7e8a9d] text-[0.7em]'>Views: {movie.view_count}</span>
                                    <span className='text-[#7e8a9d] text-[0.7em]'>{formatDistanceToNow(new Date(movie.created_at as Date), { addSuffix: true })}</span>
                                </div>
                            </div>)
                        }
                    </div>}

                <div className=' flex justify-center overflow-y-auto w-[100%] '>

                    {generateRangeArray(Math.ceil(movieDetails.pageCount / pagelimit)).map((num, i) =>

                        <button className={`px-2 p-1  rounded-md ${movieDetails.currentPage === num ? 'bg-secondary' : 'bg-background'}  text-white m-1`} key={i} onClick={() => getAllMovies(num)}>{num}</button>

                    )}


                </div>
            </div>

        </div >
    )
}

export default MovieFeed
