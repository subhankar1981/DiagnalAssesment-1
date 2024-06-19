import React, { useState, useEffect } from 'react';
import backButtonImage from '../images/back.png';
import searchIcon from '../images/search.png';

const Header = ({ searchTerm, setSearchTerm, title, loadMoreData }) => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const handleBackButtonClick = () => {
        setIsSearchVisible(false);
        setSearchTerm('');
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchIconClick = () => {
        setIsSearchVisible(true);
    };

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={isScrolled ? 'scrolled' : ''}>
            <div>
                <button onClick={handleBackButtonClick}>
                    <img src={backButtonImage} alt="Back" className="icon back-icon" />
                </button>
            </div>
            {!isSearchVisible && <div><span className='header-title'>{title}</span></div>}
            <div className="search-container" style={{ display: isSearchVisible ? 'flex' : 'none' }}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <img src={searchIcon} alt="Search" className="icon search-icon" onClick={handleSearchIconClick} />
            </div>
            {!isSearchVisible && (
                <img src={searchIcon} alt="Search" className="icon search-icon" onClick={handleSearchIconClick} />
            )}
        </header>
    );
};

export default Header;