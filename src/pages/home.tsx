import StyledButton from '../components/button'

function Home() {
    return (
        <div className='bg-background flex flex-col justify-center  top-0 left-0 right-0 bottom-0 absolute'>

            <div className='bg-primary text-white h-14 p-7 flex justify-start items-center font-bold text-2xl'>
                Base React App
            </div>

            <div className=' flex flex-1 bg-tertiary p-16 px-44'>
                <div style={{ backgroundColor: 'red' }} className='bg-white flex-1'>
                    <h1>Hello world</h1>
                </div>
                <div className='w-1/3 bg-secondary flex justify-center items-center'>

                    <div className="bg-primary gap-8 w-fit h-fit p-5 rounded-lg flex flex-col justify-around items-center ">

                        <h3 className="text-2xl font-bold underline dark:text-white">
                            React Base Login Here
                        </h3>

                        <input type="text" placeholder="Email or Phone" className="bg-gray-400 m-3 p-2 rounded-sm" />
                        <input type="text" placeholder="Password" className="bg-gray-400 m-3 p-2 rounded-sm" />

                        <StyledButton />

                        <span>Don't Have an Account? Sign Up Here</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
