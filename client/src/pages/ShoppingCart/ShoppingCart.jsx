import React from "react";
import axios from "axios";
import "./ShoppingCart.scss";

class ShoppingCart extends React.Component {
  state = {
    productNameArray: [],
    productList: [],
    shoppingCart: [],
    quantity: [],
    image: [],
    price: [],
    totalPrice: null,
    totalQuantity: null,
    quantityPrice: [],
    isLoading: true,
  };

  componentDidMount() {
    for (var i = 0; i < localStorage.length; i++) {
      this.state.productNameArray.push(localStorage.key(i));
    }
    axios
      .get(`http://localhost:8080/products/`)
      .then((response) => {
        this.setState({ productList: response.data });
        for (let i = 0; i < this.state.productNameArray.length; i++) {
          for (let j = 0; j < this.state.productList.length; j++) {
            if (
              this.state.productNameArray[i] === this.state.productList[j].name
            ) {
              this.state.shoppingCart.push(this.state.productList[j].name);
              this.setState((prevState) => ({
                quantity: [
                  ...prevState.quantity,
                  parseInt(
                    localStorage.getItem(`${this.state.productList[j].name}`)
                  ),
                ],
                totalQuantity:
                  prevState.totalQuantity +
                  parseInt(
                    localStorage.getItem(`${this.state.productList[j].name}`)
                  ),
                price: [
                  ...prevState.price,
                  parseInt(this.state.productList[j].price),
                ],
                image: [...prevState.image, this.state.productList[j].image],
                quantityPrice: [
                  ...prevState.quantityPrice,
                  (
                    parseInt(
                      localStorage.getItem(`${this.state.productList[j].name}`)
                    ) * this.state.productList[j].price
                  ).toFixed(2),
                ],
                totalPrice:
                  Number(prevState.totalPrice) +
                  localStorage.getItem(`${this.state.productList[j].name}`) *
                    this.state.productList[j].price,
              }));
            }
          }
        }
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    let isLoading = this.state.isLoading;
    if (isLoading) {
      return <div className="Loading">Loading...</div>;
    }
    return (
      <div className="body-container">
        <div className="CartContainer">
          <div className="Header">
            <h3 className="Heading">Shopping Cart</h3>
            <h5 className="Action">Remove all</h5>
          </div>

          {this.state.shoppingCart.map((products, count) => (
            <div className="Cart-Items">
              <div className="image-box">
                <img
                  className="image-height"
                  src={`http://localhost:8080/images/${this.state.image[count]}`}
                  alt="product"
                />
              </div>
              <div className="about">
                <h1 className="title">{products}</h1>
              </div>
              <div className="counter">
                <div className="btn">+</div>
                <div className="count">{this.state.quantity[count]}</div>
                <div className="btn">-</div>
              </div>
              <div className="prices">
                <div className="amount">${this.state.quantityPrice[count]}</div>
                <div className="remove">
                  <u>Remove</u>
                </div>
              </div>
            </div>
          ))}

          <hr />

          <div className="checkout">
            <div className="total">
              <div>
                <div className="Subtotal">Sub-Total</div>
                <div className="items">{this.state.totalQuantity} items</div>
              </div>
              <div className="total-amount">${this.state.totalPrice.toFixed(2)}</div>
            </div>
            <button className="button">Checkout</button>
          </div>
        </div>
      </div>

      // <div>
      //   {this.state.shoppingCart.map((products, count) => (
      //     <p key={products}>
      //       Product Name: {products} Quantity: {this.state.quantity[count]}{" "}
      //       Price: ${this.state.quantityPrice[count]}
      //       <img
      //         src={`http://localhost:8080/images/${this.state.image[count]}`}
      //         alt="product"
      //       />
      //     </p>
      //   ))}
      // </div>
    );
  }
}

export default ShoppingCart;
