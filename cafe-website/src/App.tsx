import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Menu } from './pages/Menu';
import { GroupOrder } from './pages/GroupOrder';
import { OrderHistory } from './pages/OrderHistory';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Menu />} />
          <Route path="group-order" element={<GroupOrder />} />
          <Route path="order-history" element={<OrderHistory />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
