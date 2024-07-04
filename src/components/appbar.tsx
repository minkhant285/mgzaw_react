import { useContext } from "react"
import { AppContext } from "../providers/app.provider"
import { useNavigate } from "react-router-dom";

function AppBar() {

    const { token, userInfo } = useContext(AppContext);
    const navigation = useNavigate();

    return (
        <div className='bg-primary h-14 p-7 flex justify-between items-center'>
            <h3 className=" text-white  font-bold text-2xl">
                Base React App
            </h3>
            {token && userInfo && <div className="flex items-center cursor-pointer" onClick={() => navigation('/profile')}>
                <span className="text-white text-1sm">
                    {userInfo?.username}
                </span>
                <div>
                    <img
                        src="https://img.freepik.com/premium-vector/cartoon-style-emoji-character-girl-profile-photo-icon-women-portraits-user-photo_750364-52.jpg"
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
