import styled from 'styled-components';

export const Block = styled.div`
    background-color: #fff;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
    border-right: 2px solid #00000059;
    padding: 20px;
    margin-bottom: 20px;
    width: 200px;
    min-height: 100vh;
    height: 100%;
    float: left;
`;

export const MenuItem = styled.div`
    padding: 7px 20px;
    border-radius: 4px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
    background: #e5e5e5;
    border: 1px solid #000;
    margin: 20px 0;
    text-align: center;
    transition: 0.4s;
    
    &:hover {
        cursor: pointer;
        box-shadow: 0px 4px 8px rgb(0 0 0 / 34%);
    }

    &.active {
        box-shadow: 0px 4px 8px rgb(0 0 0 / 34%);
    }
    
    a {
        color: #000;
        text-decoration: none;
        font-weight: 500;
        padding: 20px 35px 20px 35px;
    }
`;

export const Title = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 35px;
    text-align: center;
`;