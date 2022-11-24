import styled from 'styled-components';

export const CustomSearch = styled.input`
    width: 100%;
    height: 40px;
    background: rgba(255, 255, 255, 0.85);
    border: 1px solid #C4C4C4;
    border-radius: 30px;
    padding: 16px 16px 16px 30px;
    font-size: 16px;
    color: #808080;
    transition: 0.4s;

    :focus {
        border: 0.5px solid #7a7a7a;
    }
`

export const SearchWrapper = styled.div`
    position: relative;
    width: 220px;
    height: 40px;
`

export const SearchIcon = styled.img`
    position: absolute;
    left: 1px;
    top: 7px;
    width: 30px;
    height: 30px;
`