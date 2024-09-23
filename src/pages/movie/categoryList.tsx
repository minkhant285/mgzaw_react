import { useContext, useEffect } from 'react'
import useApi from '../../hooks/useApi';
import { ICategory, IMovie } from '../../models';
import { AppDispatch, MVProRootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setActiveCategory, setCategories, setCurrentPage, setMovies, setPageCount } from '../../redux/slicers/movie.slice';
import { AppContext } from '../../providers/app.provider';
import { loadMovieLimit } from '../../utils/constant';

function CategoryList() {

    const getCategory = useApi();
    const getAllMovie = useApi();
    const { modalControl } = useContext(AppContext);
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const categoryDetails = useSelector((mov: MVProRootState) => mov.MovieReducer);


    const filterCategory = async (category: string) => {
        const res = await getAllMovie.sendRequest({
            method: 'GET',
            url: `movie?page=${1}&limit=${loadMovieLimit}&category_id=${category}`
        })
        if (res) {
            const resMovies = res.result as { movies: IMovie[], total: number, page: number, limit: number }
            dispatch(setMovies(resMovies.movies));
            dispatch(setActiveCategory(category));
            dispatch(setPageCount(resMovies.total));
            dispatch(setCurrentPage(resMovies.page));
        }
    }

    useEffect(() => {
        (async () => {

            if (categoryDetails.categories === null) {
                const category_res = await getCategory.sendRequest({
                    method: 'GET',
                    url: 'category'
                });
                if (category_res) {
                    const res = category_res.result as ICategory[];
                    if (res.length > 0) {
                        dispatch(setCategories(res));
                    }
                }
            }
        })()
    }, [])

    const getAllMovies = async () => {
        const res = await getAllMovie.sendRequest({
            method: 'GET',
            url: `movie?page=${1}&limit=${loadMovieLimit}`
        })
        if (res) {
            const resMovies = res.result as { movies: IMovie[], total: number, page: number, limit: number }
            dispatch(setPageCount(resMovies.total));
            dispatch(setCurrentPage(resMovies.page));
            dispatch(setMovies(resMovies.movies));
        }
    }

    // h-[calc(100%-1.5rem)]

    return (
        <div className=' bg-[#000] w-[300px] text-white p-2 min-h-[calc(100vh-400px)] max-h-[calc(100vh-100px)] overflow-auto '>
            {
                categoryDetails.categories && <div>

                    <div className=' m-2 rounded-md font-semibold px-2 cursor-pointer hover:bg-primary'
                        onClick={() => { getAllMovies(); modalControl(false); navigate('/'); dispatch(setActiveCategory('0')) }}
                        style={{ backgroundColor: '0' === categoryDetails.activeCategory ? 'blue' : 'black' }}
                    >
                        <span >All <span className='mx-1 text-gray text-xs'>({categoryDetails.pageCount})</span> </span>
                    </div>
                    {
                        categoryDetails.categories.map((category: ICategory, i: number) => <div
                            className=' m-2 rounded-md font-semibold px-2 cursor-pointer hover:bg-primary'
                            style={{ backgroundColor: category.name.toLocaleLowerCase() === categoryDetails.activeCategory.toLocaleLowerCase() ? 'blue' : 'black' }}
                            key={i}
                            onClick={() => { navigate(`/video/category/${category.name}`); filterCategory(category.name); modalControl(false) }}
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
