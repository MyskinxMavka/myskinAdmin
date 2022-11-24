import { gql } from '@apollo/client';

export const GET_ORDERS = gql`
    query GetOrders {
      orders {
        id
        date
        
        status
        delivery
        isContactlessDelivery
        timeSlot

        products {
          id
          order
          productId
          quantity
          price
          product {
            id
            price
            count
            shortDescription
            longDescription
            title
            howToUseDescription
            countryOfOrigin
            volume
            photos {
              url
            }
            isConsultation
            categoryId
            brandId
          }
        }
        totalPrice
        payment
        paymentId
        userName
        userSurname
        userContact
        userPhone
        userAddress
        userId
        user {
          name
          surname
          phoneNumber
          email
          address
        }
      }
    }
`;

