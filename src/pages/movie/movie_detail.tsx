import React, { useState } from 'react'
import useApi from '../../hooks/useApi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ICategory, IMovie } from '../../models';
import { MdDownload } from "react-icons/md";


function Movie() {

    const getMovie = useApi();
    const getAllMovie = useApi();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('vid');
    const navigate = useNavigate();

    const loadMovieDetail = async () => {
        await getMovie.sendRequest({
            method: 'GET',
            url: `movie/${id}`
        });
    }

    React.useEffect(() => {
        (async () => {
            await loadMovieDetail();

            await getAllMovie.sendRequest({
                method: 'GET',
                url: 'movie'
            });


        })();

        console.log("reloaded")
    }, [id])

    return (
        <div className='grid contain grid-cols-1 md:grid-cols-12 h-[calc(100%-3.5rem)] overflow-auto '>
            <div className='col-span-2  hidden lg:block'></div>

            <div className='lg:col-span-5 md:col-span-7  p-0 sm:p-4'>
                {getMovie.data && <div className='flex flex-col'>

                    <div className='h-fit w-full sticky top-'>

                        <video
                            controls
                            controlsList='nodownload'
                            onContextMenu={(e: any) => e.preventDefault()}
                            poster={getMovie.data.thumbnail_url}
                            style={{ backgroundColor: 'black', width: '100%', maxHeight: 350, height: window.innerWidth < 400 ? 220 : '0%' }}
                        >
                            <source src={getMovie.data.url}></source>
                        </video>
                    </div>

                    <div className='bg-[#242424] flex justify-between items-start p-2'>
                        <div className='w-full mt-1'>
                            <div className='flex justify-between w-full items-center'>
                                <span className='text-white  font-bold'>
                                    {getMovie.data.name}
                                </span>
                                <div className='flex justify-center items-center p-1 pl-3 text-white text-xs  bg-secondary rounded-md'>
                                    Download
                                    <MdDownload
                                        className="text-white  shadow-lg mx-1 "
                                        size={20} />
                                </div>
                            </div>
                            <div className='flex p-2 gap-2 flex-wrap mt-[5px] '>
                                {
                                    getMovie.data.categories.map((c: ICategory, i: number) => <div
                                        key={i}
                                        className='bg-primary p-[5px] px-2 text-white rounded-md shadow-md text-[8px]'
                                    >{c.name}</div>)
                                }
                            </div>
                        </div>
                    </div>

                    <div className='h-[220px] hidden md:block'></div>

                </div>
                }
            </div>

            <div className='lg:col-span-3 md:col-span-5  flex-col  p-2 overflow-auto'>
                {
                    getAllMovie.data && getAllMovie.data.map((movie: IMovie, i: number) =>
                        <div className='grid grid-cols-3  w-full mt-2 justify-start cursor-pointer' key={i} onClick={() => {
                            navigate(`/movie/watch?vid=${movie.id}`)
                            navigate(0)
                        }}>
                            <div >
                                <img
                                    // src={`https://img.freepik.com/premium-vector/adults-only-18-plus-sensitive-content-explicit-video-vector-stock-illustration_100456-10148.jpg`}
                                    src={movie.thumbnail_url !== null ? movie.thumbnail_url : `https://img.freepik.com/premium-vector/adults-only-18-plus-sensitive-content-explicit-video-vector-stock-illustration_100456-10148.jpg`}
                                    style={{ objectFit: 'contain', width: 130, height: 80, backgroundColor: 'black' }}
                                    alt={''}
                                />
                            </div>
                            <div className='px-2 flex flex-col col-span-2'>
                                <span className='text-white  text-sm font-bold line-clamp-1'> {movie.name}</span>
                                <span className='text-white  text-[0.8em] font-light line-clamp-2'> {movie.caption}</span>
                            </div>
                        </div>
                    )
                }
            </div>

            <div className='col-span-2  hidden lg:block'></div>
        </div>
    )
}

export default Movie
