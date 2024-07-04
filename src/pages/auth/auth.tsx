import React from 'react'

import { useLocation } from 'react-router-dom';
import Login from './login';
import Register from './register';
import ForgotPass from './forgotpass';




function Auth() {

    const { pathname } = useLocation();



    return (
        <React.Fragment>
            <div className='flex flex-1 bg-background p-5 py-16 px-48'>

                <div className='bg-secondary flex-1 p-5 '>
                </div>
                <div className='w-1/3 bg-tertiary flex justify-center items-center'>
                    {
                        pathname === '/login' && <Login />
                    }
                    {
                        pathname === '/register' && <Register />
                    }
                    {
                        pathname === '/forgotpass' && <ForgotPass />
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default Auth
