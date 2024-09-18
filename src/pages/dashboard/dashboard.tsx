import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, MVProRootState } from '../../redux/store';
import { useEffect } from 'react';
import useApi from '../../hooks/useApi';
import { useNavigate } from 'react-router-dom';
import { IMovie, STATUS_MESSAGE } from '../../models';
import { setMovies } from '../../redux/slicers/movie.slice';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaFileVideo } from "react-icons/fa";


function MovieDashboard() {

    const movieDetails = useSelector((mov: MVProRootState) => mov.MovieReducer);

    const getAllMovie = useApi();
    const getCategory = useApi();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const pagelimit = 100;
    const deleteMovieApi = useApi();



    useEffect(() => {
        (async () => {
            await getAllMovies(1);
            await getCategory.sendRequest({
                method: 'GET',
                url: 'category',
            });
        })()
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

    const getAllMovies = async (page: number) => {
        const res = await getAllMovie.sendRequest({
            method: 'GET',
            url: `movie?page=${page}&limit=${pagelimit}`
        });

        if (res) {
            const resMovies = res.result as { movies: IMovie[], total: number, page: number, limit: number }
            // dispatch(setPageCount(resMovies.total));
            // dispatch(setCurrentPage(resMovies.page));
            dispatch(setMovies(resMovies.movies));
        }
    }




    return (
        <div className='flex flex-1'>
            <div>
                <button className='p-2 bg-primary text-white flex items-center m-2 rounded-md' onClick={() => navigate('/movie/create')}> <FaFileVideo />  Create New Video</button>

            </div>
            {movieDetails.movies && <table className='table-auto border-collapse border border-slate-500 w-full min-w-max  text-left'>
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
                                    onClick={() => navigate(`/movie/edit?vid=${mv.id}`)}
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
            </table>}
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
