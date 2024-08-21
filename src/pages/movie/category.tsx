import useApi from '../../hooks/useApi';
import { useState } from 'react';
import { STATUS_MESSAGE } from '../../models';

type MovieCategoryInput = {
    name: string;
    description: string;
}

const MovieCategory: React.FC<{ apiRefresh: Function }> = ({ apiRefresh }) => {



    const createCategory = useApi();
    const [Ctitle, SetCTitle] = useState<string>();
    const [CDes, SetCDes] = useState<string>();

    const onSubmit = async () => {
        const res = await createCategory.sendRequest({
            method: 'POST',
            url: 'category',
            data: {
                name: Ctitle,
                description: CDes || ''
            }
        });
        if (res?.status_message === STATUS_MESSAGE.SUCCESS) {
            await apiRefresh();
        }

    };


    return (
        <div>
            <div className='flex flex-col gap-6 items-center p-5 w-full sm:w-2/3 md:w-2/3 lg:w-1/3'>
                <div>
                    <div className='w-full'>
                        <input
                            className='rounded p-2 shadow-md border focus:border-[#00f] w-full'
                            id="name"
                            placeholder='Title'
                            onChange={(e) => SetCTitle(e.target.value)}
                        />
                    </div>

                    <div className='w-full'>
                        <input
                            className='rounded p-2 shadow-md border focus:border-[#00f] w-full'
                            id="caption"
                            placeholder='Caption'
                            onChange={(e) => SetCDes(e.target.value)}
                        />
                    </div>
                </div>
                <button className='text-white p-3 bg-primary rounded-md w-full' onClick={onSubmit}>Save</button>
            </div>
        </div>
    )
}

export default MovieCategory
