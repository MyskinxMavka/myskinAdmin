import styled from 'styled-components';

export const CustomButton = styled.button<{margin?: string}>`
    padding: 7px 20px;
    border-radius: 4px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
    background: #e5e5e5;
    border: 1px solid #000;
    margin: ${({margin}) => margin || '20px 0'};
    min-width: 150px;
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

