import { useContext } from "react"
import { AppContext } from "../providers/app.provider"
import { useNavigate } from "react-router-dom";
import { envLoader } from "../utils";

function AppBar() {

    const { token, userInfo } = useContext(AppContext);
    const navigation = useNavigate();

    return (
        <div className='bg-primary h-14 p-7 flex justify-between items-center top-0 sticky'>
            <h3 className="text-white  font-bold text-lg cursor-pointer" onClick={() => navigation('/')}>
                Base React App
            </h3>
            {token && userInfo && <div className="flex items-center cursor-pointer" onClick={() => navigation('/profile')}>
                <span className="text-white text-xs hidden md:block">
                    {userInfo?.username}
                </span>
                <div>
                    <img
                        src={`http://${envLoader.host}:${envLoader.port}/image/${userInfo?.photoUrl}`}
                        style={{ objectFit: 'contain', borderRadius: 50, marginLeft: 10 }}
                        width={30}
                        height={30}
                        alt={userInfo.username} />
                </div>
            </div>}
        </div>
    )
}

export default AppBar
