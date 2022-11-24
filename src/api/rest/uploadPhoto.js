/* eslint-disable no-undef */

import Axios from 'axios'

const url = "https://api.cloudinary.com/v1_1/myskin";
const API_KEY = '183288748176349'

export const photo = {
    upload: async function (file) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'kqsl76cj')

        return Axios.post(url + `/image/upload`, formData)
            .then(({data}) => {
                return {url: data?.url, public_id: data?.public_id}
            })
    },
    destroy: async function (public_id, signature, timestamp) {
        const formData = new FormData()
        formData.append("api_key", API_KEY);
        formData.append('public_id', public_id)
        formData.append("signature", signature);
        formData.append("timestamp", timestamp);

        Axios.post(url + "/image/destroy", formData)
    },
    update: async function (file, public_id, signature, timestamp) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('overwrite ', true)
        formData.append("api_key", API_KEY);
        formData.append("public_id", public_id);
        formData.append("signature", signature);
        formData.append("timestamp", timestamp);
        
        return Axios.post(url + '/image/upload', formData)
            .then(({data}) => {
                return {url: data?.url, public_id: data?.public_id}
            })
    }
}