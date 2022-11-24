import {gql} from '@apollo/client'

export const UPDATE_PRODUCT = gql`
    mutation updateProduct($id: ID!, $fields: ProductInput, $arab: Boolean!) {
      updateProduct(id: $id, fields: $fields, arab: $arab) {
          id
        }
    }
`

export const MULTI_UPDATE_PRODUCT = gql`
    mutation multiUpdateProduct($fields: [ProductInput]!) {
      multiUpdateProduct(fields: $fields) {
          id
        }
    }
`

export const DELETE_PRODUCT = gql`
    mutation deleteProduct($id: ID!) {
      deleteProduct(id: $id) {
          id
        }
    }
`

export const CREATE_PRODUCT = gql`
    mutation createProduct($fields: ProductInput!) {
      createProduct(fields: $fields) {
          id
        }
    }
`