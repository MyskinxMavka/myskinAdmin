import styled from 'styled-components';

export const Container = styled.div`
  width: max-content;
  margin: 30px 0 30px auto;
`

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* border: 1px solid  #e5e5e5; */

  /* button:nth-of-type(1) {
    border-left: 1px solid  #e5e5e5;
  } */

  button + button {
    border-left: none;
  }
`

export const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* width: 100%; */
  margin-top: 20px;
  gap: 30px;

`

export const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;

  width: 110px;
  height: 40px;
  padding: 0 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e5e5e5;
  font-size: 16px;
  border: 1px solid  #e5e5e5;
  transition: 0.4s;

  &:hover {
    color: cornflowerblue;
  }

  &:hover > i {
    color: cornflowerblue;
  }

  &:disabled {
    &:hover {
    color: #e5e5e5;
    }

    &:hover > i {
      color: #e5e5e5;
    }
  }

  i {
    transition: 0.4s;
    margin: 0 5px;
    font-size: 1.2rem;
    color: #ccc;
  }
`

export const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  border: 1px solid  #e5e5e5;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: cornflowerblue;
  font-size: 16px;
  transition: 0.4s;

  &.active {
    background: cornflowerblue;
    color: #fff;
  }

`

export const Plug = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: cornflowerblue;
  font-size: 16px;
  border: 1px solid  #e5e5e5;
`
