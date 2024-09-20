import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className='w-full h-20 bg-[#000] text-white text-sm  flex justify-center items-center flex-wrap bottom-0 static'>
            <span>Copyright © 2024 MGZAW.com All rights reserved.</span> &nbsp;
            <Link to={'/terms'} className='hover:underline'>Terms of Service</Link> &nbsp;| &nbsp;
            <Link to={'/privacy'} className='hover:underline'> Privacy Policy</Link>
        </div>
    )
}

export default Footer
