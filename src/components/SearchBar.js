import React from 'react';
import styled from '@emotion/styled';

const SearchInput = styled.input`
    width: 100%;
    padding: 8px;
    background: #555;
    border: none;
    color: #FFFFFF;
`;

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <SearchInput 
            type="text" 
            placeholder="Search..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
        />
    );
};

export default SearchBar;
