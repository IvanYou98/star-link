import React from 'react';
import "./Header.css"
import spacex_logo from '../../assets/images/spacex_logo.svg';

const Header = (props) => {
    return (
        <header className="App-header">
            <img src={spacex_logo} className="App-logo" alt="logo" />
            <p className="title">
                StarLink Tracker
            </p>
        </header>
    );
}
export default Header;
