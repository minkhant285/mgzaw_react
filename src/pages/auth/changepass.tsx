import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { changePassValidationSchema } from './validators';
import useApi from '../../hooks/useApi';
import { useNavigate } from 'react-router-dom';

type Inputs = {
    current_password: string;
    new_password: string;
    confirm_password: string;
}

function ChangePasswordPage() {

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(changePassValidationSchema)
    });

    const changePass = useApi();
    const navigate = useNavigate();


    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        const result = await changePass.sendRequest({
            url: `auth/changepass`,
            method: 'PUT',
            data: {
                'currentPassword': data.current_password,
                'newPassword': data.new_password,
            }
        });

        if (result?.status_code === 200) {
            navigate('/profile', { replace: true })
        }

    }

    return (
        <div className='p-3'>
            <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden flex flex-col  p-3 items-center" >
                {changePass.error && <div style={{ backgroundColor: '#e16161', padding: 16, borderRadius: 10, fontSize: '0.8em', maxWidth: 400, overflow: 'auto' }}>
                    {changePass.error}
                </div>
                    // :JSON.stringify(login.data, null, 2)
                }
                <h1>Change Password Page</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='flex-col flex'>
                    <input className="bg-gray-400 m-3 p-2 rounded-sm border-2" {...register("current_password", { required: true })} placeholder='Current Password' />
                    {errors.current_password && <span className='text-[#af3939]'>{errors.current_password.message}</span>}
                    <input className="bg-gray-400 m-3 p-2 rounded-sm border-2" {...register("new_password", { required: true })} placeholder='New Password' />
                    {errors.new_password && <span className='text-[#af3939]'>{errors.new_password.message}</span>}
                    <input className="bg-gray-400 m-3 p-2 rounded-sm border-2" {...register("confirm_password", { required: true })} placeholder='Confirm Password' />
                    {errors.confirm_password && <span className='text-[#af3939]'>{errors.confirm_password.message}</span>}
                    <button type='submit' className='bg-primary p-2 rounded-md text-white  mt-3'>Sign Up</button>
                </form>

            </div>
        </div>
    )
}

export default ChangePasswordPage
