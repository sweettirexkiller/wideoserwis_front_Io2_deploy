// react
import { useNavigate } from 'react-router-dom';

// microsoft

// my components
import LogButton from "./LogButton"

// css
import "../styles/Header.css"


const Header = () => {

    const navigate = useNavigate();
    const click_HomePage = () => {
        navigate('/');
    }
    return (
        <div className="header">
            <div onClick={click_HomePage}>
                filmiki.pl
            </div>

            <LogButton/>
        </div>
    )
}

export default Header