import { useContext, useEffect } from 'react'
import useApi from '../../hooks/useApi';
import { ICategory, IMovie } from '../../models';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setMovies } from '../../redux/slicers/movie.slice';
import { AppContext } from '../../providers/app.provider';

function CategoryList() {

    const getCategory = useApi();
    const getAllMovie = useApi();
    const getCategoryByName = useApi();
    const dispatch: AppDispatch = useDispatch();
    const { modalControl } = useContext(AppContext);
    let { c_name } = useParams();


    const filterCategory = async (category: string) => {
        const res = await getCategoryByName.sendRequest({
            url: `category/search/${category}`,
            method: 'GET'
        }) as any;
        if (res) {
            dispatch(setMovies(res?.result[0][0].movies as IMovie[]));
            modalControl(false)
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
                        onClick={() => { getAllMovies(); modalControl(false); }}
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
