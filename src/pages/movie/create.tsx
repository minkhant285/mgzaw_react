import { useForm } from 'react-hook-form';
import useApi from '../../hooks/useApi';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { IMovie } from '../../models';
import { io } from 'socket.io-client';
import { envLoader } from '../../utils';
import axios, { AxiosProgressEvent } from 'axios';
import ReactSelect from 'react-select';

type MovieInput = {
    name: string
    caption: string,
    description: string
}

const CreateMovie = () => {
    // Initialize React Hook Form
    const { register, handleSubmit, formState: { errors } } = useForm<MovieInput>({
        defaultValues: {
            name: "",
            caption: "",
            description: ""
        }
    });

    const socket = io(`http://${envLoader.host}:50002`);

    const createMovie = useApi();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const getCategory = useApi();
    const [progress, setProgress] = useState<number>(0);
    const [selectedCategory, setCategory] = useState<IMovie[]>();

    // Handle form submission
    const onSubmit = async (data: MovieInput) => {
        await handleFileUpload(data);
    };

    const handleFileUpload = async (vidInput: MovieInput) => {
        if (selectedFile) {

            if (selectedFile.type.startsWith('video/')) {
                const fileData = new FormData();
                fileData.append('file', selectedFile);

                try {

                    const response = await axios.post(`${envLoader.baseURL}/movie/upload`, fileData, {
                        headers: {
                            'x-socket-id': socket.id,
                            'Content-Type': 'multipart/form-data',
                        },
                        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                            if (progressEvent.total) {
                                const percentComplete = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                                setProgress(percentComplete);
                            }
                        },
                    });

                    console.log({ ...vidInput, url: response.data.result.fileUrl, thumbnail_url: response.data.result.thumbnail_url })
                    await createMovie.sendRequest({
                        method: 'POST',
                        url: "movie",
                        data: { ...vidInput, url: response.data.result.fileUrl, thumbnail_url: response.data.result.thumbnail_url, categories: selectedCategory }
                    })
                    setProgress(100);
                    return response.data


                } catch (error) {
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

    useEffect(() => {
        (async () => {
            await getCategory.sendRequest({
                method: 'GET',
                url: 'category'
            })
        })()

        socket.on('uploadProgress', (data: { progress: number }) => {
            setProgress(data.progress);
        });


        return () => {
            socket.off('uploadProgress', (data: { progress: number }) => {
                setProgress(data.progress);
            });
        };

    }, [])

    return (
        <div className='h-[calc(100%-3.5rem)] flex flex-1 justify-center'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 items-center p-5 w-full sm:w-2/3 md:w-2/3 lg:w-1/3'>
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
                            // src={`http://${envLoader.host}:${envLoader.port}/image/${userInfo?.photoUrl}`}
                            />}
                        </div>
                    </div>
                    {
                        `progress ${progress}%`
                    }
                </div>
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
                        id="caption"
                        placeholder='Caption'
                        {...register('caption', { required: true })}
                    />
                    {errors.caption && <span className='text-[#f00]'>This field is required</span>}
                </div>

                <div className='flex w-full gap-2'>

                    {getCategory.data && <ReactSelect
                        className='w-full'
                        isMulti
                        options={getCategory.data}
                        onChange={(selectedOptions) => setCategory(selectedOptions as IMovie[])}
                        getOptionLabel={(option: IMovie) => option.name}
                        getOptionValue={(option: IMovie) => option.id}
                    />}

                    <button className='p-2 w-20 bg-primary rounded-md text-white'>
                        ADD
                    </button>
                </div>

                <div className='w-full' >
                    <textarea
                        className='peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50'
                        id="description"
                        placeholder='Description'
                        {...register('description', { required: true })}
                    />
                    {errors.description && <span>This field is required</span>}
                </div>

                {/* <div>
                    <input
                        className='rounded p-1 shadow-md border focus:border-[#00f]'
                        id="url"
                        type="url"
                        {...register('url', { required: false })}
                    />
                </div> */}

                <button className='text-white p-3 bg-primary rounded-md w-full' type="submit" >Upload</button>
                {/* <button className='text-white p-3 bg-primary rounded-md w-full' onClick={handleFileUpload} >Upload video</button> */}
            </form>
        </div>
    );
};

export default CreateMovie;
