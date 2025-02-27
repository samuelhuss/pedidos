import { Route, Routes } from 'react-router-dom';

import { Home } from '../pages/Home';
import { SendOrder} from '@/pages/SendOrder';
import { DisplayOrders } from '@/pages/DisplayOrder';
import { Scoreboard } from '@/pages/Scoreboard';
import { ScoreboardDisplay } from '@/pages/ScoreboardDisplay';

export function Router() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/send-order" element={<SendOrder/>} />
        <Route path="/display-orders" element={<DisplayOrders/>} />
        <Route path="/control-timer" element={<Scoreboard />} />
        <Route path="/scoreboard" element={<ScoreboardDisplay />} />

    </Routes>
  );
}
