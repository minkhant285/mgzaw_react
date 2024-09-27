import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, MVProRootState } from '../../redux/store';
import { useEffect, useState } from 'react';
import useApi from '../../hooks/useApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { ICategory, IMovie, STATUS_MESSAGE } from '../../models';
import { setCategories, setMovies } from '../../redux/slicers/movie.slice';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaFileVideo } from "react-icons/fa";
import ModalBox from '../../components/modal';
import MovieCategory from '../video/category';
import { GenericAbortSignal } from 'axios';


function MovieDashboard() {

    const movieDetails = useSelector((mov: MVProRootState) => mov.MovieReducer);

    const getAllMovie = useApi();
    const getCategory = useApi();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const pagelimit = 100;
    const deleteMovieApi = useApi();
    const [addCategoryModal, setNewCategoryModal] = useState<boolean>(false);
    const location = useLocation();
    const path = location.pathname.split('/');
    const activemode = (() => { if (path[path.length - 1] === 'dashboard') { return 'movie' } else { return path[path.length - 1] as 'movie' | 'category' } })();
    const [selectedCate, setSelectedCate] = useState<ICategory>();

    useEffect(() => {
        console.log(activemode)
        const controller = new AbortController(); // Create an AbortController instance
        const signal = controller.signal;
        (async () => {
            await getAllMovies(1, signal);
            await getAllCategories();
        })()

        return () => {
            controller.abort();
        };
    }, []);

    const deleteMovie = async (movie_id: string) => {
        const res = await deleteMovieApi.sendRequest({
            method: 'DELETE',
            url: `movie/${movie_id}`,

        });
        if (res && res?.status_message === STATUS_MESSAGE.SUCCESS) {
            await getAllMovies(1);

        }
    }
    const deleteCategory = async (category_id: string) => {
        const res = await deleteMovieApi.sendRequest({
            method: 'DELETE',
            url: `category/${category_id}`,

        });
        //@ts-ignore
        if (res && res?.status === 200) {
            await getAllCategories();

        }
    }

    const getAllMovies = async (page: number, signal?: GenericAbortSignal | undefined) => {
        console.log('get all move called')
        const res = await getAllMovie.sendRequest({
            method: 'GET',
            url: `movie?page=${page}&limit=${pagelimit}`,
            signal
        });

        if (res) {
            const resMovies = res.result as { movies: IMovie[], total: number, page: number, limit: number }
            dispatch(setMovies(resMovies.movies));
        }
    }

    const getAllCategories = async () => {
        const res = await getCategory.sendRequest({
            method: 'GET',
            url: 'category',
        });

        if (res) {
            const resCategories = res.result as ICategory[];
            dispatch(setCategories(resCategories));
            setNewCategoryModal(false)
        }
    }




    return (
        <div className='flex flex-1'>
            <div className='flex flex-col'>

                <button className='p-2 bg-primary text-white flex items-center m-2 rounded-md' onClick={() => navigate(`/manage/dashboard/movie`)}> <FaFileVideo />  Video</button>
                <button className='p-2 bg-primary text-white flex items-center m-2 rounded-md' onClick={() => navigate(`/manage/dashboard/category`)}> <FaFileVideo />  Category</button>

            </div>

            {activemode === 'movie' && movieDetails.movies && <div>
                <button className='p-2 bg-primary text-white flex items-center m-2 rounded-md' onClick={() => navigate('/video/create')}> <FaFileVideo />  Create New Video</button>
                <table className='table-auto border-collapse border border-slate-500 w-full min-w-max  text-left'>

                    <thead>
                        <tr>
                            {['Thumbnail', 'Name', 'Caption', 'Category', 'Action'].map((header, i) => <th key={i} className='p-2 border border-slate-600 ...'>{header}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            movieDetails.movies.map((mv) => <tr key={mv.id} className='flex text-white'>
                                <td className='p-2 border border-slate-600 ...'>

                                    <img src={mv.thumbnail_url} width={45} height={35} alt='thumbnail' />
                                </td>
                                <td className='p-2 border border-slate-600 ...'>

                                    <span>{mv.name}</span>
                                </td>
                                <td className='p-2'>

                                    <span>{mv.caption}</span>
                                </td>
                                <td className='p-2'>

                                    <div>
                                        {mv.categories.map((c) => <span className='text-xs p-1 rounded-md bg-primary' key={c.id}>{c.name}</span>)}
                                    </div>
                                </td>
                                <td className='p-2 flex gap-1'>
                                    <button className='px-2 mx-1 py-1 bg-[#00f] text-white rounded-md flex items-center'
                                        onClick={() => navigate(`/video/edit?vid=${mv.id}`)}
                                    >
                                        <MdEdit color='white' /> Edit
                                    </button>
                                    <button
                                        className='px-2 mx-1 py-1 bg-[#f00] text-white rounded-md flex items-center'
                                        onClick={() => confirm(`Are you sure want to delete ${mv.name}`) && deleteMovie(mv.id)}
                                    > <MdDelete color='white' />
                                        Delete</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table></div>}

            {activemode === 'category' && movieDetails.categories && <div>
                <button className='p-2 bg-primary text-white flex items-center m-2 rounded-md' onClick={() => setNewCategoryModal(!addCategoryModal)}> <FaFileVideo />  Create New Category</button>
                <ModalBox children={<MovieCategory
                    value={selectedCate}
                    apiRefresh={getAllCategories}
                />}
                    isOpen={addCategoryModal}
                    onClose={() => { setNewCategoryModal(false) }}
                />
                <table className='table-auto border-collapse border border-slate-500 w-full min-w-max  text-left'>


                    <thead>
                        <tr>
                            {['Name', 'Description', 'Action'].map((header, i) => <th key={i} className='p-2 border border-slate-600 ...'>{header}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            movieDetails.categories.map((ct) => <tr key={ct.id} className='flex text-white'>

                                <td className='p-2 border border-slate-600 ...'>

                                    <span>{ct.name}</span>
                                </td>
                                <td className='p-2'>

                                    <span>{ct.description}</span>
                                </td>

                                <td className='p-2 flex gap-1'>
                                    <button className='px-2 mx-1 py-1 bg-[#00f] text-white rounded-md flex items-center'
                                        onClick={() => { setSelectedCate(ct); setNewCategoryModal(true); }}
                                    >
                                        <MdEdit color='white' /> Edit
                                    </button>
                                    <button
                                        className='px-2 mx-1 py-1 bg-[#f00] text-white rounded-md flex items-center'
                                        onClick={() => confirm(`Are you sure want to delete ${ct.name}`) && deleteCategory(ct.id)}
                                    > <MdDelete color='white' />
                                        Delete</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table></div>}
        </div>
    )
}

export default MovieDashboard


// const DeleteConfirmBox: React.FC<{ movie: IMovie, deleteFunction: Function }> = ({ movie, deleteFunction }) => {

//     return <div className='bg-background flex flex-col gap-2'>
//         <h1>Are you sure want to delete?? {movie.id}</h1>
//         <img src={movie.thumbnail_url} width={45} height={35} alt='thumbnail' />
//         <span>{movie.name}</span>
//         <div className='flex'>
//             <button>Cancel</button>
//             <button onClick={() => deleteFunction()}>Delete</button>
//         </div>
//     </div>
// }
