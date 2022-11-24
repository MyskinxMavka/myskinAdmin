/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

import {utils, writeFile} from 'xlsx';

import { CustomButton } from '../common';
import React from 'react'

const ExportReactCSV = ({users}) => {

  const exportToExcel = () => {
    const sheet = users?.map(user => ({
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phoneNumber,
      address: user.address,
      'favorite professional skincare brands/products': user?.favorites?.skincare, 
      'favorite brands/products that the customer would like to buy from us': user?.favorites?.wouldLikeToBuy, 
    })).slice().sort((a,b) => {
      if (Number(a.id)> Number(b.id)) {
        return 1
      } else {
        return -1
      }
    })
    
    const wb = utils.book_new()
    const ws = utils.json_to_sheet(sheet)
    utils.book_append_sheet(wb,ws, "Mysheet1")

    writeFile(wb, "Customers.xlsx")
  }

  return (
    <CustomButton margin="0" onClick={() => exportToExcel()}>
      export to excel
    </CustomButton>
  )
};

export default ExportReactCSV