import { useEffect } from 'react'
import useApi from '../../hooks/useApi'
import { IMovie } from '../../models';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, MVProRootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategory, setMovies, setPageCount } from '../../redux/slicers/movie.slice';
import CategoryList from './categoryList';
import { generateRangeArray } from '../../utils/rangeArray';
import { loadMovieLimit } from '../../utils/constant';
import ResponsiveImage from '../../components/responsiveImage';
import { formatDistanceToNow } from 'date-fns';
import { Banner, FullpageInterstitial } from "exoclick-react";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { IoIosCreate } from "react-icons/io";
import Pagination from '../../components/pagination';

function MovieFeed() {
    const paginationLimit = 10;
    const getAllMovie = useApi();
    const getCategory = useApi();
    const dispatch: AppDispatch = useDispatch();
    const movieDetails = useSelector((mov: MVProRootState) => mov.MovieReducer);
    const navigate = useNavigate();
    const pagelimit = loadMovieLimit;
    const location = useLocation();
    const param = useParams() as { pg_number: string; c_name: string };


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        (async () => {
            document.title = `mgzaw (မောင်ဇော်)`;
            await getAllMovies(Number.parseInt(param.pg_number));
            await getCategory.sendRequest({
                method: 'GET',
                url: 'category',
            });
        })()
    }, [location.key])

    const getAllMovies = async (page: number) => {

        const splitedPath = location.pathname.split('/');
        if (location.pathname.includes('/video/category')) {
            dispatch(setActiveCategory(decodeURIComponent(splitedPath[splitedPath.length - 1])));
        }

        const res = await getAllMovie.sendRequest({
            method: 'GET',
            url: location.pathname.includes('/video/category') ?
                `movie?page=${page}&limit=${pagelimit}&category_id=${param.c_name}` :
                `movie?page=${page}&limit=${pagelimit}`
        });

        if (res) {
            const resMovies = res.result as { movies: IMovie[], total: number, page: number, limit: number }
            dispatch(setPageCount(resMovies.total));
            dispatch(setMovies(resMovies.movies));
        }
    }



    // h-[calc(100%-3.5rem)]
    // grid-rows-12 sm:grid-rows-8 md:grid-rows-6 lg:grid-rows-4
    return (
        <div className='grid grid-cols-1 md:grid-cols-12  '>

            <FullpageInterstitial
                zoneId={5426540}
                frequencyType="clicks"
                firstTriggerClicks={1}
                nextTriggerClicks={1}
                triggerClass={['demo-mobile']}
            />

            <div className='col-span-2 hidden p-1 w-[300px] lg:flex flex-col justify-start  h-[calc(100vh-137px)] '>
                <h3 className='bg-primary p-1 rounded-md text-white w-[300px]'>Categories</h3>
                <CategoryList />
                <div className='w-[300px] h-[260px] pt-3'>
                    {process.env.NODE_ENV === 'production' && <Banner zoneId={5426568} />}
                </div>
            </div>

            <div className='
                col-span-12
                lg:col-span-8
                gap-4 p-0 sm:p-2
                h-fit
                grid-rows-3
            '>

                {/* mobile ad */}
                <div className='flex w-full sm:hidden  justify-center pt-1 h-[102px]'>
                    {process.env.NODE_ENV === 'production' && <Banner zoneId={5425982} />}
                </div>

                {/* mobile ad */}


                {
                    movieDetails.movies && <div className='
                grid
                grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5
                 gap-4 p-2
                justify-start
                sm:ml-[50px]
                '>
                        {
                            movieDetails.movies.map((movie: IMovie, i: number) => <div key={i}
                                className='rounded-md bg-black'
                                style={{
                                    display: 'flex', flexDirection: 'column', justifyContent: 'flex - start'
                                }}
                                onClick={() => {
                                    navigate(`/video/watch/${movie.name}`);
                                }}>
                                <div className='max-h-[170px] bg-black'>
                                    <a href="" onClick={e => e.preventDefault()} className="demo-mobile">
                                        <ResponsiveImage
                                            alt=''
                                            containerHeight={150}
                                            src={movie.thumbnail_url !== null ?
                                                movie.thumbnail_url === "" ?
                                                    `https://img.freepik.com/premium-vector/adults-only-18-plus-sensitive-content-explicit-video-vector-stock-illustration_100456-10148.jpg` :
                                                    movie.thumbnail_url : ""}
                                        />
                                    </a>
                                </div>
                                <div className=' pb-2 flex flex-col px-2'>
                                    <span className='text-white text-[0.8em] line-clamp-2  '> {movie.name}</span>
                                    <div className='flex items-center justify-between py-1 '>
                                        {movie.duration && <div className='flex gap-1 items-center'>
                                            <MdOutlineOndemandVideo size={15} color='white' />
                                            <span className='text-[#7e8a9d] text-[0.7em]'> {movie.duration.replace(/\.\d{2}/, '')}</span>
                                        </div>}
                                        <div className='flex gap-1 items-center pr-2'>
                                            <IoEye size={15} color='white' />
                                            <span className='text-[#7e8a9d] text-[0.7em]'> {movie.view_count} views</span>
                                        </div>
                                    </div>
                                    <div className='flex gap-1 items-center '>
                                        <IoIosCreate size={15} color='white' />
                                        <span className='text-[#7e8a9d] text-[0.7em]'>{formatDistanceToNow(new Date(movie.created_at as Date), { addSuffix: true })}</span>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>}

                <div className='flex flex-col w-full'>
                    <div className='flex w-full sm:hidden  justify-center pt-1 h-[55px] mb-2'>
                        {process.env.NODE_ENV === 'production' && <Banner zoneId={5430480} />}
                    </div>
                    <div className=' flex justify-center overflow-y-auto w-[100%] '>
                        <Pagination limit={paginationLimit} totalPage={generateRangeArray(Math.ceil(movieDetails.pageCount / pagelimit))} />
                    </div>
                </div>
            </div>

            <div className='col-span-2'>
                <div className='hidden sm:flex  justify-center'>
                    {process.env.NODE_ENV === 'production' && <Banner zoneId={5425870} />}
                </div>
            </div>

        </div >
    )
}

export default MovieFeed
