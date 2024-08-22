import { useEffect } from 'react'
import useApi from '../../hooks/useApi'
import { ICategory, IMovie } from '../../models';
import { useNavigate } from 'react-router-dom';

function MovieFeed() {
    const getAllMovie = useApi();
    const getCategory = useApi();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            await getAllMovie.sendRequest({
                method: 'GET',
                url: 'movie'
            });
            await getCategory.sendRequest({
                method: 'GET',
                url: 'category'
            })
        })()
    }, [])

    return (
        <div className='grid grid-cols-1 md:grid-cols-12 h-[calc(100%-3.5rem)] '>
            <div className='col-span-2 bg-[#f00] hidden md:block'>
                {
                    getCategory.data && <div>
                        {
                            getCategory.data.map((category: ICategory, i: number) => <div key={i}>
                                {
                                    category.name
                                }
                            </div>)
                        }
                    </div>
                }
            </div>
            {
                getAllMovie.data && <div className='
                col-span-10
                grid
                grid-rows-16 sm:grid-rows-8 md:grid-rows-6 lg:grid-rows-4
                grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4
                gap-4 p-4
                justify-start
                '>
                    {
                        getAllMovie.data.map((movie: IMovie, i: number) => <div key={i}
                            className='rounded-md'
                            style={{ backgroundColor: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}
                            onClick={() => {
                                navigate(`/movie/watch?vid=${movie.id}`)
                            }}>
                            <div className='h-[170px]'>
                                <img
                                    // src={`https://img.freepik.com/premium-vector/adults-only-18-plus-sensitive-content-explicit-video-vector-stock-illustration_100456-10148.jpg`}
                                    src={movie.thumbnail_url !== null ? movie.thumbnail_url : `https://img.freepik.com/premium-vector/adults-only-18-plus-sensitive-content-explicit-video-vector-stock-illustration_100456-10148.jpg`}
                                    style={{ objectFit: 'contain', width: "100%", maxHeight: 165, borderTopLeftRadius: "6px", borderTopRightRadius: "6px" }}
                                    alt={''}
                                />
                            </div>
                            <span className='text-white line-clamp-2 '> {movie.name}</span>
                        </div>)
                    }
                </div>

            }
        </div>
    )
}

export default MovieFeed
