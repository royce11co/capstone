import Header from "./components/Header/Header";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import './App.scss';
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/cart' exact component={ShoppingCart}/>
        <Route path='/products/:id' exact component={ProductPage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
