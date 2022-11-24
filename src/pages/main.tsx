import {
  Route,
  Routes,
} from 'react-router-dom';

import { Brand } from './brand';
import BrandNew from './brandNew';
import { Header } from '../components/header';
import { Order } from './order';
import { Product } from './product';
import { ProductNew } from './productNew';
import { Sidebar } from '../components/sidebar/sidebar';
import { Users } from './user';

export const Main = () => {
  return (
    <>
      <Sidebar />
      <Header>
        <Routes>
            <Route path="/product" element={<Product />} />
            <Route path="/brand" element={<Brand />} />
            <Route path="/order" element={<Order />} />
            <Route path="/users" element={<Users />} />
            <Route path="/product/new" element={<ProductNew />} />
            <Route path="/brand/new" element={<BrandNew />} />
        </Routes>
      </Header>
    </>
  )
}