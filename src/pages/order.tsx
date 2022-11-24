/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Col, Dropdown, ListGroup, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { GET_ORDERS } from '../api/query/order';
import { LoadingSpinner } from "../components/spinner";
import Pagination from '../components/pagination/Pagination'
import Search from '../components/common/search/Search';
import { UPDATE_STATUS } from '../api/mutation/order';
import {paginate} from '../utils/pagination'
import styled from 'styled-components';
import { toast } from 'react-toastify';

interface Item {
    id: string;
    status: string;
    date: string;
    totalPrice: number;
}

const DropdownStatus = ({ status, id }: { status: string, id: number | string }) => {
    const [activeStatus, setActiveStatus] = useState<string>('');
    const [variant, setVariant] = useState<string>('');

    const [updateStatus, { loading }] = useMutation(UPDATE_STATUS, {
        refetchQueries: [
            GET_ORDERS, // DocumentNode object parsed with gql
            'GetOrders' // Query name
        ],
        onCompleted: () => {
            toast.success('Status updated successfully');
        },
        onError: (error) => {
            toast.error(`Error updating status! ${error}`);
        }
    });

    const setVariantItem = (status: string): string => {
        if (status === 'new') return 'primary';
        if (status === 'pending') return 'warning';
        if (status === 'delivered') return 'success';
        if (status === 'canceled') return 'danger';
        return 'light'
    };

    useEffect(() => {
        setVariant(setVariantItem(activeStatus));
    }, [activeStatus]);

    useEffect(() => {
        setActiveStatus('');
        setVariant(setVariantItem(status));
    }, [status]);

    const changeStatus = (status: string) => {
        setActiveStatus(status);
            updateStatus({
                variables: {
                id: id,
                status: status,
            }
        });
    };

    return (
        <>
            {loading && <LoadingSpinner />}
            <Dropdown>
                <Dropdown.Toggle variant={variant} id="dropdown-basic">
                    {activeStatus ? activeStatus : status}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => changeStatus('pending')}>Pending</Dropdown.Item>
                    <Dropdown.Item onClick={() => changeStatus('delivered')}>Delivered</Dropdown.Item>
                    <Dropdown.Item onClick={() => changeStatus('canceled')}>Canceled</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

const InfoBlock = ({ data }: any) => {
    const itemsProduct = () => {
        return (
            data.products.map((item: any) => {
                return (
                    <Row>
                        <ColRightLine>
                            {item?.product?.title}
                        </ColRightLine>
                        <ColRightLine>
                            {item?.product?.price} aed
                        </ColRightLine>
                        <Col>
                            {item?.quantity} pc
                        </Col>
                    </Row>
                )
            })
        )
    };
    const itemsUser = () => {
        return (
            <StyledRow>
                <Col>
                    <Text>Name/Surname:</Text> <br />{data.user.name || data.userName} / {data.user.surname || data.userSurname}
                    <br /> <Text>Email:</Text> <br />{data.user.email || data.userContact}
                </Col>
                <Col>
                    <Text>Address:</Text> <br /> {data.user.address || data.userAddress}
                    <br /><Text>Phone:</Text><br /> {data.user.phoneNumber || data.userPhone}
                </Col>
            </StyledRow>
        )
    }
    return (
        <Col md={11}>
            <Bold>Order</Bold>
            <StyledRow>
                <Col>
                    <Text>Date:</Text> {new Date(+data.date).toDateString()}
                </Col>
                <Col>
                    <DropdownStatus status={data.status} id={data.id} />
                </Col>
                <Col>
                    <Text>Total price:</Text> {data.totalPrice}
                </Col>
            </StyledRow>
            <Bold>User</Bold>
            {itemsUser()}
            <Bold>Products</Bold>
            <StyledRow>
                <Row>
                    <ColRightLine>
                        <Text>Title:</Text>
                    </ColRightLine>
                    <ColRightLine>
                        <Text>Price:</Text>
                    </ColRightLine>
                    <Col>
                        <Text>Count:</Text>
                    </Col>
                </Row>
                {itemsProduct()}
            </StyledRow>
            <Bold>More info</Bold>
            <StyledRow>
                <Col>
                    <Text>Delivery:</Text><br /> {data.delivery}
                </Col>
                <Col>
                    <Text>Contactless delivery:</Text><br /> {data.isContactlessDelivery ? 'Yes' : 'No'}
                </Col>
                <Col>
                    <Text>Time slot:</Text><br /> {data.timeSlot}
                </Col>
                <Col>
                    <Text>Payment:</Text> <br />{data.payment}
                </Col>
            </StyledRow>
            {data.paymentId &&
            <>
                <Bold>Payment id</Bold>
                <StyledRow>
                    <Col>
                        <Text>Id:</Text> <a href={`https://dashboard.stripe.com/test/payments/${data.paymentId}`} target="_blank">{data.paymentId}</a>
                    </Col>
                </StyledRow>
            </>}
        </Col>
    );
};
const PAGES = 20;

export const Order = () => {
    const [page, setPage] = useState(1)
    const [activeData, setActiveData] = useState();
    const [activeOrder, setActiveOrder] = useState([]);
    const { data, loading } = useQuery(GET_ORDERS, {
        onCompleted: (data) => {
            setActiveOrder(data?.orders)
        }
    });

    const setVariantItem = (status: string): string => {
        if (status === 'new') return 'primary';
        if (status === 'pending') return 'warning';
        if (status === 'delivered') return 'success';
        if (status === 'canceled') return 'danger';
        return 'light'
    };
    const pagination = activeOrder && paginate(activeOrder?.length, page, PAGES, activeOrder.slice().sort((a: any,b: any) => b.id - a.id)) || {}
    const {pages, newData} = pagination

    const getActiveItem = (item: any) => {
        setActiveData(item);
    };

    const filterByTitle= (product: any) => {
        setActiveOrder(product)
    };
  
    const items = newData?.sort((a: any,b: any) => b.id - a.id).map((item: Item, id) => (
        <ListGroup.Item action onClick={() => getActiveItem(item)} key={id ** 2} variant={setVariantItem(item.status)}>
            <Row>
                <Col md={2}>
                    <h5>{item.id}</h5>
                </Col>
                <Col md={7}>
                    <h5>{new Date(+item.date).toDateString()}</h5>
                </Col>
                <Col>
                    <h5>{item.totalPrice}</h5>
                </Col>
            </Row>
        </ListGroup.Item>
    ))
  
    return (
        <Row>
            {loading && <LoadingSpinner />}
            <Col md={4}>
                <CustomListGroup>
                    {items}
                </CustomListGroup>
            </Col>
            <Col md={8}>
                <Wrapper>
                    <FixedSearch 
                        data={data?.orders} 
                        setFiltered={filterByTitle} 
                        isOrder={true}
                    />
                    {activeData && <InfoBlock data={activeData} />}
                    <FixedPagination pages={pages} pageHandler={setPage} page={page}/>
                </Wrapper>
            </Col>
        </Row>
    );
};

const StyledRow = styled(Row)`
    border: 1px solid #dadada;
    border-radius: 5px;
`;

const Bold = styled.span`
    font-weight: 800;
`;

const Text = styled.span`
    font-weight: 500;
`;

const ColRightLine = styled(Col)`
    border-right: 1px solid #dadada;
`;

const CustomListGroup = styled(ListGroup)`
    padding-bottom: 30px;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    position: fixed;
    min-height: calc(100vh - 70px);
    width: 56%;
`;

const FixedPagination = styled(Pagination)`
    margin-right: 50px;
`;

const FixedSearch = styled(Search)`
    margin-right: 50px;
    align-self: flex-end;
`;