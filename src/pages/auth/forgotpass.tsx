import { Link } from 'react-router-dom'
import useApi from '../../hooks/useApi';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
    emph: string;
}


function ForgotPass() {

    const forgotApi = useApi();
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        await forgotApi.sendRequest({
            url: `auth/forgotpass`,
            method: 'POST',
            data: {
                'phemail': data.emph,
            }
        });
    }

    return (
        <div className=" gap-8 w-fit h-fit p-5 rounded-lg flex flex-col justify-around items-center ">


            {forgotApi.error && <div style={{ backgroundColor: '#e16161', padding: 16, borderRadius: 10, fontSize: '0.8em', maxWidth: 350, overflow: 'auto' }}>
                {forgotApi.error}
            </div>
            }
            {forgotApi.rawData && <div style={{ backgroundColor: '#14e158', padding: 16, borderRadius: 10, fontSize: '0.8em', maxWidth: 350, overflow: 'auto' }}>
                {forgotApi.rawData?.message}
            </div>}

            <h3 className="text-white text-2xl font-bold underline ">
                React Base Reset Password
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center'>
                <input type='email' {...register("emph", { required: true })} placeholder="Email or Phone" className="bg-gray-400 m-3 p-2 rounded-sm" />
                {errors.emph && <span className='text-[#af3939]'>{errors.emph.message}</span>}
                <br />
                <button className='bg-primary p-2 rounded-md text-white px-5'
                    type='submit'
                >Send</button>

            </form>

            <Link to="/login" style={{ color: '#2974de', textDecoration: 'underline' }}>Login Here</Link>
        </div>
    )
}

export default ForgotPass
