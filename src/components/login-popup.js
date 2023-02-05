import { useState } from "react";

import Spinner from "./spinner"

import "./login-popup.css"

function LoginPopup(props) {
    const {login, closeModal} = props;
    const [isLoading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true)
        setTimeout(() => {
            login(() => {
                setLoading(false)
                closeModal()
            })
        }, 1500)
    }

    return (
        <div className="modal header__modal">
            <div className="modal__overlay" onClick={closeModal}/>
            <div className="modal__content">
                <button 
                    type="button" 
                    className="modal__login-button" 
                    onClick={handleClick}
                    disabled={isLoading}
                >
                    <span className="text">{isLoading ? "Fetching" : "Log in"}</span>
                    { isLoading && <Spinner /> }
                </button>
            </div>
        </div>
    )
}

export default LoginPopup