import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    padding: 0 20px 0 0;
`;
export const Head = styled.thead`
    background-color: #e5e5e5;
    border: 'none';
   
    tr {
        border: 1px solid #ccc;
    }
`;
export const HeadTable = styled.th<{center?: string, width?: number}>`
    text-align: ${({center}) => center || 'left'};
    width: ${({width}) => width ? `${width}px` : 'auto'};
    padding: 12px 8px !important;
    vertical-align: middle;
`;


export const Body = styled.tbody`
    border-top: transparent !important;
    
    td {
        border: 1px solid #ccc;
    }

    tr {
        height: 50px;
    }
`;

export const BodyTable = styled.td<{center?: string, disabled?: boolean}>`
    text-align: ${({center}) => center || 'left'};
    vertical-align: middle;
    color: ${({disabled}) => disabled ? '#ccc' : '#000'};
`;

export const Button = styled.button`
    border: none;
    background: transparent;
    transition: 0.4s;

    &:hover {
        transform: scale(1.1);
    }
`;

export const Input = styled.input`
    padding: 5px 7px;
    border-radius: 4px;
    border: 1px solid #000;
    width: 100px;
    margin-left: 20px;
`;




