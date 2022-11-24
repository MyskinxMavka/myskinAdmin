import {gql} from '@apollo/client'

export const UPDATE_BRAND = gql`
    mutation updateBrand($id: ID!, $fields: BrandInput!) {
      updateBrand(id: $id, fields: $fields) {
          id
          title
          photo {
            url
            public_id
          }
          archive
          description
        }
    }
`

export const MULTI_UPDATE_BRAND = gql`
    mutation multiUpdateBrand($fields: [BrandInput]!) {
      multiUpdateBrand(fields: $fields) {
          id
          title
          photo {
            url
            public_id
          }
          archive
          description
        }
    }
`

export const DELETE_BRAND = gql`
    mutation deleteBrand($id: ID!) {
      deleteBrand(id: $id) {
          id
          title
          photo {
            url
            public_id
          }
          archive
          description
        }
    }
`

export const CREATE_BRAND = gql`
    mutation createBrand($fields: BrandInput!) {
      createBrand(fields: $fields) {
          id
          title
          photo {
            url
            public_id
          }
          archive
          description
        }
    }
`