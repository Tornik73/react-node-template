import React from 'react'
import logo from '../../../../../../assets/svg/logo.svg';
import './Logo-header.css';

const LogoHeader = () => {
    return (
        <div className="logo__header">
            <img src={logo}/>
        </div>
    );
}

export default LogoHeader;
