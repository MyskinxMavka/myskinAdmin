import {Body, BodyTable, Button, Head, HeadTable, Input, Wrapper} from './styled'

import CustomModal from '../common/modal/Modal'
import Pagination from '../pagination/Pagination'
import React from 'react'
import Switch from '../common/switch/Switch';
import { Table } from 'react-bootstrap'
import { generateSortFn } from '../../utils/generateSortFn'
import {paginate} from '../../utils/pagination'
import { useNavigate } from 'react-router-dom';

interface TableProps {
    products: Array<{
        title: string
        count: number
        isArchive?: boolean
        brandId: string
        id: string
    }>
    
    brands: Array<{id: string, archive: boolean}>
    setActiveData: (product: any) => void
    deleteProduct: (id: string) => void
}

const PAGES = 20;

const CustomTable = ({products, deleteProduct, setActiveData, brands}:  TableProps) => {
    const navigate = useNavigate()
    const [page, setPage] = React.useState(1)
    const [show, setShow] = React.useState(false)
    const [id, setId] = React.useState('')
    
    const pagination = products && paginate(products?.length, page, PAGES, products?.slice().reverse()) || {}
    const {pages, newData} = pagination
  
    const updateHandler = (value: any) => {
        const updated = products.map(product => product.id === value.id ? {...value} : product)
        setActiveData(updated)
    }

    const deleteHandler = (id: string) => {
        setId(id)
        setShow(true)
    }
 
    return (
        <>
        <Wrapper>
        <Table bordered hover>
            <Head>
                <tr>
                    <HeadTable>Title</HeadTable>
                    <HeadTable width={200}>count</HeadTable>
                    <HeadTable center={'center'} width={120}>edit</HeadTable>
                    <HeadTable center={'center'} width={120}>archive</HeadTable>
                    <HeadTable center={'center'} width={120}>delete</HeadTable>
                </tr>
            </Head>
            <Body >
                {brands && newData?.slice().sort(generateSortFn([{name: "archive", reverse: false},{name: "id", reverse: false},]))
                .map(product => {
                    const archivedBrand = Boolean(brands?.filter(brand => brand.id === product.brandId && brand.archive)[0])
                
                    return <tr key={product.id} style={{backgroundColor: product.archive ? '#e5e5e5' : 'transparent'}}>
                        <BodyTable disabled={product.archive}>{product.title}</BodyTable>
                        <BodyTable>
                            {!product.archive && 
                            <Input 
                                name='count' 
                                value={product.count} 
                                onChange={(e) => updateHandler({ ...product, [e.target.name]: +e.target.value })}
                            />}
                        </BodyTable>
                        <BodyTable center={'center'}>
                            {!product.archive &&
                            <Button 
                                onClick={() => navigate('/main/product/new', { state: {id: product.id}})}
                            >
                                <i className="bi-pencil-fill" style={{fontSize: '1.5rem', color: 'cornflowerblue'}}/>
                            </Button>}
                        </BodyTable>
                        <BodyTable center={'center'}>
                            {!archivedBrand && <Switch checked={product.archive} setChecked={(checked) => updateHandler({ ...product, archive: checked })}/>}
                        </BodyTable>
                        <BodyTable center={'center'}>
                            {!product.archive &&
                            <Button onClick={() => deleteHandler(product.id)}>
                                <i className="bi-trash" style={{fontSize: '1.5rem', color: 'cornflowerblue'}}/>
                            </Button>}
                        </BodyTable>
                    </tr>
                }
                )}
            </Body>
        </Table>
        <Pagination pages={pages} pageHandler={setPage} page={page}/>
        </Wrapper>
            <CustomModal title="product" show={show} setShow={setShow} confirm={() => deleteProduct(id)}/>
        </>
    )
}

export default CustomTable
