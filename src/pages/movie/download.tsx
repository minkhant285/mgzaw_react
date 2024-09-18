import React, { useState } from 'react'
import { MdDownload } from 'react-icons/md'
import AdComponent from '../../components/radcomponent';
import useApi from '../../hooks/useApi';
import { useSearchParams } from 'react-router-dom';
import { IMovie } from '../../models';

function DownloadPage() {

    const [counter, setCounter] = React.useState(7);
    const [start, setStart] = React.useState(false);
    const download = useApi();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('vid');
    const getMovie = useApi();
    const [currentMovie, setCurrentMovie] = useState<IMovie>();


    const loadMovieDetail = async () => {
        const res = await getMovie.sendRequest({
            method: 'GET',
            url: `movie/${id}`
        });
        const m = res?.result as IMovie;
        if (JSON.stringify(currentMovie) !== JSON.stringify(m)) {
            setCurrentMovie(m);
            document.title = `mgzaw - ${m.name}`;
        }
    }
    React.useEffect(() => {

        (async () => {
            if (!currentMovie) {
                await loadMovieDetail();
            }
        })()

        if (start && counter > 0) {
            setTimeout(() => setCounter(counter - 1), 1000)
        } else {
            downloadFile();
        }
    }, [counter, start]);

    const downloadFile = async () => {
        try {
            // Call your backend to get the pre-signed URL
            const filename = currentMovie?.url.split('/') as string[];
            const res = await download.sendRequest({
                url: `movie/download/${filename[filename.length - 1]}`,
                method: 'GET'
            })

            // Create a temporary link element to download the file
            const link = document.createElement("a");
            link.href = res?.result as string;
            link.setAttribute("download", currentMovie?.name as string); // Optional: Specify download file name
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Error downloading file:", error);
        } finally {
        }
    };

    return (
        <div className='grid grid-cols-7 h-[calc(100%-8.5rem)]'>
            <div className='col-span-2'>
                <AdComponent />
            </div>
            <div className='col-span-3'>

                <button disabled={start} onClick={() => setStart(true)} className='flex justify-center items-center p-1 pl-3 text-white text-xs  bg-secondary rounded-md'>
                    {
                        start ? `Starting Download in (${counter} s)` : <>Download <MdDownload
                            className="text-white  shadow-lg mx-1 "
                            size={20} /></>
                    }
                </button>
            </div>
            <div className='col-span-2'>
                <AdComponent />
            </div>
        </div>
    )
}

export default DownloadPage
