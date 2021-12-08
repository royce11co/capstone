import "./ProductPage.scss";
import axios from "axios";
import React from "react";
import { Component } from "react";

class ProductPage extends Component {
  state = {
    description: "",
    name: "",
    quantity: "",
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
      <>
        <img
          className="product-page__container--image"
          src={`${this.state.image}`}
          alt="product"
        />
        <div className="product-page__container">
          <p className="product-page__container--description">
            Product Description: {this.state.description}
          </p>
          <p className="product-page__container--price">
            Price: ${this.state.price}
          </p>
          <p className="product-page__container--stock">
            Stock: {this.state.quantity}
          </p>
          <div>
            <form action="#" onSubmit={this.addToCart}>
              <label
                className="product-page__container--quantity"
                htmlFor="quantity"
              >
                Quantity
              </label>
              <input
                className="product-page__container--input"
                type="number"
                id="quantity"
                name={this.state.name}
                min="0"
                max="99"
              />
              <button className="product-page__container--button" type="submit">
                Add to cart
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default ProductPage;
