import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dessert } from './pages/Dessert';
import { Sandwich } from './pages/Sandwich';
import { MenuDetail } from './pages/MenuDetail';
import { OrderForm } from './pages/OrderForm';
import { OrderConfirmation } from './pages/OrderConfirmation';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dessert />} />
          <Route path="/dessert" element={<Dessert />} />
          <Route path="/sandwich" element={<Sandwich />} />
          <Route path="/menu/:id" element={<MenuDetail />} />
          <Route path="/order-form" element={<OrderForm />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
