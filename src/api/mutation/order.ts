import {gql} from '@apollo/client'

export const UPDATE_STATUS = gql`
    mutation updateStatus($id: ID!, $status: String!) {
      updateStatus(id: $id, status: $status) {
          id
        }
    }
`
