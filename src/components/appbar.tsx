import { useContext, useEffect } from "react"
import { AppContext } from "../providers/app.provider"

function AppBar() {

    const { token, userInfo } = useContext(AppContext);

    return (
        <div className='bg-primary text-white h-14 p-7 flex justify-start items-center font-bold text-2xl'>
            Base React App

            {token && <div className="text-1sm">
                {userInfo?.username}
            </div>}
        </div>
    )
}

export default AppBar
