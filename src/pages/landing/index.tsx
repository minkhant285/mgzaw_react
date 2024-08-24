import MovieFeed from '../movie/feed';

function Landing() {
    return (
        <div>
            {/* <h1>Landing Page!</h1>
            {!token && <Link to="/login">Login</Link>} */}
            <MovieFeed />
        </div>
    )
}

export default Landing
