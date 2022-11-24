import {gql} from '@apollo/client'

export const GET_PRODUCTS = gql`
    query GetProducts($arab: Boolean) {
        products(arab: $arab) {
          id
          price
          count
          shortDescription
          longDescription
          title
          titleArab
          howToUseDescription
          shortDescriptionArab
          longDescriptionArab
          howToUseDescriptionArab
          countryOfOrigin
          volume
          photos {
            url
            public_id
          }
          photosArab {
            url
            public_id
          }
          isConsultation
          categoryId
          brandId
          archive
        }
    }
`
