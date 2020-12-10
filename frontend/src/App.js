import Header from "./components/Header.js/Header";
import { BrowserRouter as Router,Route } from "react-router-dom";
import Footer from "./components/Footer.js/Footer";
import ProductsPage from "./Pages/ProductsPage/ProductsPage";
import TourPage from './Pages/TourPage/TourPage';
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <main>
      <Route path='/tour/:id'  component={TourPage}/>
      <Route path='/' exact component={ProductsPage}/>
         
      </main>
      <Footer />
    </Router>
  );
}

export default App;
