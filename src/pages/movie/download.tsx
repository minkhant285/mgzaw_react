import React from 'react'
import { MdDownload } from 'react-icons/md'
import AdComponent from '../../components/radcomponent';

function DownloadPage() {

    const [counter, setCounter] = React.useState(15);
    const [start, setStart] = React.useState(false);
    React.useEffect(() => {

        if (start && counter > 0) {
            setTimeout(() => setCounter(counter - 1), 1000)
        }
    }, [counter, start]);

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
