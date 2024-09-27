import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Pagination: React.FC<{ totalPage: number[]; limit: number, }> = ({ totalPage, limit }) => {

    const param = useParams() as { pg_number: string; c_name: string };
    const navigate = useNavigate();
    const [pagIndex, setPagIndex] = useState<number>(Math.ceil(Number.parseInt(param.pg_number) / limit));
    const location = useLocation();

    const paginateArray = (arr: number[], pageNumber: number, limit: number): number[] => {
        const startIndex = (pageNumber - 1) * limit; // Calculate the starting index
        const endIndex = startIndex + limit; // Calculate the ending index
        return arr.slice(startIndex, endIndex); // Return the chunk of the array for the given page
    };

    useEffect(() => {
        setPagIndex(Math.ceil(Number.parseInt(param.pg_number) / limit));
    }, [location.key])

    return (
        <div>
            {pagIndex > 1 && <button className='p-2 px-3 bg-tertiary rounded-md text-white' onClick={() => setPagIndex(pagIndex - 1)}>Previous</button>}
            {paginateArray(totalPage, pagIndex, limit).map((r, i) => <button
                onClick={() => param.c_name ? navigate(`/video/category/${param.c_name}/page/${r}`) : navigate(`/video/page/${r}`)}
                className={`px-2 p-1 rounded-md ${Number.parseInt(param.pg_number) === r ? 'bg-secondary' : 'bg-background'}  text-white m-1`}
                key={i}>{r}</button>)}
            {pagIndex < (totalPage.length / limit) && <button className='p-2 bg-tertiary rounded-md text-white' onClick={() => setPagIndex(pagIndex + 1)}>Next</button>}
        </div>
    )
}

export default Pagination
