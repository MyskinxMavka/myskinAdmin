/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
//@ts-nocheck

import { CREATE_BRAND, DELETE_BRAND, MULTI_UPDATE_BRAND } from '../api/mutation/brand';
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import BrandTable from "../components/table/BrandTable";
import { Button } from "react-bootstrap";
import { CustomButton } from '../components/common';
import FileBase64 from "react-file-base64";
import { GET_BRANDS } from '../api/query/brand';
import { LoadingSpinner } from "../components/spinner";
import { toast } from 'react-toastify';
import { useLoading } from "../context/LoadingContext";
import { useNavigate } from 'react-router';

const BrandNew = ({ onClose }: { onClose: () => void }) => {
    const [image, setImage] = useState();
    const [value, setValue] = useState();

    const [createBrand, { loading }] = useMutation(CREATE_BRAND, {
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

    const handleCreateBrand = () => {
        createBrand({
            variables: {
                fields: {
                    title: value,
                    photo: image,
                }
            },
        });
        onClose();
    };

    return (
        <>
            {loading && <LoadingSpinner />}
            <p>Title brand</p>
            <input value={value} onChange={(e) => setValue(e.target.value)}/>
            <p>Photo brand</p>
            <FileBase64 
                type="file"
                multiple={false}
                onDone={(e) => {
                    setImage(e.base64);
                }}
            />
            <br />
            <br />
            <Button variant="success" onClick={() => handleCreateBrand()}>Save</Button>
            <br />
            <br />
        </>
    )
}

export const Brand = () => {
    const navigate = useNavigate()
    const { data, loading: loadBrand } = useQuery(GET_BRANDS);

    const [multiUpdateBrand, { loading: loadUpdateBrand }] = useMutation(MULTI_UPDATE_BRAND, {
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

    const [deleteBrand, { loading: loadDeleteBrand }] = useMutation(DELETE_BRAND, {
        refetchQueries: [
            GET_BRANDS, // DocumentNode object parsed with gql
            'GetBrands' // Query name
        ],
        onCompleted: () => {
            toast.success('Brand deleted successfully');
          },
          onError: (error) => {
            toast.error(`Error deleting brand! ${error}`);
          }
    });

    const [isNew, setIsNew] = useState(false);
    const [activeData, setActiveData] = useState();
    const { setLoading } = useLoading();

    useEffect(() => {
        loadBrand ? setLoading(loadBrand) : setLoading(false);
    }, [loadBrand])

    useEffect(() => {
        if (data) {
            setActiveData(data?.brands)
        }
    }, [data])

    const onSave = () => {
        const updateBrands = filterUpdatedBrand(activeData, data?.brands)
        if (updateBrands?.length) {
            multiUpdateBrand({ variables: {
                fields: updateBrands
            }});
        }
    };
   
    return (
        <div>
            {(loadUpdateBrand || loadDeleteBrand || loadBrand) && <LoadingSpinner />}
            {!isNew && <CustomButton onClick={() => navigate('/main/brand/new')}>New</CustomButton>}
            {isNew && <BrandNew onClose={() => setIsNew(prev => !prev)}/>}
            <CustomButton margin="0 0 0 30px" onClick={onSave}>Save</CustomButton>
            <BrandTable brands={activeData} setActiveData={setActiveData} deleteBrand={(id) => deleteBrand({ variables: { id } })}/>
        </div>
    )
}

const fieldsForUpdate = (brands: any[]) => {
    if (!brands) return
    return brands.map(brand => ({active: brand.active,
                    order: brand.order,
                    archive: brand.archive,
                    id: brand.id
                }))
}

const filterUpdatedBrand = (brands: any[], currentBrands: any[]) => {
    if (!brands || !currentBrands) return
    const filtered = []

    brands.forEach((brand, i) => {
        currentBrands.forEach(currentBrand => {
            if (brand.id === currentBrand.id) {
              
                if (currentBrand.order !== brand.order || currentBrand.archive !== brand.archive || currentBrand.active !== brand.active) {
                    filtered.push(brand)
                }
            }
        })
    });
 
    return fieldsForUpdate(filtered)
}