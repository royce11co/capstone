import Header from "./components/Header/Header";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import './App.scss';
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import AddProduct from "./pages/AddProduct/AddProduct";
import EditProductList from "./pages/EditProductList/EditProductList"
import EditProduct from "./pages/EditProduct/EditProduct";
import Checkout from "./pages/Checkout/Checkout"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/cart' exact component={ShoppingCart}/>
        <Route path='/products/add' exact component={AddProduct}/>
        <Route path='/products/edit' exact component={EditProductList}/>
        <Route path='/products/edit/:id' exact component={EditProduct}/>
        <Route path='/products/:id' exact component={ProductPage}/>
        <Route path='/checkout' exact component={Checkout}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
