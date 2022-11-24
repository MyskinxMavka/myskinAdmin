import {Body, BodyTable, Head, HeadTable, Wrapper} from './styled'

import { Table } from 'react-bootstrap'

interface TableProps {
    users: Array<{
        id: string
        name: string
        surname: string
        phoneNumber: string
        email: string
        address: string
        favorites: {
            skincare: string
            wouldLikeToBuy: string
        }
    }>
}

const UserTable = ({users}:  TableProps) => {
    
    return (
        <>
        <Wrapper>
        <Table bordered hover id="table-customers">
            <Head>
                <tr>
                    <HeadTable center={'center'} width={120}>Id Customer</HeadTable>
                    <HeadTable center={'center'} width={150}>Name</HeadTable>
                    <HeadTable center={'center'} >email</HeadTable>
                    <HeadTable center={'center'} >phone</HeadTable>
                    <HeadTable center={'center'} >address</HeadTable>
                    <HeadTable  width={170}>favorite professional skincare brands/products</HeadTable>
                    <HeadTable  width={170}>favorite brands/products that the customer would like to buy from us</HeadTable>
                </tr>
            </Head>
            <Body >
                {users?.slice().sort((a,b) => {
                    if (Number(a.id)> Number(b.id)) {
                        return 1
                    } else {
                        return -1
                    }
                })
                .map(user => {
                
                    return <tr key={user.id}>
                        <BodyTable center={'center'}>{user.id}</BodyTable>
                        <BodyTable center={'center'}>{user.name}</BodyTable>
                        <BodyTable center={'center'}>{user.email}</BodyTable>
                        <BodyTable center={'center'}>{user.phoneNumber}</BodyTable>
                        <BodyTable center={'center'}>{user.address}</BodyTable>
                        <BodyTable >{user.favorites?.skincare}</BodyTable>
                        <BodyTable >{user.favorites?.wouldLikeToBuy}</BodyTable>
                    </tr>
                }
                )}
            </Body>
        </Table>
        </Wrapper>
        </>
    )
}

export default UserTable
