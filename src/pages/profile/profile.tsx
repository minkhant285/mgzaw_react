import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../providers/app.provider'
import useApi from '../../hooks/useApi';
import { UserInfoResult } from '../../models';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { envLoader } from '../../utils';
import { useNavigate } from 'react-router-dom';

function Profile() {

    const user = useApi('getUser');
    const userUpdate = useApi('updateUser');
    const updateProfile = useApi('updatePhoto');
    const twoAuthApi = useApi('TwoAuth');
    const navigation = useNavigate();


    const { logout, userInfo, saveUserInfo } = useContext(AppContext);
    const [dob, setDob] = useState(userInfo?.dob);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [tAuth, setTAuth] = useState<boolean | undefined>(userInfo?.twoWayAuth);
    const [formData, setFormData] = useState({
        dob: userInfo?.dob,
        gender: userInfo?.gender || '',
        username: userInfo?.username,
        photoUrl: userInfo?.photoUrl,
    });
    const [editable, setEditable] = useState(false);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const updateUserInfo = async () => {
        const updated = await userUpdate.sendRequest({
            url: 'user',
            method: 'PUT',
            data: { ...formData, dob }
        }) as UserInfoResult;
        selectedFile !== null && handleFileUpload();
        if (updated.status_code === 200) {
            await loadUser();
            alert(updated.message);
            setEditable(false);
        }
    }

    const loadUser = async () => {
        let r = await user.sendRequest({
            url: `user`,
            method: 'GET',
        }) as UserInfoResult;
        saveUserInfo(r.result);
    }

    const handleDivClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
        }
    };

    const handleFileUpload = async () => {
        console.log(selectedFile)
        if (selectedFile) {

            if (selectedFile.type.startsWith('image/')) {
                const fileData = new FormData();
                fileData.append('file', selectedFile);
                updateProfile.sendRequest({
                    url: 'user/photo',
                    method: 'PUT',
                    contentType: 'multipart/form-data',
                    data: fileData
                }).then((r) => {
                    if (r?.status_code === 200) {
                        setSelectedFile(null)
                    }
                })
            } else {
                alert('Please select a valid image file (jpg, jpeg, png, gif).');
            }
        } else {
            console.warn('No file selected for upload.');
        }
    };

    const handleTwoAuth = () => {

        twoAuthApi.sendRequest({
            method: 'PUT',
            url: 'auth/twowayAuth',
            data: {
                enable: !tAuth
            }
        }).then((r) => { alert(r?.message); setTAuth(!tAuth); loadUser(); })

    }



    useEffect(() => {
        (async () => {
            // console.log("called")
            await loadUser();

        })()
    }, [])

    return (
        <div className='p-3 overflow-auto'>
            <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden flex flex-col  p-3" >
                <div className="flex items-center px-6 py-3 bg-gray-900 self-center">

                    <div className="cursor-pointer" onClick={handleDivClick}>
                        <input name="photo" accept="image/*" type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
                        <div>{selectedFile ? <img
                            className="h-24 w-24 object-contain border-2 border-primary border-solid"
                            src={URL.createObjectURL(selectedFile)} />
                            : <img alt="photo"
                                className="h-24 w-24 object-contain border-2 border-primary border-solid"
                                src={`http://${envLoader.host}:${envLoader.port}/image/${userInfo?.photoUrl}`}
                            />}
                        </div>
                    </div>

                    {/* <img
                        className="h-24 w-24 rounded-full object-contain border-2 border-primary border-solid"
                        src={userInfo?.photoUrl}
                        alt={`${userInfo?.username}'s profile`}
                    /> */}
                </div>
                <div className="py-4 px-6 divide-y-[0.5px]">
                    <div className="py-2">
                        <h2 className="text-lg text-gray-700 font-semibold">Username</h2>
                        <input name="username" onChange={handleChange} style={{ backgroundColor: editable ? 'gray' : 'inherit' }} disabled={!editable} className="text-gray-600 text-sm w-full" value={formData.username} />
                    </div>
                    <div className="py-2">
                        <h2 className="text-lg text-gray-700 font-semibold">Gender</h2>
                        <input name="gender" onChange={handleChange} style={{ backgroundColor: editable ? 'gray' : 'inherit' }} disabled={!editable} className="text-gray-600 text-sm w-full" value={formData.gender} />
                    </div>
                    <div className="py-2">
                        <h2 className="text-lg text-gray-700 font-semibold">Date of Birth</h2>
                        <DatePicker
                            maxDate={new Date()}
                            showYearDropdown
                            yearDropdownItemNumber={100}
                            selected={dob}
                            onChange={(date) => setDob(date)}
                        />

                    </div>
                    <div className="py-2" onClick={() => navigation(`/changephone?old=${userInfo?.phone}`)}>
                        <h2 className="text-lg text-gray-700 font-semibold">Phone</h2>
                        <p className="text-gray-600 text-sm w-full">{userInfo?.phone}</p>
                    </div>
                    <div className="py-2" onClick={() => navigation(`/changeemail?old=${userInfo?.email}`)}>
                        <h2 className="text-lg text-gray-700 font-semibold">Email</h2>
                        <p className="text-gray-600 text-sm w-full">{userInfo?.email}</p>
                    </div>

                    <div className="py-2 cursor-pointer hover:filter" onClick={() => navigation('/changepass')}>
                        <h2 className="text-lg text-gray-700 font-semibold">Change Password</h2>
                        <p className="text-gray-600 text-sm w-full">******</p>
                    </div>
                    <div className="py-2 cursor-pointer hover:filter">
                        <h2 className="text-lg text-gray-700 font-semibold">Enable Two Way Login</h2>
                        <label htmlFor="switch">
                            <input type="checkbox" id='switch' checked={tAuth} onChange={handleTwoAuth} />
                        </label>
                    </div>

                    <div className="py-2 cursor-pointer hover:filter">
                        <h2 className="text-lg text-gray-700 font-semibold">Add Movie</h2>
                        <span onClick={() => navigation('/movie/create')}> ADD Here </span>
                    </div>

                </div>
            </div>
            <div className='max-w-sm mx-auto bg-primary shadow-md rounded-lg overflow-hidden flex justify-center text-white p-3 mt-5'
                onClick={async () => await updateUserInfo()}>
                Update
            </div>
            <div className='max-w-sm mx-auto bg-primary shadow-md rounded-lg overflow-hidden flex justify-center text-white p-3 mt-5'
                onClick={() => setEditable(!editable)}>
                Edit
            </div>
            <div className='max-w-sm mx-auto bg-primary shadow-md rounded-lg overflow-hidden flex justify-center text-white p-3 mt-5'
                onClick={logout}>
                Log Out
            </div>
        </div>
    )
}

export default Profile
