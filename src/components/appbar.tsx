import { useContext } from "react"
import { AppContext } from "../providers/app.provider"
import { useNavigate } from "react-router-dom";
import { envLoader } from "../utils";
import SearchBox from "./searchbox";
import { ImSearch } from "react-icons/im";
import ModalBox from './modal';
import LOGO from '../assets/MZ.png';
import { FaFilter } from "react-icons/fa";
import CategoryList from "../pages/movie/categoryList";


function AppBar() {

    const { token, userInfo, categoryModal, modalControl, searchModal, searchModalControl } = useContext(AppContext);
    const navigation = useNavigate();

    return (
        <nav className='bg-primary h-14 p-2 md:p-7 flex justify-between items-center top-0 sticky z-10'>
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

                <div className="md:hidden cursor-pointer hover:bg-secondary p-2 rounded-md" onClick={() => modalControl(true)}>
                    <FaFilter size={20} color="white" />
                </div>

                <ModalBox children={<SearchBox />} isOpen={searchModal} onClose={() => { searchModalControl(!searchModal) }} />
                <ModalBox children={<div className="p-4"><CategoryList /></div>} isOpen={categoryModal} onClose={() => { modalControl(!categoryModal) }} />


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
        </nav>
    )
}

export default AppBar
