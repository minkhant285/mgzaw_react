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


            <div className='col-span-12 md:col-span-3 p-4 flex flex-col items-center gap-2 text-white'>

                <header className="hero-section text-center mb-5">
                    <h1 className="text-2xl font-bold">Download Your Favorite Adult Videos</h1>
                    <p className="text-xl mt-2">Enjoy Anytime, Anywhere!</p>
                    <p className="mt-2">
                        With mgzaw.com, you can download high-quality adult videos directly to your device for offline viewing. Experience freedom and flexibility in your entertainment choices!
                    </p>
                </header>

                <section className="how-to-download-section ">
                    <h2 className="text-2xl font-bold mb-2">How to Download Videos</h2>
                    <ol className="list-decimal list-inside my-2">
                        <li><strong>Browse:</strong> Explore our extensive library of adult content.</li>
                        <li><strong>Select:</strong> Choose the video you want to download.</li>
                        <li><strong>Download:</strong> Click the download button and choose your preferred video quality.</li>
                        <li><strong>Enjoy:</strong> Watch your downloaded video anytime, even without an internet connection!</li>
                    </ol>
                </section>

                <section className="call-to-action-section my-2 text-center">
                    <h2 className="text-2xl font-bold mb-4">Start Downloading Today!</h2>
                    <p className="mb-4">
                        Join MGZAW.com and take advantage of our easy video download feature.
                    </p>
                    <div className='w-full  flex justify-center'>
                        <button disabled={start} onClick={() => setStart(true)} className='my-3 flex w-fit self-center justify-center items-center p-3 pl-3 text-white text-xs  bg-secondary rounded-md'>
                            {
                                start ? `Starting Download in (${counter} s)` : <>Download "{currentMovie?.name}.mp4" Here  <MdDownload
                                    className="text-white  shadow-lg mx-1 "
                                    size={20} /></>
                            }
                        </button>
                    </div>
                </section>

                {/* <div className=' h-[200px] w-full md:hidden'>
                    <AdComponent />
                </div> */}

                <section className="safety-section my-5">
                    <h2 className="text-2xl font-bold mb-4">Safety and Privacy</h2>
                    <p>
                        Your privacy is our priority. We use secure protocols to ensure your data is protected during downloads. Enjoy your content worry-free, knowing that we respect your privacy and security.
                    </p>
                </section>
            </div>

            <div className='col-span-2 hidden md:block'>
                <AdComponent />
            </div>
        </div>
    )
}

export default DownloadPage
