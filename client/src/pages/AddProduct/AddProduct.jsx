import React from "react";
import "./AddProduct.scss";
import axios from "axios";
import { Link } from "react-router-dom";

class AddProduct extends React.Component {
  state = {
    name: "",
    description: "",
    image: "",
    price: "",
    quantity: "",
    productList: [],
    isSubmitted: false,
    nameRequired: false,
    descriptionRequired: false,
    imageRequired: false,
    quantityRequired: false,
    priceRequired: false,
  };

  postItem = (event) => {
    const formData = new FormData();
    formData.append(
      "file",
      event.target.image.files[0],
      event.target.image.files[0].name
    );
    console.log(formData);
    formData.append("upload_preset", "bksrndvd");

    axios
      .post("https://api.cloudinary.com/v1_1/dwhlessgm/image/upload", formData)
      .then((response) => {
        axios
          .post(`http://localhost:8080/products`, {
            name: event.target.name.value,
            description: event.target.description.value,
            image: `https://res.cloudinary.com/dwhlessgm/image/upload/${response.data.public_id}.jpg`,
            quantity: Number(event.target.quantity.value),
            price: event.target.price.value,
          })
          .then((response) => {
            console.log(response.data);
            event.target.reset();
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (event) => {
    const eventRequired = event.target.name + "Required";
    this.setState({
      [event.target.name]: event.target.value,
      [eventRequired]: false,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.name) {
      this.setState({
        nameRequired: true,
      });
    }
    if (!this.state.description) {
      this.setState({
        descriptionRequired: true,
      });
    }
    if (!this.state.image) {
      this.setState({
        imageRequired: true,
      });
    }
    if (!this.state.quantity) {
      this.setState({
        quantityRequired: true,
      });
    }
    if (!this.state.price) {
      this.setState({
        quantityRequired: true,
      });
    }

    if (
      !this.state.name ||
      !this.state.description ||
      !this.state.image ||
      !this.state.quantity ||
      !this.state.price
    ) {
      return;
    }

    this.postItem(event);
    alert("Product successfully added");
  };

  componentDidMount() {
    axios
      .get(`http://localhost:8080/products`)
      .then((response) => {
        this.setState({
          productList: response.data,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <section className="add-item">
        <h1 className="add-item__title">Add New Inventory Item</h1>
        <form className="add-item-form" onSubmit={this.handleSubmit}>
          <article className="add-item-form__container">
            <h2 className="add-item-form__subtitle">Item Details</h2>
            <div className="add-item-form__group">
              <label className="add-item-form__label" htmlFor="name">
                Item Name
              </label>
              <input
                onChange={this.handleChange}
                className={`add-item-form__input ${
                  this.state.nameRequired ? "add-item-form__input--invalid" : ""
                }`}
                type="text"
                id="name"
                name="name"
                placeholder="Item Name"
              />
              {this.state.nameRequired && (
                <div className="add-item-form__error-container">
                  <img src="" alt="error" />
                  <p className="add-item-form__error-text">
                    This field is required
                  </p>
                </div>
              )}
            </div>

            <div className="add-item-form__group">
              <label className="add-item-form__label" htmlFor="description">
                Description
              </label>
              <textarea
                className={`add-item-form__textarea ${
                  this.state.descriptionRequired
                    ? "add-item-form__textarea--invalid"
                    : ""
                }`}
                onChange={this.handleChange}
                name="description"
                id="description"
                placeholder="Please enter a brief item description..."
              ></textarea>
              {this.state.descriptionRequired && (
                <div className="add-item-form__error-container">
                  <img src="" alt="error" />
                  <p className="add-item-form__error-text">
                    This field is required
                  </p>
                </div>
              )}
            </div>

            <div className="add-item-form__group">
              <label className="add-item-form__label" htmlFor="image">
                Image
              </label>
              <input
                className={`add-item-form__input ${
                  this.state.imageRequired
                    ? "add-item-form__input--invalid"
                    : ""
                }`}
                onChange={this.handleChange}
                type="file"
                name="image"
                id="image"
              />
              {this.state.quantityRequired && (
                <div className="add-item-form__error-container">
                  <img src="" alt="error" />
                  <p className="add-item-form__error-text">
                    This field is required
                  </p>
                </div>
              )}
            </div>

            <div className="add-item-form__group">
              <label className="add-item-form__label" htmlFor="price">
                Price
              </label>
              <input
                className={`add-item-form__input ${
                  this.state.priceRequired
                    ? "add-item-form__input--invalid"
                    : ""
                }`}
                onChange={this.handleChange}
                type="text"
                name="price"
                id="price"
              />
              {this.state.priceRequired && (
                <div className="add-item-form__error-container">
                  <img src="" alt="error" />
                  <p className="add-item-form__error-text">
                    This field is required
                  </p>
                </div>
              )}
            </div>

            <div className="add-item-form__group">
              <label className="add-item-form__label" htmlFor="quantity">
                Quantity
              </label>
              <input
                className={`add-item-form__input ${
                  this.state.quantityRequired
                    ? "add-item-form__input--invalid"
                    : ""
                }`}
                onChange={this.handleChange}
                type="number"
                name="quantity"
                id="quantity"
              />
              {this.state.quantityRequired && (
                <div className="add-item-form__error-container">
                  <img src="" alt="error" />
                  <p className="add-item-form__error-text">
                    This field is required
                  </p>
                </div>
              )}
            </div>
          </article>
          <div className="add-item-form__button-container">
            <Link to="/">
              <button className="add-item-form__btn">Cancel</button>
            </Link>
            <button
              className="add-item-form__btn add-item-form__btn--add"
              type="submit"
            >
              + Add Item
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default AddProduct;
