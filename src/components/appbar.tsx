import { useContext } from "react"
import { AppContext } from "../providers/app.provider"
import { useLocation, useNavigate } from "react-router-dom";
import { envLoader } from "../utils";
import SearchBox from "./searchbox";
import { ImSearch } from "react-icons/im";
import ModalBox from './modal';
import LOGO from '../assets/MZ.png';
import { IoFilterSharp } from "react-icons/io5";
import CategoryList from "../pages/movie/categoryList";
import { FaHome } from "react-icons/fa";


function AppBar() {

    const { token, userInfo, categoryModal, modalControl, searchModal, searchModalControl } = useContext(AppContext);
    const navigation = useNavigate();
    const location = useLocation();

    return (
        <nav className='bg-primary h-14 p-2 md:p-7 flex justify-between items-center top-0 fixed w-full z-10'>
            <div className="flex-1 flex gap-2 items-center">
                <img
                    src={LOGO}
                    style={{ objectFit: 'contain', borderRadius: 50, marginLeft: 10 }}
                    width={40}
                    height={40}
                    alt="logo" />
                <h3 className="text-white  font-bold text-lg cursor-pointer" onClick={() => navigation('/')}>
                    MG ZAW
                </h3>
            </div>

            <div className=" flex-1 flex justify-end items-center gap-2">
                <div className="hidden md:block w-1/2">
                    <SearchBox />
                </div>

                <div className="md:hidden cursor-pointer hover:bg-secondary p-2 rounded-md" onClick={() => searchModalControl(true)}>
                    <ImSearch size={20} color="white" />
                </div>



                {location.pathname.includes('video/category') && <div className="lg:hidden cursor-pointer  p-2 rounded-md" onClick={() => modalControl(true)}>
                    <IoFilterSharp size={20} color="white" />
                </div>}
                {location.pathname === '/' && <div className="lg:hidden cursor-pointer  p-2 rounded-md" onClick={() => modalControl(true)}>
                    <IoFilterSharp size={20} color="white" />
                </div>}

                {location.pathname.includes('movie') && <div className=" cursor-pointer  p-2 rounded-md" onClick={() => navigation('/')}>
                    <FaHome size={25} color="white" />
                </div>}


                <ModalBox children={<SearchBox />} isOpen={searchModal} onClose={() => { searchModalControl(!searchModal) }} />
                <ModalBox children={
                    <div className="p-4"><CategoryList /></div>}
                    isOpen={categoryModal}
                    onClose={() => { modalControl(!categoryModal) }}
                />


                {token && userInfo && <div className="flex items-center cursor-pointer" onClick={() => navigation('/profile')}>
                    <span className="text-white text-xs hidden md:block">
                        {userInfo?.username}
                    </span>
                    <div>
                        <img
                            src={`${envLoader.host}/image/${userInfo?.photoUrl}`}
                            style={{ objectFit: 'contain', borderRadius: 50, marginLeft: 10 }}
                            width={30}
                            height={30}
                            alt={userInfo.username} />
                    </div>
                </div>}
            </div>
        </nav>
    )
}

export default AppBar
