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
            counter === 0 && downloadFile();
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
        <div className='grid grid-cols-7 h-fit min-h-[calc(100vh-137px)] '>
            <div className='col-span-2  hidden md:block'>
                <AdComponent />
            </div>

            <div className='col-span-12 md:col-span-3 p-4 flex flex-col items-center gap-2'>

                <div className='h-[80px] w-full md:hidden'>
                    <AdComponent />
                </div>

                <h2 className='text-white text-2xl'>IPhone16 2024 News</h2>
                <p className='text-white text-justify indent-5 text-sm'>

                    The iPhone 16, though still in the realm of speculation and future product expectations,
                    is anticipated to follow Apple’s trend of innovation in the smartphone industry.
                    As Apple typically releases its iPhone models with incremental upgrades in design, technology, and user experience,
                    the iPhone 16 may include several exciting features based on industry predictions and trends.

                    The iPhone 16 could see further refinements in terms of thinner bezels,
                    more durable materials, or new color finishes.
                    There’s also speculation that Apple may experiment with a completely portless design,
                    relying on wireless charging and data transfer methods.

                </p>

                <button disabled={start} onClick={() => setStart(true)} className='my-3 flex w-fit self-center justify-center items-center p-3 pl-3 text-white text-xs  bg-secondary rounded-md'>
                    {
                        start ? `Starting Download in (${counter} s)` : <>Download Here <MdDownload
                            className="text-white  shadow-lg mx-1 "
                            size={20} /></>
                    }
                </button>

                <p className='text-white text-justify indent-5 text-sm'>
                    {`
                    The iPhone 16 is anticipated to feature design refinements with thinner bezels and possibly a portless design,
                     alongside display improvements like higher refresh rates and better brightness.
                     Camera upgrades may include enhanced low-light performance and AI-driven photography,
                      while a new A-series chip will boost performance and battery efficiency.
                      It may introduce faster wireless charging, better AR capabilities, and advanced 5G or even 6G connectivity.
                       Sustainability efforts could lead to more eco-friendly materials, and biometric enhancements like under-display Touch ID might return.
                    Expected to release in September, pricing is likely to align with previous models.
                    `}

                </p>

                <div className=' h-[200px] w-full md:hidden'>
                    <AdComponent />
                </div>

            </div>

            <div className='col-span-2 hidden md:block'>
                <AdComponent />
            </div>
        </div>
    )
}

export default DownloadPage
