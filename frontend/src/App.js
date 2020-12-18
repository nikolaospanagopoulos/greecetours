import Header from "./components/Header.js/Header";
import { BrowserRouter as Router,Route } from "react-router-dom";
import Footer from "./components/Footer.js/Footer";
import ProductsPage from "./Pages/ProductsPage/ProductsPage";
import TourPage from './Pages/TourPage/TourPage';
import CartPage from './Pages/CartPage/CartPage'
import LoginPage from './Pages/LoginPage/LoginPage'
import HomePage from './Pages/HomePage/HomePage.jsx'
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <main>
      <Route path='/login'  component={LoginPage}/>
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
