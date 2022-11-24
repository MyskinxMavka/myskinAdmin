/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
//@ts-nocheck

import { CREATE_PRODUCT, UPDATE_PRODUCT } from '../api/mutation/product';
import { Dropdown, DropdownButton, InputGroup, ListGroup, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useMutation, useQuery } from "@apollo/client";

import Checkbox from "../components/common/checkbox/Checkbox";
import { CustomButton } from "../components/common";
import { GET_BRANDS } from '../api/query/brand';
import { GET_CATEGORIES } from '../api/query/category';
import { GET_PRODUCTS } from "../api/query/product";
import ImageUpload from "../components/uploadImage/upload";
import { LoadingSpinner } from "../components/spinner";
import TextArea from "../components/common/textArea/TextArea";
import { returnCategories } from "../utils/returnCategories";
import styled from 'styled-components';
import { toast } from 'react-toastify';

const DropDownComponent = ({ data, id, field, onActiveId, title }) => {
  const [active, setActive] = useState();
  
  const items = data?.map(item => {
    return (
      <Dropdown.Item 
        key={item.id}
        onClick={() => {
          setActive(item.title)
          onActiveId(item.id, field)
        }}
      >
        {item.title}
      </Dropdown.Item>
    )
  });

  useEffect(() => {
    const activeItem = data?.find(item => item.id === id);
    setActive(activeItem?.title);
  }, [data, id]);

  return (
    <StyledDropdown>
      <InputGroup className="mb-3">
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
}

export const ProductNew = () => {
  const params = useLocation()
  const [activeData, setActiveData] = useState(initialState);
  const [updateData, setUpdateData] = useState();
  const [currentDesc, setCurrentDesc] = useState();
  const navigate = useNavigate()
  const [isArab, setIsArab] = useState(false);
  
  const { data: dataBrand, loading: loadBrand } = useQuery(GET_BRANDS);
  const { data: dataCategories, loading: loadCategories } = useQuery(GET_CATEGORIES);
  const { data: dataProducts, refetch, loading: loadProducts } = useQuery(GET_PRODUCTS, {
      variables: {
        arab: isArab || false
      }
    }
  );

  useEffect(() => {
      if (params?.state?.id && dataProducts) {
        const filtered = dataProducts?.products?.filter(product => product.id === params?.state?.id)
        if (filtered?.length) {
          setUpdateData(filtered[0])
          setCurrentDesc({
            shortDescription: filtered[0].shortDescription,
            longDescription: filtered[0].longDescription,
            shortDescriptionArab: filtered[0].shortDescriptionArab,
            longDescriptionArab: filtered[0].longDescriptionArab,
            howToUseDescription: filtered[0].howToUseDescription,
            howToUseDescriptionArab: filtered[0].howToUseDescriptionArab,
          })
        }
      }
  }, [params, dataProducts]);

  const [createProduct, { loading: loadCreateProduct }] = useMutation(CREATE_PRODUCT, {
    refetchQueries: [
      GET_PRODUCTS, // DocumentNode object parsed with gql
      'GetProducts' // Query name
    ],
    onCompleted: () => {
      toast.success('Product created successfully');
      navigate('/main/product')
    },
    onError: (error) => {
      toast.error(`Error creating product! ${error}`);
    }
  });

  const [updateProduct, { loading: loadUpdateProduct}] = useMutation(UPDATE_PRODUCT, {
    refetchQueries: [
      GET_PRODUCTS, // DocumentNode object parsed with gql
      'GetProducts' // Query name
    ],
    onCompleted: () => {
      toast.success('Product updated successfully');
      navigate('/main/product')
    },
    onError: (error) => {
      toast.error(`Error updating product! ${error}`);
    }
  });


  const onSave = async () => {
    if (validate(activeData)) {
     createProduct({
        variables: {
          arab: isArab,
          fields: {
            price: +activeData.price,
            count: +activeData.count,
            volume: +activeData.volume,
            brandId: +activeData.brandId,
            categoryId: +activeData.categoryId,
            shortDescription: activeData.shortDescription,
            longDescription: activeData.longDescription,
            shortDescriptionArab: activeData.shortDescriptionArab,
            longDescriptionArab: activeData.longDescriptionArab,
            title: activeData.title,
            titleArab: activeData.titleArab,
            howToUseDescription: activeData.howToUseDescription,
            howToUseDescriptionArab: activeData.howToUseDescriptionArab,
            countryOfOrigin: activeData.countryOfOrigin,
            photos: activeData.photos,
            photosArab: activeData.photosArab,
            isConsultation: activeData.isConsultation
          }
        }
      })
    }
  };

  const onUpdateProduct = async () => {
    if (validate(updateData)) {
      updateProduct({
        variables: {
          id: +updateData.id,
          arab: isArab,
          fields: {
            price: +updateData.price,
            count: +updateData.count,
            volume: +updateData.volume,
            brandId: +updateData.brandId,
            categoryId: +updateData.categoryId,
            shortDescription: updateData.shortDescription,
            longDescription: updateData.longDescription,
            shortDescriptionArab: updateData.shortDescriptionArab,
            longDescriptionArab: updateData.longDescriptionArab,
            title: updateData.title,
            titleArab: updateData.titleArab,
            howToUseDescription: updateData.howToUseDescription,
            howToUseDescriptionArab: updateData.howToUseDescriptionArab,
            countryOfOrigin: updateData.countryOfOrigin,
            photos: updateData?.photos?.map((p) => ({url: p?.url, public_id: p?.public_id})),
            photosArab: updateData?.photosArab?.map((p, id) => ({url: p?.url, public_id: p?.public_id})),
            isConsultation: updateData.isConsultation
          }
        }
      })
    }
  };

  const getActiveId = (id, filed) => {
    if (updateData) {
      setUpdateData({ ...updateData, [filed]: id });
    } else {
      setActiveData({ ...activeData, [filed]: id });
    }
  };
  const getNewPhoto = (photo, id, isArab) => {
    if (isArab) {
      if (updateData) { 
        const photosArab = updateData.photosArab ? [...updateData.photosArab] : [];
        photosArab[id] = photo;
        setUpdateData({ ...updateData, photosArab });
      } else {
        const photosArab = [...activeData.photosArab];
        photosArab[id] = photo;
        setActiveData({ ...activeData, photosArab });
      }
    } else {
      if (updateData) {
        const photos = updateData.photos ? [...updateData.photos] : [];
        photos[id] = photo;
        setUpdateData({ ...updateData, photos });
      } else {
        const photos = [...activeData.photos];
        photos[id] = photo;
        setActiveData({ ...activeData, photos });
      }
    }
  };
  
  useEffect(() => {
    refetch();
  }, [isArab]);
  const activeComponent = () => {
    return (
      <>
        {(loadCreateProduct || loadBrand || loadCategories || loadProducts) && <LoadingSpinner />}
        <StyledActiveBlock>
          <div >
            <P>photo eng</P>
            <Flex width="60%">
              <ImageUpload image={activeData?.photos[0]} alt={'photos[0]'} getNewPhoto={(photo) => getNewPhoto(photo, 0)} />
              <ImageUpload image={activeData?.photos[1]} alt={'photos[1]'} getNewPhoto={(photo) => getNewPhoto(photo, 1)} />
              <ImageUpload image={activeData?.photos[2]} alt={'photos[2]'} getNewPhoto={(photo) => getNewPhoto(photo, 2)} />
            </Flex>
          </div>

          <div>
            <P>photo arabic</P>
            <Flex width="60%">
              <ImageUpload image={activeData?.photosArab[0]} alt={'photosArab[0]'} getNewPhoto={(photo) => getNewPhoto(photo, 0, true)} />
              <ImageUpload image={activeData?.photosArab[1]} alt={'photosArab[1]'} getNewPhoto={(photo) => getNewPhoto(photo, 1, true)} />
              <ImageUpload image={activeData?.photosArab[2]} alt={'photosArab[2]'} getNewPhoto={(photo) => getNewPhoto(photo, 2, true)} />
            </Flex>
          </div>

          <Flex>
            <div style={{width: '45%'}}>
              <P>title eng</P>
              <Input name='title' onChange={(e) => setActiveData({ ...activeData, [e.target.name]: e.target.value })} value={activeData.title || ''} />
            </div>

            <div style={{width: '45%'}}>
              <P>title arabic</P>
              <Input name='titleArab' onChange={(e) => setActiveData({ ...activeData, [e.target.name]: e.target.value })} value={activeData.titleArab || ''} />
            </div>
          </Flex>
          <Flex width="60%" margin="20px 0">
            <Checkbox
              title="Consultation"
              checked={activeData.isConsultation}
              id="Consultation"
              setChecked={(checked) => setActiveData({ ...activeData, isConsultation: checked })}
            />
            <Flex width="200px">
              <P margin="0 10px 0 0">price</P>
              <Input name='price' type='number' onChange={(e) => setActiveData({ ...activeData, [e.target.name]: +e.target.value })} value={activeData.price || ''} />
            </Flex>
            <Flex width="200px">
              <P margin="0 10px 0 0">Count</P>
              <Input name='count' type='number' onChange={(e) => setActiveData({ ...activeData, [e.target.name]: +e.target.value })} value={activeData.count || ''} />
            </Flex>
          </Flex>
          <Flex width="550px">
            <DropDownComponent title="brand" data={dataBrand?.brands} id={activeData.brandId} field={'brandId'} onActiveId={(id, filed) => getActiveId(id, filed)} />
            <DropDownComponent title="category" data={returnCategories(activeData, dataBrand?.brands, dataCategories?.categories)} field={'categoryId'} id={activeData.categoryId} onActiveId={(id, filed) => getActiveId(id, filed)} />
          </Flex>
          <Flex>
            <FlexColumn>
              <div>
                <P margin="20px 0 0 0">description</P>
                <TextArea onChange={(text) => setActiveData({ ...activeData, shortDescription: text })} value={''} />
               
                <P margin="20px 0 0 0">Long description</P>
                <TextArea onChange={(text) => setActiveData({ ...activeData, longDescription: text })} value={''} />
                
                <P margin="20px 0 0 0">How to use description</P>
                <TextArea onChange={(text) => setActiveData({ ...activeData, howToUseDescription: text })} value={''} />
               
              </div>
            </FlexColumn>
            <FlexColumn>
              <div >
                <P margin="20px 0 0 0">description arabic</P>
                <TextArea onChange={(text) => setActiveData({ ...activeData, shortDescriptionArab: text })} value={''} />
                
                <P margin="20px 0 0 0">Long description arabic</P>
                <TextArea onChange={(text) => setActiveData({ ...activeData, longDescriptionArab: text })} value={''} />
                
                <P margin="20px 0 0 0">How to use description arabic</P>
                <TextArea onChange={(text) => setActiveData({ ...activeData, howToUseDescriptionArab: text })} value={''} />
              </div>
            </FlexColumn>
          </Flex>
        </StyledActiveBlock>
      </>
    );
  };  

  const activeUpdateComponent = () => {
    return (
      <>
        {(loadBrand || loadUpdateProduct || loadProducts || loadCategories) && <LoadingSpinner />}
        <StyledActiveBlock>
          <div >
            <P>photo eng</P>
            <Flex width="50%" style={{gap: 30}}>
              <ImageUpload image={updateData?.photos ? updateData?.photos[0] : null} alt={'photos[0]'} getNewPhoto={(photo) => getNewPhoto(photo, 0)} />
              <ImageUpload image={updateData?.photos ? updateData?.photos[1] : null} alt={'photos[1]'} getNewPhoto={(photo) => getNewPhoto(photo, 1)} />
              <ImageUpload image={updateData?.photos ? updateData?.photos[2] : null} alt={'photos[2]'} getNewPhoto={(photo) => getNewPhoto(photo, 2)} />
            </Flex>
          </div>
          <div>
            <P margin="30px 0 0 0">photo arabic</P>
            <Flex width="50%" style={{gap: 30}}>
              <ImageUpload image={updateData?.photosArab ? updateData?.photosArab[0]: null} alt={'photosArab[0]'} getNewPhoto={(photo) => getNewPhoto(photo, 0, true)} />
              <ImageUpload image={updateData?.photosArab ? updateData?.photosArab[1]: null} alt={'photosArab[1]'} getNewPhoto={(photo) => getNewPhoto(photo, 1, true)} />
              <ImageUpload image={updateData?.photosArab ? updateData?.photosArab[2]: null} alt={'photosArab[2]'} getNewPhoto={(photo) => getNewPhoto(photo, 2, true)} />
            </Flex>
          </div>
          <Flex margin="30px 0 0 0">
            <div style={{width: '45%'}}>
              <P>title eng</P>
              <Input name='title' onChange={(e) => setUpdateData({ ...updateData, [e.target.name]: e.target.value })} value={updateData.title || ''} />
            </div>
            <div style={{width: '45%'}}>
              <P>title arabic</P>
              <Input name='titleArab' onChange={(e) => setUpdateData({ ...updateData, [e.target.name]: e.target.value })} value={updateData.titleArab || ''} />
            </div>
          </Flex>
          <Flex width="60%" margin="30px 0">
  
            <Checkbox
              title="Consultation edit"
              checked={updateData.isConsultation}
              id="Consultation edit"
              setChecked={(checked) => setUpdateData({ ...updateData, isConsultation: checked })}
            />
            <Flex width="200px">
              <P margin="0 10px 0 0">price</P>
              <Input name='price' type='number' onChange={(e) => setUpdateData({ ...updateData, [e.target.name]: +e.target.value })} value={updateData.price || ''} />
            </Flex>
            <Flex width="200px">
              <P margin="0 10px 0 0">Count</P>
              <Input name='count' type='number' onChange={(e) => setUpdateData({ ...updateData, [e.target.name]: +e.target.value })} value={updateData.count || ''} />
            </Flex>
          </Flex>
          <Flex width="550px">
            <DropDownComponent title="brand" data={dataBrand?.brands} id={updateData.brandId} field={'brandId'} onActiveId={(id, filed) => getActiveId(id, filed)} />
            <DropDownComponent title="category" data={returnCategories(updateData, dataBrand?.brands, dataCategories?.categories)} field={'categoryId'} id={updateData.categoryId} onActiveId={(id, filed) => getActiveId(id, filed)} />
          </Flex>
          <Flex margin="30px 0 0 0">
            <FlexColumn>
              <div>
                <P margin="20px 0 0 0">description</P>
                <TextArea onChange={(text) => setUpdateData({ ...updateData, shortDescription: text })} value={currentDesc?.shortDescription} />
                <P margin="20px 0 0 0">Long description</P>
                <TextArea onChange={(text) => setUpdateData({ ...updateData, longDescription: text })} value={currentDesc?.longDescription} />
                <P margin="20px 0 0 0">How to use description</P>
                <TextArea onChange={(text) => setUpdateData({ ...updateData, howToUseDescription: text })} value={currentDesc?.howToUseDescription} />
              </div>
            </FlexColumn>
            <FlexColumn>
              <div >
                <P margin="20px 0 0 0">description arabic</P>
                <TextArea onChange={(text) => setUpdateData({ ...updateData, shortDescriptionArab: text })} value={currentDesc?.shortDescriptionArab} />
                <P margin="20px 0 0 0">Long description arabic</P>
                <TextArea onChange={(text) => setUpdateData({ ...updateData, longDescriptionArab: text })} value={currentDesc?.longDescriptionArab} />
                <P margin="20px 0 0 0">How to use description arabic</P>
                <TextArea onChange={(text) => setUpdateData({ ...updateData, howToUseDescriptionArab: text })} value={currentDesc?.howToUseDescriptionArab} />
              </div>
            </FlexColumn>
          </Flex>
        </StyledActiveBlock>
      </>
    );
  };

  return (
    <div>
      {activeData && <CustomButton margin="20px 0 50px 0" onClick={() => updateData ? onUpdateProduct() : onSave()} disabled={false}>Save</CustomButton>}
      {updateData ? activeUpdateComponent() : activeComponent()}
    </div>
  )
};

const initialState = {
    id: null,
    title: '',
    titleArab: '',
    photos: [],
    photosArab: [],
    brandId: null,
    categoryId: null,
    price: '',
    count: '',
    countryOfOrigin: null,
    volume: null,
    isConsultation: false,
    shortDescription: '',
    longDescription: '',
    howToUseDescription: '',
    shortDescriptionArab: '',
    longDescriptionArab: '',
    howToUseDescriptionArab: ''
  }

const P = styled.p<{margin?: string}>`
  margin: ${({margin}) => margin || 0};
  font-weight: 500;
`

const Input = styled.input`
  border: 1px solid rgb(128 128 128 / 75%);
  border-radius: 3px;
  width: 100%;
`;


const StyledDropdown = styled.div`
  width: 250px;
`;

const DropdownField = styled.div`
  width: 200px;
  padding: 7px;
  height: 40px;
  border: 1px solid #C4C4C4;
  border-radius: 5px 0 0 5px;
`;

const StyledActiveBlock = styled.div`
  margin: -10px 0 0 10px;
  display: flex;
  flex-direction: column;
  padding: 0 50px 50px 0;
`;

const Flex = styled.div<{width?: string, margin?: string}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${({width}) => width || 'auto'};
  margin: ${({margin}) => margin || 0};
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

const validate = (values) => {
    if (!values.title && !values.titleArab) {
        toast.error(`Title required`);
        return false
    } 
    if (!values.price) {
        toast.error(`Price required`);
        return false
    } 
    if (!values.categoryId) {
        toast.error(`Category required`);
        return false
    }
    if (!values.brandId) {
        toast.error(`Brand required`);
        return false
    }

    return true
}