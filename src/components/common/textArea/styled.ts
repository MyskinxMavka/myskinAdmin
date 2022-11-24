import styled from 'styled-components';

export const EditorWrapper = styled.div`
  width: 100%;

  .rdw-editor-wrapper {
    background: transparent;
    border: 1px solid #000;
    overflow: hidden;
    resize: both;
    border-radius: 5px;
    height: 140px;
  }

  .rdw-editor-main {
    border-radius: 0 0 5px;
    overflow-y: auto;
    padding-left: 10px;
    font-size: 12px;
    color: #000;
    border-top: 1px solid #ccc;
    height: 100%;
    padding: 10px 10px 50px 10px;
  }

  .rdw-option-wrapper:nth-child(6), .rdw-option-wrapper:nth-child(7), .rdw-option-disabled {
    display: none;
  }

  .rdw-editor-toolbar, .rdw-list-wrapper {
    padding-left: 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .rdw-inline-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    border: none;
    margin-left: 10px;
  }

  .rdw-option-wrapper {
    background-color: transparent;
    border: transparent;
    cursor: pointer;
  }

  img {
    transition: 0.3s ease-in-out;

    &:hover {
      opacity: 0.5;
    }
  }
`;