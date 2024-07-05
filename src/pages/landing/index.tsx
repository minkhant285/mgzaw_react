import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../providers/app.provider'

function Landing() {

    const { token } = useContext(AppContext);
    return (
        <div>
            <h1>Landing Page!</h1>
            {!token && <Link to="/login">Login</Link>}
        </div>
    )
}

export default Landing
