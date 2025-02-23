import { useForm } from 'react-hook-form';
import useApi from '../../hooks/useApi';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { ICategory } from '../../models';
import { envLoader } from '../../utils';
import axios, { AxiosProgressEvent } from 'axios';
import ReactSelect from 'react-select';
import { AppContext } from '../../providers/app.provider';
import { useNavigate } from 'react-router-dom';
import MovieCategory from '../video/category';
import ModalBox from '../../components/modal';
import { AppDispatch, MVProRootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '../../redux/slicers/movie.slice';
import ProgressBar from '../../components/progressbar';

type MovieInput = {
    name: string
    caption: string,
    description: string,
    thumb_time: string
}



const CreateMovie = () => {
    // Initialize React Hook Form
    const { register, handleSubmit, formState: { errors }, watch } = useForm<MovieInput>({
        defaultValues: {
            name: "",
            caption: "",
            description: "",
            thumb_time: "00:00:05"
        }
    });

    // const socket = io(`${envLoader.socketHost}`);

    const createMovie = useApi();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const getCategory = useApi();
    const [progress, setProgress] = useState<number>(0);
    const [selectedCategory, setCategory] = useState<ICategory[]>();
    const { loadingControl, token } = useContext(AppContext);
    const navigate = useNavigate();
    const [addCategory, setNewCategory] = useState<any>();
    const categoryDetails = useSelector((mov: MVProRootState) => mov.MovieReducer);
    const dispatch: AppDispatch = useDispatch();
    const checkMovieNameApi = useApi();




    // Handle form submission
    const onSubmit = async (data: MovieInput) => {
        const checkRes = await checkMovieNameApi.sendRequest({
            method: 'GET',
            url: `movie/check/${data.name.trim()}`
        })
        if (checkRes?.result) {
            await handleFileUpload(data);
        } else {
            alert('Movie Name Already Exist! Try Another Name')
        }
    };



    const handleFileUpload = async (vidInput: MovieInput) => {
        if (selectedFile) {

            if (selectedFile.type.startsWith('video/')) {
                const fileData = new FormData();
                fileData.append('file', selectedFile);
                fileData.append('body', JSON.stringify({ thumbnail_time: watch('thumb_time') }))


                try {
                    loadingControl(true)
                    const response = await axios.post(`${envLoader.baseURL}/movie/upload`, fileData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`,
                        },
                        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                            if (progressEvent.total) {
                                const percentComplete = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                                setProgress(percentComplete);
                                loadingControl(false);
                            }
                        },
                    });

                    // console.log(response.data)

                    await createMovie.sendRequest({
                        method: 'POST',
                        url: "movie",
                        data: {
                            name: vidInput.name.trim(),
                            caption: vidInput.caption.trim(),
                            description: vidInput.description.trim(),
                            thumb_time: vidInput.thumb_time.trim(),
                            url: response.data.result.fileUrl,
                            thumbnail_url: response.data.result.thumbnail_url,
                            categories: selectedCategory,
                            duration: response.data.result.duration.duration
                        }
                    }).then(() => {
                        navigate(0);
                    })
                    setProgress(100);
                    return response.data


                } catch (error) {
                    loadingControl(false);
                    console.error('Error uploading file:', error);
                }

            } else {
                alert('Please select a valid image file (mp4,mkv).');
            }
        } else {
            console.warn('No file selected for upload.');
        }
    };

    const handleDivClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
        }
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

    useEffect(() => {

        (async () => {
            // if (categoryDetails.categories === null) {
            await loadCategory();
            // }
        })()
    }, [])

    return (
        <div className='h-[calc(100%-3.5rem)] flex flex-1 justify-center'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col gap-6 items-center p-5 w-full sm:w-2/3 md:w-2/3 lg:w-1/3'>
                <div>
                    <div className="cursor-pointer w-full" onClick={handleDivClick}>
                        <input name="video"
                            accept="video/*"
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }} />
                        <div>{selectedFile ? <video
                            className="h-[150px] w-full object-contain border-2 border-[#00f] border-solid"
                            src={URL.createObjectURL(selectedFile)} />
                            : <video
                                className="h-[150px] w-full object-contain border-2 border-[#00f] border-solid"

                            />}
                        </div>
                    </div>
                    {selectedFile && <div className='flex flex-col text-white'>
                        <span>Name: {selectedFile.name}</span>
                        <span>Size: {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB</span>
                    </div>}
                </div>

                <ProgressBar value={progress} />

                <div className='w-full'>
                    <input
                        className='rounded p-2 shadow-md border focus:border-[#00f] w-full'
                        id="name"
                        placeholder='Title'
                        {...register('name', { required: true })}
                    />
                    {errors.name && <span className='text-[#f00]'>This field is required</span>}
                </div>

                <div className='w-full'>
                    <input
                        className='rounded p-2 shadow-md border focus:border-[#00f] w-full'
                        id="thumb_time"
                        placeholder='Photo Time'
                        {...register('thumb_time', { required: true })}
                    />
                    {errors.name && <span className='text-[#f00]'>This field is required</span>}
                </div>

                <div className='w-full'>
                    <input
                        className='rounded p-2 shadow-md border focus:border-[#00f] w-full'
                        id="caption"
                        placeholder='Caption'
                        {...register('caption', { required: false })}
                    />
                    {errors.caption && <span className='text-[#f00]'>This field is required</span>}
                </div>

                <div className='flex w-full gap-2'>

                    {categoryDetails.categories && <ReactSelect
                        className='w-full'
                        isMulti
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
                        className='peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50'
                        id="description"
                        placeholder='Description'
                        {...register('description', { required: false })}
                    />
                </div>

                <button
                    className='text-white p-3 bg-primary rounded-md w-full'
                >Upload</button>
            </form>
        </div>
    );
};

export default CreateMovie;

