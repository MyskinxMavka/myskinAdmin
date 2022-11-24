/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
//@ts-nocheck

import { CREATE_BRAND, UPDATE_BRAND } from '../api/mutation/brand';
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { CustomButton } from "../components/common";
import { GET_BRANDS } from '../api/query/brand';
import { GET_CATEGORIES } from '../api/query/category';
import ImageUpload from "../components/uploadImage/upload";
import { LoadingSpinner } from "../components/spinner";
import React from 'react'
import Select from 'react-select';
import TextArea from "../components/common/textArea/TextArea";
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useLocation } from "react-router";

const changeFileds = (data: any[]) => {
    if(!data) return
    return data.map(category => ({label: category.title, value: category.id}))
}

const convertFileds = (data: any[]) => {
    if(!data) return
    return data.map(category => ({title: category.label, id: category.value}))
}
const DropDownComponent = ({ data, onChange, defaultValue }) => {
  
  const [selected, setSelected] = useState();

  const handleChange = (value: any) => {
    setSelected(value)
    onChange(convertFileds(value))
  }

  useEffect(() => {
    if (defaultValue) {
      setSelected(changeFileds(defaultValue))
    }
  },[defaultValue])

 
  return (
    <StyledDropdown>
      <Select
          isMulti
          placeholder='multiselect categories'
          onChange={handleChange}
          value={selected}
          options={changeFileds(data)}
        />
    </StyledDropdown>
  )
}

const BrandNew = () => {
  const params = useLocation()
  const [activeData, setActiveData] = useState({
    id: null,
    title: '',
    photo: '',
    description: '',
    descriptionArab: '',
    categories: []
  });
  const [updateData, setUpdateData] = useState();
  const [currentDesc, setCurrentDesc] = useState();
  const { data: dataCategories, loading: loadCategories } = useQuery(GET_CATEGORIES);
  const { data: dataBrand, loading: loadBrand } = useQuery(GET_BRANDS);
  
  useEffect(() => {
    if (params?.state?.brandId && dataBrand) {
      const filtered = dataBrand?.brands?.filter(brand => brand.id === params?.state?.brandId)
      if (filtered?.length) {
        setUpdateData(filtered[0])
        setCurrentDesc({
          description: filtered[0]?.description,
          descriptionArab: filtered[0]?.descriptionArab
        })
      }
    }
  }, [params, dataBrand]);

  const [updateBrand, { loading: loadUpdateBrand }] = useMutation(UPDATE_BRAND, {
        refetchQueries: [
            GET_BRANDS, // DocumentNode object parsed with gql
            'GetBrands' // Query name
        ],
        onCompleted: () => {
            toast.success('Brand updated successfully');
          },
          onError: (error) => {
            toast.error(`Error updating brand! ${error}`);
          }
  });

  const [createBrand, { loadingCreateBrand }] = useMutation(CREATE_BRAND, {
        refetchQueries: [
            GET_BRANDS, // DocumentNode object parsed with gql
            'GetBrands' // Query name
        ],
        onCompleted: () => {
            toast.success('Brand created successfully');
          },
          onError: (error) => {
            toast.error(`Error creating brand! ${error}`);
          }
    });

  const onSave = () => {
    if (validate(activeData)) {
      createBrand({
        variables: {
          fields: {
            title: activeData.title,
            photo: activeData.photo,
            description: activeData.description,
            descriptionArab: activeData.descriptionArab,
            order: getNextOrder(dataBrand.brands),
            categories: activeData.categories
          }
        },
      });
    }
  };
 
  const onUpdateBrand = () => {
    if (validate(updateData)) {
      updateBrand({ variables: { 
        id: updateData.id,
        fields: {
          title: updateData.title,
          photo: {url: updateData.photo?.url, public_id: updateData.photo?.public_id},
          description: updateData.description,
          descriptionArab: updateData.descriptionArab,
          categories: updateData.categories.map(cat => ({title: cat.title, id: cat.id}))
        }
      }});
    }
  };
  
  const getActiveCategories = (value) => {
    if (updateData) {
      setUpdateData({ ...updateData, categories: value });
    } else {
      setActiveData({ ...activeData, categories: value });
    }
  };

  const getNewPhoto = (photo) => {
    if (updateData) {
      setUpdateData({ ...updateData, photo });
    } else {
      setActiveData({ ...activeData, photo });
    }
  };
  const activeComponent = () => {
    return (
      <>
        {(loadingCreateBrand || loadBrand || loadCategories) && <LoadingSpinner />}
        <StyledActiveBlock>
        <div style={{width: '220px'}}>
          <P>Title</P>
          <Input name='title' onChange={(e) => setActiveData({ ...activeData, [e.target.name]: e.target.value })} value={activeData.title} />
        </div>

          <P margin="20px 0 0 0">photo</P>
          <ImageUpload image={activeData?.photo} brand={true} alt={'photo'} getNewPhoto={(photo, alt) => getNewPhoto(photo)} />
          <Flex>
            <div style={{width: '45%'}}>
              <P>description</P>
              <TextArea onChange={(text) => setActiveData({ ...activeData, description: text })} value={''} />
            </div>
            <div style={{width: '45%'}}>
              <P>description arabic</P>
              <TextArea width="45%" onChange={(text) => setActiveData({ ...activeData, descriptionArab: text })} value={''} />
            </div>
          </Flex>
          
          <Flex width="220px">
            <DropDownComponent 
              data={dataCategories?.categories} 
              onChange={(value) => getActiveCategories(value)} 
            />
          </Flex>
        </StyledActiveBlock>
      </>
    );
  };
  const activeUpdateComponent = () => {
    return (
      <>
        {(loadUpdateBrand || loadBrand || loadCategories) && <LoadingSpinner />}
        <StyledActiveBlock>
          <div style={{width: '220px'}}>
            <P>Title</P>
            <Input name='title' onChange={(e) => setUpdateData({ ...updateData, [e.target.name]: e.target.value })} value={updateData.title} />
          </div>
       
          <P margin="20px 0 0 0">photo</P>
          <ImageUpload image={updateData?.photo} brand={true} alt={'photo'} getNewPhoto={(photo, alt) => getNewPhoto(photo)} />
              
          <Flex>
            <div style={{width: '45%'}}>
              <P>description</P>
              <TextArea onChange={(text) => setUpdateData({ ...updateData, description: text })} value={currentDesc.description} />
            </div>
            <div style={{width: '45%'}}>
              <P>description arabic</P>
              <TextArea onChange={(text) => setUpdateData({ ...updateData, descriptionArab: text })} value={currentDesc.descriptionArab} />
            </div>
          </Flex>
          
          <Flex width="220px">
            <DropDownComponent 
              data={dataCategories?.categories}
              defaultValue={updateData?.categories}
              onChange={(value) => getActiveCategories(value)} 
            />
          </Flex>
        </StyledActiveBlock>
      </>
    );
  };

  return (
    <div>
      {activeData && <CustomButton margin="20px 0 50px 0" onClick={() => updateData ? onUpdateBrand() : onSave()} disabled={false}>Save</CustomButton>}
      {updateData ? activeUpdateComponent() : activeComponent()}
    </div>
  )
};

export default BrandNew;

const getNextOrder = (brands: any[]) => {
  const res = brands.reduce(function (p, v) {
    return ( p.order > v.order ? p : v );
  })

  return res.order + 1
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
  margin-top: 30px;
  width: 250px;
  padding-bottom: 50px;

  .css-1okebmr-indicatorSeparator {
    background: transparent
  }
  .css-tlfecz-indicatorContainer, .css-1gtu0rj-indicatorContainer  {
    color: #6c757d;
    border: 1px solid #6c757d;
    height: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
      color: #fff;
      background-color: #6c757d;
      border-color: #6c757d
    }
  }
`;


const StyledActiveBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 50px 50px 0;
`;

const Flex = styled.div<{width?: string, margin?: string}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: ${({width}) => width || 'auto'};
  margin: ${({margin}) => margin || 0};
`;


const validate = (values) => {
    if (!values.title && !values.titleArab) {
        toast.error(`Title required`);
        return false
    } 
    if (!values.photo && !values.photoArab) {
        toast.error(`Photo required`);
        return false
    } 
    if (!values.categories?.length > 0) {
        toast.error(`Category required`);
        return false
    }
    return true
}