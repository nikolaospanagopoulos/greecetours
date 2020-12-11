import Header from "./components/Header.js/Header";
import { BrowserRouter as Router,Route } from "react-router-dom";
import Footer from "./components/Footer.js/Footer";
import ProductsPage from "./Pages/ProductsPage/ProductsPage";
import TourPage from './Pages/TourPage/TourPage';
import HomePage from './Pages/HomePage/HomePage.jsx'
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <main>
      <Route path='/tours/tour/:id'  component={TourPage}/>
      <Route path='/tours'  exact component={ProductsPage}/>
      <Route path='/' exact component={HomePage}/>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
