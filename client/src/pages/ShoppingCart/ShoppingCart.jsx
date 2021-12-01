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
                  parseFloat(this.state.productList[j].price),
                ],
                image: [...prevState.image, this.state.productList[j].image],
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

  deleteItemFromCart = (e) => {
    e.preventDefault();
    this.state.shoppingCart.forEach((product, count) => {
      if (product === e.target.value) {
        this.setState({
          totalPrice: this.state.totalPrice - (localStorage.getItem(`${product}`) * this.state.price[count]).toFixed(2),
          totalQuantity: this.state.totalQuantity - localStorage.getItem(`${product}`),
        });
        this.state.shoppingCart.splice(count, 1);
        this.state.image.splice(count, 1);
        this.state.quantity.splice(count, 1);
        this.state.price.splice(count, 1);
        this.state.productList.splice(count, 1);
        localStorage.removeItem(`${e.target.value}`);
      }
    });
  };

  addItemQuantity = (e) => {
    e.preventDefault();
    let prevQuantity = parseInt(localStorage.getItem(`${e.target.value}`));
    prevQuantity++;
    localStorage.setItem(`${e.target.value}`, `${prevQuantity}`);

    this.state.shoppingCart.forEach((product, count) => {
      if (product === e.target.value) {
        this.setState({
          totalPrice: this.state.totalPrice + this.state.price[count],
          totalQuantity: this.state.totalQuantity + 1,
        });
      }
    });
  };

  reduceItemQuantity = (e) => {
    e.preventDefault();
    let prevQuantity = parseInt(localStorage.getItem(`${e.target.value}`));
    prevQuantity--;
    localStorage.setItem(`${e.target.value}`, `${prevQuantity}`);

    this.state.shoppingCart.forEach((product, count) => {
      if (product === e.target.value) {
        this.setState({
          totalPrice: this.state.totalPrice - this.state.price[count],
          totalQuantity: this.state.totalQuantity - 1,
        });
      }
    });
  };
  
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

          {this.state.shoppingCart.map((product, count) => (
            <div key={product} className="Cart-Items">
              <div className="image-box">
                <img
                  className="image-height"
                  src={`${this.state.image[count]}`}
                  alt="product"
                />
              </div>
              <div className="about">
                <h1 className="title">{product}</h1>
              </div>
              <div className="counter">
                <button
                  className="btn"
                  onClick={this.reduceItemQuantity}
                  value={product}
                >
                  -
                </button>
                <div className="count">{localStorage.getItem(`${product}`)}</div>
                <button
                  className="btn"
                  onClick={this.addItemQuantity}
                  value={product}
                >
                  +
                </button>
              </div>
              <div className="prices">
                <div className="amount">${ (localStorage.getItem(`${product}`) * this.state.price[count]).toFixed(2)}</div>
                <button
                  className="remove"
                  onClick={this.deleteItemFromCart}
                  value={product}
                >
                  Remove
                </button>
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
              <div className="total-amount">
                $
                {this.state.totalPrice
                  ? `${this.state.totalPrice.toFixed(2)}`
                  : 0.0}
              </div>
            </div>
            <button className="button">Checkout</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
