import React, { useContext, useState } from 'react'
import StyledButton from '../components/button'
import useApi from '../hooks/useApi';
import { ThemeContext } from '../providers/app.provider';
import { LoginResult } from '../models';
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    emph: string,
    pass: string,
};


function Home() {

    const [emph, setEMPH] = useState<string>('phyuthazin.mg@ru.com');
    const [pass, setPass] = useState<string>('bmtk123');

    const { token, saveToken, removeToken } = useContext(ThemeContext);

    const allusers = useApi('getUser');
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
            saveToken(result.data.token)
        }

    }

    // console.log(watch("emph"))

    // useEffect(() => {
    //     // !allusers.data && allusers.sendRequest();
    // }, [allusers.data, token, allusers.error])

    return (
        <React.Fragment>

            <div className='bg-primary text-white h-14 p-7 flex justify-start items-center font-bold text-2xl'>
                Base React App
            </div>

            <React.Fragment>
                <div className='flex flex-1 bg-tertiary p-16 px-44'>
                    <div style={{ backgroundColor: 'red' }} className='bg-white flex-1 p-5'>
                        <button className='bg-primary p-2 rounded-md text-white'
                            onClick={() => allusers.sendRequest({
                                url: `user`,
                                method: 'GET',
                            })}
                        >Refresh</button>
                        <div>{
                            allusers.data ? JSON.stringify(allusers.data, null, 2) : allusers.error
                        }</div>
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
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input {...register("emph", { required: true })} placeholder="Email or Phone" className="bg-gray-400 m-3 p-2 rounded-sm" />
                                <input {...register("pass")} type="text" placeholder="Password" className="bg-gray-400 m-3 p-2 rounded-sm" />
                                {/* <input {...register("exampleRequired", { required: true })} type="text" value={emph} onChange={(e) => setEMPH(e.target.value)} placeholder="Email or Phone" className="bg-gray-400 m-3 p-2 rounded-sm" />
                                <input {...register("example")} type="text" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Password" className="bg-gray-400 m-3 p-2 rounded-sm" /> */}

                                <button className='bg-secondary'
                                    type='submit'
                                >{token ? 'Logout' : 'Login'}</button>

                                {errors.emph && <span>This field is required</span>}
                                {errors.pass && <span>This field is required</span>}
                            </form>
                            <StyledButton />

                            <span>Don't Have an Account? Sign Up Here</span>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        </React.Fragment>
    )
}

export default Home
