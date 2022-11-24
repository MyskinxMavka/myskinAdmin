import styled from 'styled-components';

export const CustomSwitch = styled.div`
    display: flex;
    justify-content: center;

    input[type="checkbox"].switch  {
        position: absolute;
        opacity: 0;
    }

    input[type="checkbox"].switch + div {
        vertical-align: middle;
        width: 30px;
        height: 15px;
        border-radius: 999px;
        background-color: #fff;
        border: 0.5px solid #e5e5e5;

        transition-duration: .4s;
        transition-property: background-color, box-shadow;
        cursor: pointer;
    }

    input[type="checkbox"].switch + div span {
        position: absolute;
        font-size: 1.6rem;
        color: white;
        margin-top: 12px;
    }

    input[type="checkbox"].switch + div span:nth-child( 1 ) {
        margin-left: 15px;
    }

    input[type="checkbox"].switch + div span:nth-child( 2 ) {
        margin-left: 55px;
    }

    input[type="checkbox"].switch:checked + div {
        width: 65px;
        background-position: 0 0;
        background-color: #3b89ec;
    }

    input[type="checkbox"].switch + div {
        width: 65px;
        height: 33px;
    }


    input[type="checkbox"].switch:checked + div {
        background-color: #75f407;
    }

    input[type="checkbox"].switch + div > div {
        float: left;
        width: 26px;
        height: 26px;
        border: 0.5px solid #e5e5e5;
        border-radius: inherit;
        background: #ffffff;
        transition-timing-function: cubic-bezier(1,0,0,1);
        transition-duration: 0.4s;
        transition-property: transform, background-color;
        pointer-events: none;
        margin-top: 3px;
        margin-left: 3px;
    }

    input[type="checkbox"].switch:checked + div > div {
        transform: translate3d(20px, 0, 0);
        background-color: #ffffff;
    }

    input[type="checkbox"].bigswitch.switch + div > div {
        width: 26px;
        height: 26px;
        margin-top: 3px;
    }

    input[type="checkbox"].switch:checked + div > div {
        transform: translate3d(31px, 0, 0);
        border: 0.5px solid #fff;
    }
`;
