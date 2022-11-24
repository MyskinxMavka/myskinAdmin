/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
//@ts-nocheck

import { Button, Dropdown, DropdownButton, InputGroup, Modal } from "react-bootstrap";
import { DELETE_PRODUCT, MULTI_UPDATE_PRODUCT } from '../api/mutation/product';
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { CustomButton } from "../components/common";
import CustomTable from "../components/table/CustomTable";
import { GET_BRANDS } from '../api/query/brand';
import { GET_PRODUCTS } from "../api/query/product";
import { LoadingSpinner } from "../components/spinner";
import Search from "../components/common/search/Search";
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useRemoveImages } from "../hooks/useRemoveImages";

const DropDownComponent = ({ data, id, field, onActiveId, title}) => {
  const [active, setActive] = useState();
  const allFilters = data && data?.map(brand => brand) || []
  allFilters?.unshift({title: "All", id: '0'})

  const items = allFilters?.map(item => {
    return (
      <Dropdown.Item key={item.id} onClick={() => {
        setActive(item.title)
        onActiveId(item.id, field)
      }}
      >
        {item.title}</Dropdown.Item>
    )
  });

  useEffect(() => {
    if (id === '0') {
      setActive('All');
    } else {
      const activeItem = allFilters?.find(item => item.id === id);
      setActive(activeItem?.title);
    }
    
  }, [data, id]);

  return (
    <StyledDropdown>
      <InputGroup>
        <DropdownField>{active || title}</DropdownField>
        <DropdownButton
          variant="outline-secondary"
          title=""
          id="input-group-dropdown-2"
          align="end"
        >
          {items}
        </DropdownButton>
      </InputGroup>
    </StyledDropdown>
  )
};

export const Product = () => {
  const [isNew, setIsNew] = useState(false);
  const [activeData, setActiveData] = useState();
  const [isArab, setIsArab] = useState(false);
  const [data, setData] = useState();
  const navigate = useNavigate();
  const removeImages = useRemoveImages()

  const { data: dataBrand, loading: loadBrand } = useQuery(GET_BRANDS);
  const { data: dataProducts, refetch, loading: loadProducts } = useQuery(GET_PRODUCTS, {
    variables: {
        arab: isArab || false
      },
    }
  );

  const [multiUpdateProduct, { loading: loadUpdateProduct}] = useMutation(MULTI_UPDATE_PRODUCT, {
    refetchQueries: [
      GET_PRODUCTS, // DocumentNode object parsed with gql
      'GetProducts' // Query name
    ],
    onCompleted: () => {
      toast.success('Product updated successfully');
      
    },
    onError: (error) => {
      toast.error(`Error updating product! ${error}`);
    }
  });

  const [deleteProduct, { loading: loadDeleteProduct}] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [
      GET_PRODUCTS, // DocumentNode object parsed with gql
      'GetProducts' // Query name
    ],
    onCompleted: () => {
      toast.success('Product deleted successfully');
    },
    onError: (error) => {
      toast.error(`Error deleting product! ${error}`);
    }
  });

  const onSave = () => {
    const updatedProducts = filterUpdatedProduct(activeData, data)
 
    if (updatedProducts?.length) {
       multiUpdateProduct({
        variables: {
          fields: updatedProducts
        }
      });
    }
  };

  const filterByBrand = (id, filed) => {
    if (id === '0') {
      setActiveData(data)
    } else {
      const filtered = data.filter(product => product.brandId === id)
      setActiveData(filtered)
    }
  };

  const filterByTitle= (product) => {
    setActiveData(product)
  };

  const onDelete = (id) => {
    const products = activeData.filter(product => product.id !== id)
    const currentProduct = activeData.filter(product => product.id === id)[0]
   
    removeImages(currentProduct.photos, currentProduct.photosArab)
    deleteProduct({
      variables: {
        id
      }
    })
    setActiveData(products)
  };

  useEffect(() => {
    setData(dataProducts?.products);
    setActiveData(dataProducts?.products);
  }, [dataProducts]);
  
  const ModalAddProduct = ({ isOpen, handleOpen, handleClose }) => {
    return (
      <StyledModal show={isOpen} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* {activeComponent()} */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleClose()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </StyledModal>
    );
  };
 
  return (
    <div>
      {(loadUpdateProduct || loadProducts || loadBrand || loadDeleteProduct) && <LoadingSpinner />}
      {!isNew && <ModalAddProduct isOpen={isNew} handleOpen={() => setIsNew(true)} handleClose={() => {
        setIsNew(false);
      }} />}
      
      <Flex margin="28px 20px 20px 0" >
        <div>
          {!isNew && <CustomButton margin="0" onClick={() => {
            navigate('/main/product/new');
          }}>New</CustomButton>}
          <CustomButton margin="0 0 0 30px" onClick={() => onSave()} disabled={false}>Save</CustomButton>
        </div>
        <Flex>
          <DropDownComponent title="brands" data={dataBrand?.brands} id={activeData?.brandId} field={'brandId'} onActiveId={(id, filed) => filterByBrand(id, filed)} />
          <Search data={data} setFiltered={filterByTitle}/>
        </Flex>
      </Flex>
      <Flex>
        {activeData && <CustomTable brands={dataBrand?.brands} products={activeData} deleteProduct={onDelete} setActiveData={setActiveData}/>}
      </Flex>
    </div>
  )
};

const filterUpdatedProduct = (products: any[], currentProducts: any[]) => {
    if (!products || !currentProducts) return
    const filtered = []

    products.forEach((product, i) => {
        currentProducts.forEach(currentProduct => {
            if (product.id === currentProduct.id) {
              
                if (currentProduct.count !== product.count || currentProduct.archive !== product.archive) {
                    const {count, archive, id} = product
                    filtered.push({count, archive, id})
                }
            }
        })
    });
 
    return filtered
}

const StyledModal = styled(Modal)`
  .modal-dialog {
    @media (min-width: 576px) {
      max-width: 840px;
    }
  }
`

const StyledDropdown = styled.div`
  margin-right: 30px;
`;

const DropdownField = styled.div`
  width: 200px;
  padding: 7px;
  height: 40px;
  border: 1px solid #C4C4C4;
  border-radius: 5px 0 0 5px;
`;


const Flex = styled.div<{width?: string, margin?: string}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${({width}) => width || 'auto'};
  margin: ${({margin}) => margin || 0};
`;
