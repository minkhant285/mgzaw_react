import React, { useContext, useState } from 'react'
import StyledButton from '../../components/button'
import useApi from '../../hooks/useApi';
import { AppContext } from '../../providers/app.provider';
import { LoginResult } from '../../models';
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    emph: string,
    pass: string,
};


function Login() {

    const { token, saveToken, logout: removeToken } = useContext(AppContext);
    const login = useApi();

    const { register, handleSubmit, watch, getValues, formState: { errors, isValid, }, getFieldState } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (token) {
            removeToken();
            console.log("Logout")

        } else {
            const result = await login.sendRequest({
                url: `auth/login`,
                method: 'POST',
                data: {
                    'phemail': data.emph,
                    'password': data.pass
                }
            }) as LoginResult;

            if (result.status_code !== 400 && result.data.token) {
                saveToken(result.data.token)
            }
        }

    }

    return (
        <React.Fragment>



            <React.Fragment>
                <div className='flex flex-1 bg-tertiary p-16 px-44'>

                    <div className='bg-white flex-1 p-5'>
                    </div>
                    <div className='w-1/3 bg-secondary flex justify-center items-center'>

                        <div className="bg-primary gap-8 w-fit h-fit p-5 rounded-lg flex flex-col justify-around items-center ">



                            <div style={{ backgroundColor: 'yellowgreen', fontSize: '0.8em', maxWidth: 400, overflow: 'auto' }}>
                                {login.error && login.error
                                    // :JSON.stringify(login.data, null, 2)
                                }
                            </div>


                            <h3 className="text-2xl font-bold underline dark:text-white">
                                React Base Login Here
                            </h3>
                            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center'>
                                <input {...register("emph", { required: true })} placeholder="Email or Phone" className="bg-gray-400 m-3 p-2 rounded-sm" />
                                {errors.emph && <span className='text-[#af3939]'>This field is required</span>}
                                <input {...register("pass", { required: true })} type="text" placeholder="Password" className="bg-gray-400 m-3 p-2 rounded-sm" />
                                {errors.pass && <span className='text-[#af3939]'>This field is required</span>}
                                {/* <input {...register("exampleRequired", { required: true })} type="text" value={emph} onChange={(e) => setEMPH(e.target.value)} placeholder="Email or Phone" className="bg-gray-400 m-3 p-2 rounded-sm" />
                                <input {...register("example")} type="text" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Password" className="bg-gray-400 m-3 p-2 rounded-sm" /> */}

                                <br />
                                <button className='bg-secondary p-2 rounded-md text-white'
                                    type='submit'
                                >{token ? 'Logout' : 'Login'}</button>

                            </form>

                            <span>Don't Have an Account? Sign Up Here</span>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        </React.Fragment>
    )
}

export default Login
