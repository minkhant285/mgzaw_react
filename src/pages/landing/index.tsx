import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../providers/app.provider'
import MovieFeed from '../movie/feed';

function Landing() {

    const { token } = useContext(AppContext);
    return (
        <div>
            {/* <h1>Landing Page!</h1>
            {!token && <Link to="/login">Login</Link>} */}
            <MovieFeed />
        </div>
    )
}

export default Landing
