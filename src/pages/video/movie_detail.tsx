import React, { useState } from 'react'
import useApi from '../../hooks/useApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { ICategory, IMovie } from '../../models';
import { MdDownload } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, MVProRootState } from '../../redux/store';
import { setMovies } from '../../redux/slicers/movie.slice';
import { formatDistanceToNow } from 'date-fns';
import { Banner } from 'exoclick-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import FluidVideoPlayer from '../../components/videoplayer';

function Movie() {

    const getMovie = useApi('', true);
    const getAllMovies = useApi('', true);
    const addViewCount = useApi('', true);
    const location = useLocation();
    const navigate = useNavigate();
    const movieDetails = useSelector((mov: MVProRootState) => mov.MovieReducer);
    const dispatch: AppDispatch = useDispatch();
    const [currentMovie, setCurrentMovie] = useState<IMovie>();
    const [, setSeconds] = useState(0);
    const pathName = location.pathname.split('/');
    const currentMvName = decodeURIComponent(pathName[pathName.length - 1]);

    const loadMovieDetail = async () => {
        const res = await getMovie.sendRequest({
            method: 'GET',
            url: `movie/get_by_name/${currentMvName}`
        });
        const m = res?.result as IMovie;

        if (JSON.stringify(currentMovie) !== JSON.stringify(m)) {
            setCurrentMovie(m);
            document.title = `mgzaw - ${m.name}`;

            setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds === 10) {
                        (async () => {
                            await addViewCountHandler(m.id);
                        })()

                    }
                    return prevSeconds + 1
                });
            }, 1000);
        }
    }

    const addViewCountHandler = async (id: string) => {
        await addViewCount.sendRequest({
            method: 'PUT',
            url: `movie/add/view/${id}`
        });
    }




    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        (async () => {
            await loadMovieDetail();

            if (movieDetails.movies === null) {
                const res = await getAllMovies.sendRequest({
                    method: 'GET',
                    url: `movie?page=${1}&limit=${10}`
                })
                if (res) {
                    const resMovies = res.result as { movies: IMovie[], total: number, page: number, limit: number }
                    dispatch(setMovies(resMovies.movies));


                }
            }
        })();



    }, [location.pathname])

    // h-[calc(100%-3.5rem)] overflow-auto




    return (
        <div className='grid contain grid-cols-1 md:grid-cols-12 '>
            <div className='col-span-2 p-3  hidden lg:block '>
                {process.env.NODE_ENV === 'production' && <Banner zoneId={5426620} />}
            </div>

            <div className='lg:col-span-6 md:col-span-7  p-0 sm:p-4'>
                {currentMovie && <div className='flex flex-col'>
                    {/* {currentMovie.url} */}
                    <div className='h-[55px] flex justify-center  my-1'>
                        {process.env.NODE_ENV === 'production' && <Banner zoneId={5426622} />}
                    </div>

                    {/* {`https://mgzaw.sgp1.cdn.digitaloceanspaces.com/hls/${currentMovie.url.split('/').pop()?.split('.')[0].trim()}/${currentMovie.url}`} */}


                    <FluidVideoPlayer
                        thumbnail_url={currentMovie.thumbnail_url}
                        adTagUrl='https://s.magsrv.com/v1/vast.php?idzone=5426628'
                        // videoUrl='http://localhost:3000/hls/just/master.m3u8'
                        videoUrl={`https://mgzaw.sgp1.cdn.digitaloceanspaces.com/hls/${currentMovie.url.split('/').pop()?.split('.')[0].trim()}/${currentMovie.url}`}
                    />

                    <div className='lg:hidden  flex justify-center'>
                        {process.env.NODE_ENV === 'production' && <Banner zoneId={5426612} />}
                    </div>


                    <div className='bg-[#242424] flex justify-between items-start p-2'>
                        <div className='w-full mt-1'>
                            <div className='flex justify-between w-full items-center'>
                                <span className='text-white  font-bold'>
                                    {currentMvName}
                                </span>
                                <button
                                    onClick={() => navigate(`/video/download?vid=${currentMovie.id}`)}
                                    className='flex justify-center items-center p-1 pl-3 text-white text-xs  bg-secondary rounded-md download-btn'>
                                    Download
                                    <MdDownload
                                        className="text-white  shadow-lg mx-1 "
                                        size={20} />
                                </button>
                            </div>

                            <div className='flex p-1 gap-2 flex-wrap mt-[3px] '>
                                {
                                    getMovie.data.categories.map((c: ICategory, i: number) => <div
                                        key={i}
                                        onClick={() => navigate(`/video/category/${c.name}`)}
                                        className='bg-primary p-[5px] px-2 text-white rounded-md shadow-md text-[10px] cursor-pointer'
                                    >{c.name}</div>)
                                }
                            </div>

                            <div className='flex flex-col text-white'>
                                <span className='text-[#7e8a9d] text-[0.7em]'>Views: {currentMovie.view_count}</span>
                                <span className='text-[#7e8a9d] text-[0.7em]'>{formatDistanceToNow(new Date(currentMovie.created_at as Date), { addSuffix: true })}</span>
                            </div>
                        </div>
                    </div>



                </div>
                }
            </div>

            <div className='lg:col-span-2 md:col-span-5  flex-col  p-2 overflow-auto max-h-[calc(100vh-140px)]'>


                {/* <div className='grid grid-cols-3  w-full mt-2 justify-start cursor-pointer bg-primary h-[80px]'>
                    ad
                </div> */}

                {
                    movieDetails.movies && movieDetails.movies.map((movie: IMovie, i: number) =>
                        <div className='grid grid-cols-3  w-full mt-2 justify-start cursor-pointer' key={i} onClick={() => {
                            navigate(`/video/watch/${movie.name.trim()}`)
                            navigate(0)
                        }}>
                            <div>
                                <LazyLoadImage
                                    // src={`https://img.freepik.com/premium-vector/adults-only-18-plus-sensitive-content-explicit-video-vector-stock-illustration_100456-10148.jpg`}
                                    src={movie.thumbnail_url !== null ? movie.thumbnail_url : `https://img.freepik.com/premium-vector/adults-only-18-plus-sensitive-content-explicit-video-vector-stock-illustration_100456-10148.jpg`}
                                    style={{ objectFit: 'contain', width: 130, height: 80, backgroundColor: 'black' }}
                                    alt={''}
                                />
                            </div>
                            <div className='px-2 flex flex-col col-span-2'>
                                <span className='text-white text-[0.8em] line-clamp-2  '> {movie.name}</span>
                                <span className='text-[#7e8a9d] text-[0.7em]'>Views: {movie.view_count}</span>
                                <span className='text-[#7e8a9d] text-[0.7em]'>{formatDistanceToNow(new Date(movie.created_at as Date), { addSuffix: true })}</span>
                            </div>
                        </div>
                    )
                }
                {/* <div className='grid grid-cols-3  w-full mt-2 justify-start cursor-pointer bg-primary h-[400px]'>
                    <Outstream zoneId="5426636" maxWidth={400} />

                </div> */}
            </div>

            <div className='col-span-2 ml-10  hidden lg:block p-3'>
                {process.env.NODE_ENV === 'production' && <Banner zoneId={5426632} />}
            </div>
        </div>
    )
}

export default Movie
