import { useContext, useEffect } from 'react'
import useApi from '../../hooks/useApi';
import { ICategory } from '../../models';
import { AppDispatch, MVProRootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setActiveCategory, setCategories } from '../../redux/slicers/movie.slice';
import { AppContext } from '../../providers/app.provider';

function CategoryList() {

    const getCategory = useApi();
    const { modalControl } = useContext(AppContext);
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const categoryDetails = useSelector((mov: MVProRootState) => mov.MovieReducer);



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

    // h-[calc(100%-1.5rem)]

    return (
        <div className=' bg-[#000] w-full sm:w-[300px] text-white p-2 min-h-[calc(100vh-400px)] max-h-[calc(100vh-100px)] overflow-auto '>
            {
                categoryDetails.categories && <div>

                    <div className=' m-2 rounded-md font-semibold px-2 cursor-pointer hover:bg-primary'
                        onClick={() => { modalControl(false); navigate(`/video/page/1`); dispatch(setActiveCategory('0')) }}
                        style={{ backgroundColor: '0' === categoryDetails.activeCategory ? 'blue' : 'black' }}
                    >
                        <span >All
                            {/* <span className='mx-1 text-gray text-xs'>({categoryDetails.pageCount})</span>  */}
                        </span>
                    </div>
                    {
                        categoryDetails.categories.map((category: ICategory, i: number) => <div
                            className=' m-1 rounded-md font-semibold p-2 cursor-pointer hover:bg-primary'
                            style={{ backgroundColor: location.pathname.includes(encodeURIComponent(category.name)) ? 'blue' : 'black' }}
                            key={i}
                            onClick={() => { navigate(`/video/category/${category.name}/page/1`); modalControl(false) }}
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
