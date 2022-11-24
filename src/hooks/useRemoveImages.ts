import React from 'react'
import { SIGNATURE } from './../api/mutation/cloudinary';
import { photo } from './../api/rest/uploadPhoto';
import { useMutation } from '@apollo/client';

interface photos {
    url: string
    public_id: string
}

export const useRemoveImages = () => {
    const [createSignature, {data, loading}] = useMutation(SIGNATURE)

    const removeImages = async (photoEng: photos[], photoArab: photos[]) => {

        if (photoEng && photoEng.length) {
        
            photoEng.map(async (p) => {
                const {data} = await createSignature({variables: {public_id: p.public_id}})
       
                if (data?.createSignature) {
                    await photo.destroy(p.public_id, data?.createSignature.signature, data?.createSignature?.timestamp)
                }
            })

        }

        if (photoArab && photoArab.length) {
            
            photoArab.map(async (p) => {
                const {data} = await createSignature({variables: {public_id: p.public_id}})
       
                if (data?.createSignature) {
                    await photo.destroy(p.public_id, data?.createSignature.signature, data?.createSignature?.timestamp)
                }
            })
        }
    }

    return removeImages
}
