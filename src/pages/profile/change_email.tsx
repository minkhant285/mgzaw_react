import React from 'react'
import useApi from '../../hooks/useApi';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
    email: string;
    password: string;
}

function ChangeEmailPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const changePhone = useApi('Change Email');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const old = searchParams.get('old');


    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        const result = await changePhone.sendRequest({
            url: `user/change_email`,
            method: 'PUT',
            data: {
                'newEmail': data.email,
                'password': data.password,
            }
        });

        if (result?.status_code === 200) {
            alert(result.message);
            navigate('/profile', { replace: true })
        }

    }

    return (
        <div className='p-3'>
            <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden flex flex-col  p-3 items-center" >
                {changePhone.error && <div style={{ backgroundColor: '#e16161', padding: 16, borderRadius: 10, fontSize: '0.8em', maxWidth: 400, overflow: 'auto' }}>
                    {changePhone.error}
                </div>
                    // :JSON.stringify(login.data, null, 2)
                }
                <h1>Change Email Page</h1>

                <form onSubmit={handleSubmit(onSubmit)} className='flex-col flex'>
                    <div className='flex flex-col p-4'>
                        <span className='font-bold text-lg'>Current Email: </span>
                        <p>{old}</p>
                    </div>
                    <input className="bg-gray-400 m-3 p-2 rounded-sm border-2" {...register("email", { required: true })} placeholder='New Email' />
                    {errors.email && <span className='text-[#af3939]'>{errors.email.message}</span>}
                    <input className="bg-gray-400 m-3 p-2 rounded-sm border-2" {...register("password", { required: true })} placeholder='Password' />
                    {errors.password && <span className='text-[#af3939]'>{errors.password.message}</span>}
                    <button type='submit' className='bg-primary p-2 rounded-md text-white  mt-3'>Save</button>
                </form>

            </div>
        </div>
    )
}

export default ChangeEmailPage
