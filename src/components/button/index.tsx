/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "react-bootstrap";
import styled from "styled-components";

export const ButtonComponent = (
    { isDelete, isUpdate, onClick }: 
    { isDelete?: boolean, isUpdate?: boolean, onClick: () => void }
    ) => {

    return (
        <StyledButton 
            variant={ isDelete ? 'danger' : isUpdate ? 'secondary' : 'dark'}
            onClick={() => onClick()}
            >
            { isDelete ? 'Delete' : isUpdate ? 'Update' : 'Click'}
        </StyledButton> 
    );
};

const StyledButton = styled(Button)`
    margin: 0 5px 0 0;
`;