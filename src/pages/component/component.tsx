import { useContext } from 'react'
import AppBar from '../../components/appbar'
import StyledButton from '../../components/button'
import { AppContext } from '../../providers/app.provider'

function ComponentPage() {

    const { toggleTheme } = useContext(AppContext);

    return (
        <div className='p-6'>
            <div className='flex flex-col gap-6'>
                <AppBar />
                <StyledButton onClick={() => toggleTheme('default')}><span className='bg-default'>Default</span></StyledButton>
                <StyledButton onClick={() => toggleTheme('green')}><span className='bg-success'>Green</span></StyledButton>
                <StyledButton onClick={() => toggleTheme('blue')}><span className='bg-blue'>Blue</span></StyledButton>
            </div>
        </div>
    )
}

export default ComponentPage
