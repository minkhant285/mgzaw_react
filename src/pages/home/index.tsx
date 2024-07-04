import { useContext } from 'react'
import { AppContext } from '../../providers/app.provider';
import useApi from '../../hooks/useApi';

function Home() {
    const { logout: removeToken } = useContext(AppContext);
    const allusers = useApi('getUser');

    return (
        <div>
            <h1>Home Page</h1>


            <button className='bg-primary p-2 rounded-md text-white'
                onClick={() => allusers.sendRequest({
                    url: `user`,
                    method: 'GET',
                })}
            >Refresh</button>
            <div>{
                allusers.data ? JSON.stringify(allusers.data, null, 2) : allusers.error
            }</div>

            <button className='bg-primary p-2 rounded-sm mt-2' onClick={removeToken}>Logout</button>
        </div>
    )
}

export default Home
