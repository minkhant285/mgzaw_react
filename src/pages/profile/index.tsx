import { useContext } from 'react'
import { AppContext } from '../../providers/app.provider'

function Profile() {

    const { logout, userInfo } = useContext(AppContext);
    // console.log(userInfo)

    return (
        <div className='p-3'>
            <div className="max-w-sm mx-auto bg-primary shadow-md rounded-lg overflow-hidden flex flex-col text-white p-3" >
                <div className="flex items-center px-6 py-3 bg-gray-900 self-center">
                    <img
                        className="h-24 w-24 rounded-full object-contain"
                        src={userInfo?.photoUrl}
                        alt={`${userInfo?.username}'s profile`}
                    />
                </div>
                <div className="py-4 px-6">
                    <div className="py-2">
                        <h2 className="text-lg text-gray-700 font-semibold">Username</h2>
                        <p className="text-gray-600">{userInfo?.username}</p>
                    </div>
                    <div className="py-2">
                        <h2 className="text-lg text-gray-700 font-semibold">Phone</h2>
                        <p className="text-gray-600">{userInfo?.phone}</p>
                    </div>
                    <div className="py-2">
                        <h2 className="text-lg text-gray-700 font-semibold">Email</h2>
                        <p className="text-gray-600">{userInfo?.email}</p>
                    </div>
                    <div className="py-2">
                        <h2 className="text-lg text-gray-700 font-semibold">Gender</h2>
                        <p className="text-gray-600">{userInfo?.gender}</p>
                    </div>
                    {
                        userInfo?.dob !== null && <div className="py-2">
                            <h2 className="text-lg text-gray-700 font-semibold">Date of Birth</h2>
                            <p className="text-gray-600">{userInfo?.dob && new Date(userInfo.dob).toLocaleDateString()}</p>
                        </div>
                    }
                </div>
            </div>
            <div className='max-w-sm mx-auto bg-primary shadow-md rounded-lg overflow-hidden flex justify-center text-white p-3 mt-5'
                onClick={logout}>
                Log Out
            </div>
        </div>
    )
}

export default Profile
