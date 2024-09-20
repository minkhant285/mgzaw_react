import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className='bottom-0 static'>
            {/* <div className='w-full h-28 bg-primary'>
                ad
            </div> */}
            <div className='w-full h-[150px]  bg-[#000] text-white text-sm  flex justify-center flex-col items-center '>
                <div className='flex flex-col justify-center'>
                    <span>Copyright © 2024 MGZAW.com All rights reserved.</span>
                    <section className='self-center mt-1'>
                        <Link to={'/terms'} className='hover:underline'>Terms of Service</Link> &nbsp; | &nbsp;
                        <Link to={'/privacy'} className='hover:underline'> Privacy Policy</Link>
                    </section>
                </div>
                <br />
                <div>
                    <Link to={'/dmca'} target='_blank' className='hover:underline bg-primary p-2 rounded-sm mx-2'> DMCA</Link>
                    <Link to={'/us2257'} target='_blank' className='hover:underline bg-primary p-2 rounded-sm mx-2'> 18 U.S.C.2257</Link>
                </div>
            </div>
        </div>
    )
}

export default Footer
