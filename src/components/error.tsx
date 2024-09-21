import { useContext } from "react";
import { AppContext } from "../providers/app.provider";

const GlobalError = () => {

    const { appErrorMessage } = useContext(AppContext);


    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg">
                <div className="flex items-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    {/* <img src={LoadingIcon} width={200} height={200} /> */}
                    <span>Error {appErrorMessage}</span>
                </div>
            </div>
        </div>
    )
}

export default GlobalError
