import {gql} from '@apollo/client'

export const GET_BRANDS = gql`
    query GetBrands {
        brands {
          id
          title
          photo {
            url
            public_id
          }
          archive
          description
          descriptionArab
          active
          order
          categories {
            title
            id
          }
        }
    }
`

export const GET_BRAND = gql`
    query GetBrand($id: ID!) {
        brand(id: $id) {
          id
          title
          photo {
            url
            public_id
          }
          archive
          description
          active
          order
          categories {
            title
            id
          }
        }
    }
`