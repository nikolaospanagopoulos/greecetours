import Header from "./components/Header.js/Header";
import { BrowserRouter as Router,Route } from "react-router-dom";
import Footer from "./components/Footer.js/Footer";
import ProductsPage from "./Pages/ProductsPage/ProductsPage";
import TourPage from './Pages/TourPage/TourPage';
import CartPage from './Pages/CartPage/CartPage'
import LoginPage from './Pages/LoginPage/LoginPage'
import HomePage from './Pages/HomePage/HomePage.jsx'
import RegisterPage from './Pages/RegisterPage/registerPage'
import TourBuyPage from './Pages/TourBuyPage/TourBuyPage'
import FinalizePage from './Pages/FinalizePage/FinalizePage'
import ProfileScreen from './Pages/ProfilePage/ProfilePage'
import PaymentScreen from './Pages/PaymentScreen/PaymentScreen'
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <main>
      <Route path='/finalize'  component={FinalizePage}/>
      <Route path='/tourbuy'  component={TourBuyPage}/>
      <Route path='/login'  component={LoginPage}/>
      <Route path='/payment'  component={PaymentScreen}/>
      <Route path='/register'  component={RegisterPage}/>
      <Route path='/profile'  component={ProfileScreen}/>
      <Route path='/cart/:id?'  component={CartPage}/>
      <Route path='/tours/tour/:id'  component={TourPage}/> 
      <Route path='/tours/:sort?' exact  component={ProductsPage}/>
      <Route path='/' exact component={HomePage}/>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
