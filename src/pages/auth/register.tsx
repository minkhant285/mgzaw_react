import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import useApi from '../../hooks/useApi';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerValidationSchema } from './validators';

type Inputs = {
    username: string;
    emph: string;
    password: string;
    confirm_password: string;
}

function Register() {

    const signUp = useApi();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(registerValidationSchema)
    });
    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        const result = await signUp.sendRequest({
            url: `auth/register`,
            method: 'POST',
            data: {
                'phemail': data.emph,
                'password': data.password,
                'username': data.username
            }
        });

        if (result?.status_code === 201) {
            navigate('/login')
        }

    }

    return (
        <div className="gap-8 w-fit h-fit p-5 rounded-lg flex flex-col justify-around items-center ">

            {signUp.error && <div style={{ backgroundColor: '#e16161', padding: 16, borderRadius: 10, fontSize: '0.8em', maxWidth: 400, overflow: 'auto' }}>
                {signUp.error}
            </div>
                // :JSON.stringify(login.data, null, 2)
            }
            <h1 className='text-white text-2xl font-bold underline'>
                Register User Here
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center'>
                <input className="bg-gray-400 m-3 p-2 rounded-sm" {...register("username", { required: true })} placeholder='username' />
                {errors.username && <span className='text-[#af3939]'>{errors.username.message}</span>}
                <input className="bg-gray-400 m-3 p-2 rounded-sm" {...register("emph", { required: true })} placeholder='Emal Or Phone' />
                {errors.emph && <span className='text-[#af3939]'>{errors.emph.message}</span>}
                <input className="bg-gray-400 m-3 p-2 rounded-sm" {...register("password", { required: true })} placeholder='Password' />
                {errors.password && <span className='text-[#af3939]'>{errors.password.message}</span>}
                <input className="bg-gray-400 m-3 p-2 rounded-sm" {...register("confirm_password", { required: true })} placeholder='Confirm Password' />
                {errors.confirm_password && <span className='text-[#af3939]'>{errors.confirm_password.message}</span>}
                <button type='submit' className='bg-primary p-2 rounded-md text-white  mt-3'>Sign Up</button>
            </form>

            <Link to="/login" replace style={{ color: '#2974de', textDecoration: 'underline' }}>Already Have account? Login In</Link>
        </div>
    )
}

export default Register
