import React from 'react'
import useApi from '../../hooks/useApi';
import { useSearchParams } from 'react-router-dom';
import { ICategory } from '../../models';
import { MdDownload } from "react-icons/md";


function Movie() {

    const getMovie = useApi();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('vid');

    React.useEffect(() => {
        (async () => {
            await getMovie.sendRequest({
                method: 'GET',
                url: `movie/${id}`
            });

        })()
    }, [])

    return (
        <div className='grid grid-cols-1 md:grid-cols-12 h-[calc(100%-3.5rem)] grid-rows-1 '>
            <div className='col-span-2 hidden lg:block'></div>
            <div className='col-span-5  p-0 sm:p-4 '>
                {getMovie.data && <div className='flex flex-col'>
                    <div className='h-fit w-full '>
                        {/* <ReactPlayer
                            autoPlay={false} width="100%" height={window.innerWidth < 400 ? 205 : '100%'}
                            poster={getMovie.data.thumbnail_url}
                            url={getMovie.data.url}
                            config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                            onContextMenu={(e: any) => e.preventDefault()}
                            controls
                        /> */}
                        <video
                            controls
                            controlsList='nodownload'
                            onContextMenu={(e: any) => e.preventDefault()}
                            poster={getMovie.data.thumbnail_url}
                            style={{ backgroundColor: 'black', width: '100%', maxHeight: 350, height: window.innerWidth < 400 ? 205 : '0%' }}
                        >
                            <source src={getMovie.data.url}></source>
                        </video>

                    </div>
                    <div className='bg-[#242424] flex justify-between items-start px-2'>
                        <div>
                            <span className='text-white text-sm'>Categories</span>
                            <div className='flex p-2 gap-2 flex-wrap '>
                                {
                                    getMovie.data.categories.map((c: ICategory, i: number) => <div
                                        key={i}
                                        className='bg-primary p-2 h-8 text-white rounded-md shadow-md text-xs'
                                    >{c.name}</div>)
                                }
                            </div>
                        </div>
                        <div className='flex justify-center items-center p-1 pl-3 text-white text-sm bg-secondary rounded-md'>
                            Download
                            <MdDownload
                                className="text-white  shadow-lg mx-1 "
                                size={25} />
                        </div>
                    </div>
                </div>
                }
            </div>
            <div></div>
        </div>
    )
}

export default Movie
