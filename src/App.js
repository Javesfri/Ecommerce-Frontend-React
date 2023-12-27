import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import NavbarSite from './components/NavBar/Navbar';
import { ProductsPage } from './pages/ProductsPage/ProductsPage.js';
import { HomePage } from './pages/HomePage/HomePage.js';
import { ProductPage } from './pages/ProductPage/ProductPage.js';
import { LoginPage } from './pages/Account/LoginPage/LoginPage.js';
import { RegisterPage } from './pages/Account/RegisterPage/RegisterPage.js';
import { CurrentPage } from './pages/Account/CurrentPage/CurrentPage.js';
import { CartPage } from './pages/CartPage/CartPage.js';
import { CheckoutPage } from './pages/CheckoutPage/CheckoutPage.js';
import { PaymentStatus } from './pages/PaymentStatusPage/PaymentStatus.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProvider } from './context/AppContext';
function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="App">
          <NavbarSite />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path='/products' element={<ProductsPage/>}/>
            <Route exact path='/product/:id' element={<ProductPage/>}></Route>
            <Route exact path='/account/login' element={<LoginPage/>}></Route>
            <Route exact path='/account/register' element={<RegisterPage/>}/>
            <Route exact path='/account/current' element={<CurrentPage/>}/>
            <Route exact path='/cart' element={<CartPage/>}/>
            <Route exact path='/checkout' element={<CheckoutPage/>}/>
            <Route exact path='/payment-status' element={<PaymentStatus/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
