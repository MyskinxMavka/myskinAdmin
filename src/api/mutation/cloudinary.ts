import {gql} from '@apollo/client'

export const SIGNATURE = gql`
    mutation CreateSignature($public_id: String) {
      createSignature(public_id: $public_id) {
            timestamp
            signature
        }
    }
`