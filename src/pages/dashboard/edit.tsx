import { useForm } from 'react-hook-form';
import useApi from '../../hooks/useApi';
import { useEffect, useRef, useState } from 'react';
import { ICategory, IMovie } from '../../models';
import ReactSelect from 'react-select';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MovieCategory from '../video/category';
import ModalBox from '../../components/modal';
import { AppDispatch, MVProRootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '../../redux/slicers/movie.slice';

type MovieInput = {
    name: string
    caption: string,
    description: string
}



const EditMovie = () => {
    // Initialize React Hook Form
    const [currentMovie, setCurrentMovie] = useState<IMovie>();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<MovieInput>({
        mode: 'onBlur',
        defaultValues: {
            name: "",
            caption: "",
            description: ""
        }
    });


    const updateMovie = useApi();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const getCategory = useApi();
    const [selectedCategory, setCategory] = useState<ICategory[]>();
    // const { loadingControl, token } = useContext(AppContext);
    const navigate = useNavigate();
    const [addCategory, setNewCategory] = useState<any>();
    const categoryDetails = useSelector((mov: MVProRootState) => mov.MovieReducer);
    const dispatch: AppDispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('vid');
    const getMovie = useApi();





    // Handle form submission
    const onSubmit = async (data: MovieInput) => {
        await updateMovie.sendRequest({
            method: 'PUT',
            url: `movie/${id}`,
            data: {
                name: data.name.trim(),
                caption: data.caption.trim(),
                description: data.description.trim(),
                categories: selectedCategory
            }
        }).then(() => {
            navigate(0);
        })
        // console.log({ ...data, selectedCategory })
    };


    const loadCategory = async () => {

        const cate_res = await getCategory.sendRequest({
            method: 'GET',
            url: 'category'
        });

        if (cate_res) {
            const res = cate_res.result as ICategory[];
            if (res.length > 0) {
                dispatch(setCategories(res));
            }
        }

        setNewCategory(false);
    }

    const loadMovieDetail = async () => {
        const res = await getMovie.sendRequest({
            method: 'GET',
            url: `movie/${id}`
        });
        const m = res?.result as IMovie;
        if (JSON.stringify(currentMovie) !== JSON.stringify(m)) {
            setCurrentMovie(m);
            document.title = `mgzaw - ${m.name}`;
            reset({ name: m.name, caption: m.caption, description: m.description });
            setCategory(m.categories)
        }
    }

    useEffect(() => {

        (async () => {
            (async () => {
                await loadMovieDetail();
                if (categoryDetails.categories === null) {
                    await loadCategory();
                }
            })();
        })()
    }, [])

    return (
        <div className='h-[calc(100%-3.5rem)] flex flex-1 justify-center'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col gap-6 items-center p-5 w-full sm:w-2/3 md:w-2/3 lg:w-1/3'>
                <div>
                    <div className="cursor-pointer w-full">
                        <input name="video"
                            accept="video/*"
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }} />
                        <div>{<img
                            className="h-[150px] w-full object-contain border-2 border-[#00f] border-solid"
                            src={currentMovie?.thumbnail_url}
                        />
                        }
                        </div>
                    </div>
                </div>


                <div className='w-full'>
                    <input
                        className='rounded p-2 shadow-md border focus:border-[#00f] w-full'
                        id="name"
                        placeholder='Title'
                        defaultValue={currentMovie?.name}
                        {...register('name', { required: true })}
                    />
                    {errors.name && <span className='text-[#f00]'>This field is required</span>}
                </div>

                <div className='w-full'>
                    <input
                        className='rounded p-2 shadow-md border focus:border-[#00f] w-full'
                        id="caption"
                        defaultValue={currentMovie?.caption}
                        placeholder='Caption'
                        {...register('caption', { required: false })}
                    />
                    {errors.caption && <span className='text-[#f00]'>This field is required</span>}
                </div>

                <div className='flex w-full gap-2'>

                    {categoryDetails.categories && <ReactSelect
                        className='w-full'
                        isMulti
                        defaultValue={currentMovie?.categories}
                        options={categoryDetails.categories}
                        onChange={(selectedOptions) => setCategory(selectedOptions as ICategory[])}
                        getOptionLabel={(option: ICategory) => option.name}
                        getOptionValue={(option: ICategory) => option.id}
                    />}

                    <ModalBox children={<MovieCategory
                        apiRefresh={loadCategory}
                    />}
                        isOpen={addCategory}
                        onClose={() => { setNewCategory(!addCategory) }}
                    />

                    <button className='p-2 w-20 bg-primary rounded-md text-white'
                        type='button'
                        onClick={() => { setNewCategory(!addCategory) }}>
                        ADD
                    </button>
                </div>

                <div className='w-full' >
                    <textarea
                        defaultValue={currentMovie?.description}
                        className='peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50'
                        id="description"
                        placeholder='Description'
                        {...register('description', { required: false })}
                    />
                    {errors.description && <span>This field is required</span>}
                </div>

                <button
                    className='text-white p-3 bg-primary rounded-md w-full'
                >Edit</button>
            </form>
        </div>
    );
};

export default EditMovie;

