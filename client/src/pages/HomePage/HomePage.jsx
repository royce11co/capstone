import "./HomePage.scss";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";

class ProductList extends React.Component {
  state = {
    products: [],
  };

  componentDidMount() {
    axios.get("http://localhost:8080/products").then((response) => {
      this.setState({ products: response.data});
    });
  }

  render() {
    return (
      <div className="home">
        <h1 class="home__title">Home Page</h1>
        <div className="home__container">
          {this.state.products.map((products) => (
            <Link key={products.id} className="home__card--link" to={`/products/${products.id}`}>
              <img
                className="home__card--image"
                src={`${products.image}`}
                alt="product"
              />
              <h2 key="{item}" className="home__card--title">{products.name}</h2>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default ProductList;
