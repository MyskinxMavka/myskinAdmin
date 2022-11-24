/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

import {Img, StyledFileBase64} from './styles'
import React, {useState} from 'react'

import { SIGNATURE } from '../../api/mutation/cloudinary';
import { photo } from '../../api/rest/uploadPhoto';
import { useMutation } from '@apollo/client';

const ImageUpload = ({image, alt, getNewPhoto, brand = false}: any) => {
  const [isClick, setIsClick] = useState(false);
  const [createSignature, {data, loading}] = useMutation(SIGNATURE)

    const handler = async (file: any) => {
   
        if (file) {
            const res = await photo.upload(file)
            
            if (res) {
                getNewPhoto(res)
                setIsClick(false)
            }
        }
    }

  const updateHandler = async (file: any) => {

    if (file) {
        const {data} = await createSignature({variables: {public_id: image.public_id}})
       
        if (data?.createSignature) {
            const res = await photo.update(file, image.public_id, data?.createSignature.signature, data?.createSignature?.timestamp)

            if (res) {
                getNewPhoto(res)
                setIsClick(false)
            }
        }
    }
  }

  return (
      image ? (
      isClick ? 
        <StyledFileBase64>
          <input type="file" onChange={(e) => updateHandler(e?.target?.files[0])}/>
        </StyledFileBase64>
        :
        <Img width={brand ? '200px' : '140px'} fit={brand ? 'contain' : 'cover'} onClick={() => setIsClick(prev => !prev)} src={image?.url} alt={alt} />
    ) : 
      <StyledFileBase64>
        <input type="file" onChange={(e) => handler(e.target.files[0])}/>
      </StyledFileBase64>
  )
}

export default ImageUpload