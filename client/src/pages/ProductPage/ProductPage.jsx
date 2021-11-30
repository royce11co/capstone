import "./ProductPage.scss";
import axios from "axios";
import React from "react";
import { Component } from "react";
import { Redirect } from "react-router-dom";

class ProductPage extends Component {
  state = {
    description: "",
    name: "",
    quantity: "",
    status: "",
    image: "",
    price: "",
    isLoading: true,
  };

  componentDidMount() {
    axios
      .get(`http://localhost:8080/products/${this.props.match.params.id}`)
      .then(({ data }) => {
        this.setState({
          description: data.description,
          name: data.name,
          quantity: data.quantity,
          status: data.status.toUpperCase(),
          price: data.price,
          isLoading: false,
          image: data.image,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addToCart(e) {
    e.preventDefault();
    localStorage.setItem(`${e.target[0].name}`, `${e.target[0].value}`);
    alert("Added to cart");
    e.target.reset();
  }

  render() {
    let isLoading = this.state.isLoading;
    if (isLoading) {
      return <div className="Loading">Loading...</div>;
    }
    return (
      <div>
        <img
          src={`http://localhost:8080/images/${this.state.image}`}
          alt="product"
        />
        <p>Product Description: {this.state.description}</p>
        <p>Price: ${this.state.price}</p>
        <p>Stock: {this.state.quantity}</p>
        <div>
          <form action="#" onSubmit={this.addToCart}>
            <label htmlFor="quantity">Quantity</label>
            <input type="number" id="quantity" name={this.state.name} min="0" max="99" />
            <button type="submit">Add to cart</button>
          </form>
        </div>
      </div>
    );
  }
}

export default ProductPage;
