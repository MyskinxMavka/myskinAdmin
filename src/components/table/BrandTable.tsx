/* eslint-disable max-lines-per-function */

import {Body, BodyTable, Button, Head, HeadTable, Wrapper} from './styled'

import Checkbox from '../common/checkbox/Checkbox'
import CustomModal from '../common/modal/Modal'
import React from 'react'
import Switch from '../common/switch/Switch'
import { Table } from 'react-bootstrap'
import { generateSortFn } from '../../utils/generateSortFn'
import { useNavigate } from 'react-router-dom';

interface TableProps {
    brands: BrandType[]
    setActiveData: (product: any) => void
    deleteBrand: (id: string) => void
}

interface BrandType {
    title: string
    photo: string
    order: number
    archive: boolean
    description?: string
    active: boolean
    id: string
}


const BrandTable = ({brands, setActiveData, deleteBrand}:  TableProps) => {
    const navigate = useNavigate()
    const [show, setShow] = React.useState(false)
    const [currentBrand, setCurrentBrand] = React.useState({id: '', order: 0})
    const [id, setId] = React.useState('')

    const updateHandler = (value: any) => {
        const updated = brands.map(brand => brand.id === value.id ? {...value} : brand)
        setActiveData(updated)
    }

    const deleteHandler = (id: string) => {
        setId(id)
        setShow(true)
    }

    const dragStartHandler = (e: any, brand: any) => {
        setCurrentBrand(brand)
    }

    const dragOverHandler = (e: any) => {
        e.preventDefault()
        
        if (e.target.parentElement.className == 'item') {
            e.target.parentElement.style.background = '#e5e5e5';
        }
    }

    const dragLeaveHandler = (e: any) => {
        e.target.parentElement.style.background = 'white';
    }

    const dragEndHandler = (e: any) => {
        e.target.parentElement.style.background = 'white';
    }

    const dropHandler = (e: any, brand: any) => {
        e.preventDefault() 

        if (!brand.archive) {
            e.target.parentElement.style.background = 'white';
        }
        
        if (brand.id === currentBrand.id || brand.archive) {
            return
        }
       
        const sort = brands?.slice().sort(generateSortFn(settings)).map(b => {
            if (brand.order > currentBrand.order) {
                if (b.order < brand.order && b.order > currentBrand.order) {
                    return {...b, order: b.order -1}
                }
                if (b.id === brand.id) {
                    return {...b, order: brand.order - 1}
                } 
                if (b.id === currentBrand.id) { 
                    return {...b, order: brand.order}
                }
            } else {
                if (b.id === brand.id) {
                    return {...b, order: brand.order + 1}
                } 
                if (b.id === currentBrand.id) {
                    return {...b, order: brand.order}
                }
                if (b.order > brand.order && b.order < currentBrand.order + 1) {
                    return {...b, order: b.order + 1}
                }
            }
                        
            return b
        })
    
        setActiveData(sort)
        setCurrentBrand({id: '', order: 0})
    }
    
    return (
        <>
        <Wrapper>
            <Table bordered hover>
                <Head>
                    <tr>
                        <HeadTable center={'center'} width={170}>show main page</HeadTable>
                        <HeadTable>title</HeadTable>
                        <HeadTable center={'center'} width={120}>edit</HeadTable>
                        <HeadTable center={'center'} width={120}>archive</HeadTable>
                        <HeadTable center={'center'} width={120}>delete</HeadTable>
                    </tr>
                </Head>
                <Body>
                    {brands && brands?.slice().sort(generateSortFn(settings))
                        .map(brand => 
                        <tr 
                            className="item"
                            draggable={brand.active && !brand.archive}
                            onDragStart={(e) => dragStartHandler(e, brand)} 
                            onDragEnd={(e) => dragEndHandler(e)} 
                            onDragLeave={(e) => dragLeaveHandler(e)} 
                            onDragOver={(e) => dragOverHandler(e)} 
                            onDrop={(e) => dropHandler(e, brand)}
                            key={brand.id} 
                            style={{backgroundColor: brand.archive ? '#e5e5e5' : 'transparent', cursor: brand.active && !brand.archive ? 'grab' : 'default'}}
                        >
                            <BodyTable center={'center'}>
                                {!brand.archive && 
                                <Checkbox
                                    checked={brand.active}
                                    id={brand.id}
                                    setChecked={(checked) => updateHandler({ ...brand, active: checked })}
                                />}
                            </BodyTable>
                            <BodyTable disabled={brand.archive}>
                                {brand.title}
                            </BodyTable>
                            <BodyTable center={'center'}>
                                {!brand.archive && 
                                <Button 
                                    onClick={() => navigate('/main/brand/new', { state: {brandId: brand.id}})}
                                >
                                    <i className="bi-pencil-fill" style={{fontSize: '1.5rem', color: 'cornflowerblue'}}/>
                                </Button>}
                            </BodyTable>
                            <BodyTable center={'center'}>
                                {!brand.active && <Switch checked={brand.archive} setChecked={(checked) => updateHandler({ ...brand, archive: checked })}/>}
                            </BodyTable>
                            <BodyTable center={'center'}>
                                {!brand.archive && 
                                <Button onClick={() => deleteHandler(brand.id)}>
                                    <i className="bi-trash" style={{fontSize: '1.5rem', color: 'cornflowerblue'}}/>
                                </Button>}
                            </BodyTable>
                        </tr>
                    )}
                </Body>
            </Table>
        </Wrapper>
        <CustomModal title="brand" show={show} setShow={setShow} confirm={() => deleteBrand(id)}/>
        </>
    )
}

export default BrandTable;


const settings = [{name: "active", reverse: true},{name: "archive", reverse: false},{name: "order", reverse: false}]