import { Route, Routes } from 'react-router-dom';

import { Home } from '../pages/Home';
import { SendOrder} from '@/pages/SendOrder';
import { DisplayOrders } from '@/pages/DisplayOrder';

export function Router() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/send-order" element={<SendOrder/>} />
        <Route path="/display-orders" element={<DisplayOrders/>} />
    </Routes>
  );
}
