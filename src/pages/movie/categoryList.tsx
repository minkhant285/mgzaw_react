import React, { useEffect } from 'react'
import useApi from '../../hooks/useApi';
import { ICategory, IMovie } from '../../models';
import { AppDispatch, MVProRootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setMovies } from '../../redux/slicers/movie.slice';

function CategoryList() {

    const getCategory = useApi();
    const getAllMovie = useApi();
    const getCategoryByName = useApi();
    const dispatch: AppDispatch = useDispatch();
    const movieDetails = useSelector((mov: MVProRootState) => mov.MovieReducer);
    let { c_name } = useParams();

    const navigate = useNavigate();

    const filterCategory = async (category: string) => {
        const res = await getCategoryByName.sendRequest({
            url: `category/search/${category}`,
            method: 'GET'
        }) as any;
        if (res) {
            dispatch(setMovies(res?.result[0][0].movies as IMovie[]));
        }
    }

    useEffect(() => {
        (async () => {
            if (c_name) {
                await filterCategory(c_name as string);
            } else {
                await getAllMovies();
            }
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

    return (
        <div className=' bg-[#000] text-white p-2 h-3/5 overflow-auto '>

            {
                getCategory.data && <div>

                    <div className=' m-2 rounded-md font-semibold px-2 cursor-pointer hover:bg-primary'
                        onClick={getAllMovies}
                    >
                        All
                    </div>
                    {
                        getCategory.data.map((category: ICategory, i: number) => <div
                            className=' m-2 rounded-md font-semibold px-2 cursor-pointer hover:bg-primary'
                            key={i}
                            onClick={() => filterCategory(category.name)}
                        >
                            {
                                category.name
                            }
                            <span className='mx-1 text-gray text-xs'>({
                                category.movies.length
                            })
                            </span>
                        </div>)
                    }
                </div>
            }
        </div>
    )
}

export default CategoryList
