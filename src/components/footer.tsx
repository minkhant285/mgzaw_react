import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className='w-full h-20 bg-[#000] text-white flex justify-center items-center text-sm flex-wrap'>
            <span>Copyright © 2024 MGZAW.com All rights reserved.</span> &nbsp;
            <Link to={'/terms'} className='hover:underline'>Terms and Conditions</Link> &nbsp;| &nbsp;
            <Link to={''} className='hover:underline'> Privacy Policy</Link>
        </div>
    )
}

export default Footer
