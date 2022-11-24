import styled from 'styled-components';

const checked ='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iOSIgdmlld0JveD0iMCAwIDEzIDkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQogICAgPHBhdGggZD0iTTEgNC41TDQuNjYyMzUgOEwxMiAxIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+DQo8L3N2Zz4NCg==';

export const  CustomCheckBox = styled.input`
  position: absolute;
  z-index: -1;
  opacity: 0;
  
  &+label {
    display: inline-flex;
    align-items: center;
    user-select: none;
  }

  & + label {
    font-size: 16px;
    font-weight: 500;
    line-height: 120%;
    color: #000;
  }

  &+label::before {
    box-sizing: border-box;
    content: '';
    display: inline-block;
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid #000;
    border-radius: 6px;
    margin-right: 0.5em;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
    cursor: pointer;
  }
  

  &:checked+label::before {
    background-image: url(${checked});
  }
`