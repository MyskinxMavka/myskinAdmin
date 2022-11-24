import styled from 'styled-components';

export const Img = styled.img<{width?: string, fit?: string}>`
  width: ${({width}) => width || '140px'};
  height: 110px;
  margin-top: 20px;
  object-fit: ${({fit}) => fit || 'cover'};;

  :hover {
    cursor: pointer;
  }
`;

export const StyledFileBase64 = styled.div`
  margin-top: 20px !important;
  width: 270px;
  
  input {
    height: 100px;
  }
`;
