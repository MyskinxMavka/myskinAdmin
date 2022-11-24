/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-explicit-any */

import ExportReactCSV from '../components/exportToExcel';
import { LoadingSpinner } from "../components/spinner";
import { USERS } from '../api/query/user';
import UserTable from '../components/table/UserTable';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

export const Users = () => {
    const { data, loading } = useQuery(USERS);

    return (
        <>  
            {loading && <LoadingSpinner />}
            <Flex margin="28px 20px 20px 0" >
                <ExportReactCSV users={data?.users}/>
            </Flex>
            {data && <UserTable users={data.users}/>}
        </>
    );
};

const Flex = styled.div<{width?: string, margin?: string}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${({width}) => width || 'auto'};
  margin: ${({margin}) => margin || 0};
`;
