import { useContext } from 'react'
import useApi from '../../hooks/useApi';
import { AppContext } from '../../providers/app.provider';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginResult, UserInfoResult } from '../../models';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidationSchema } from './validators';
import { AppStorage } from '../../utils';

type Inputs = {
    emph: string,
    password: string,
};

function Login() {

    const { saveAuth, authStatusControl } = useContext(AppContext);
    const login = useApi();
    const user = useApi();

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(loginValidationSchema)
    });
    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        const result = await login.sendRequest({
            url: `auth/login`,
            method: 'POST',
            data: {
                'phemail': data.emph,
                'password': data.password
            }
        }) as LoginResult;
        // console.log(result)

        if (result.status_code !== 400 && result.result.token) {
            new AppStorage().setToken(result.result.token);
            let r = await user.sendRequest({
                url: `user`,
                method: 'GET',
            }) as UserInfoResult;
            saveAuth(result.result.token, r.result);
            authStatusControl(true);
        }


    }

    return (


        <div className=" gap-8 w-fit h-fit p-5 rounded-lg flex flex-col justify-around items-center ">


            {login.error && <div style={{ backgroundColor: '#e16161', padding: 16, borderRadius: 10, fontSize: '0.8em', maxWidth: 400, overflow: 'auto' }}>
                {login.error}
            </div>
                // :JSON.stringify(login.data, null, 2)
            }

            <h3 className="text-white text-2xl font-bold underline ">
                MgZAW Admin Login Here
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center'>
                <input {...register("emph", { required: true })} placeholder="Email or Phone" className="bg-gray-400 m-3 p-2 rounded-sm" />
                {errors.emph && <span className='text-[#af3939]'>{errors.emph.message}</span>}
                <input {...register("password", { required: true })} type="password" placeholder="Password" className="bg-gray-400 m-3 p-2 rounded-sm" />
                {errors.password && <span className='text-[#af3939]'>{errors.password.message}</span>}
                <br />
                <button className='bg-primary p-2 rounded-md text-white px-5'
                    type='submit'
                >Login</button>

            </form>

            <Link to="/register" style={{ color: '#2974de', textDecoration: 'underline' }}>Don't Have an Account? Sign Up Here</Link>
            <Link to="/forgotpass" style={{ color: '#2974de', textDecoration: 'underline' }}>Forgot Password? Reset Here</Link>
        </div>

    )
}

export default Login
