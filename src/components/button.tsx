import { useContext } from 'react'
import { AppContext } from '../providers/app.provider'

function StyledButton() {

    const { toggleTheme } = useContext(AppContext);

    return (
        <div>
            <button type="submit" onClick={() => toggleTheme('default')} className="bg-primary p-3" >default</button>
            <button type="submit" onClick={() => toggleTheme('green')} className="bg-success p-3" >green</button>
            <button type="submit" onClick={() => toggleTheme('blue')} className="bg-secondary p-3" >blue</button>
        </div>
    )
}

export default StyledButton
