import React from 'react'
import ReactPlayer from 'react-player'
import useApi from '../../hooks/useApi';
import { useSearchParams } from 'react-router-dom';

function Movie() {

    const getMovie = useApi();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('vid');

    React.useEffect(() => {
        (async () => {
            await getMovie.sendRequest({
                method: 'GET',
                url: `movie/${id}`
            });

        })()
    }, [])

    return (
        <div>
            {getMovie.data && <ReactPlayer
                autoPlay={false} width={300} height={150}
                poster={getMovie.data.thumbnail_url}
                style={{ objectFit: 'contain' }}
                url={getMovie.data.url}
                controls
            />}
        </div>
    )
}

export default Movie
