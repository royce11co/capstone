import { Component } from "react";
import axios from "axios";
import "./EditProduct.scss";
import { Link } from "react-router-dom";
import error from "../../assets/icons/error-24px.svg";

class EditProduct extends Component {
  state = {
    description: "",
    name: "",
    quantity: "",
    image: "",
    price: "",
    isSubmitted: false,
    nameRequired: false,
    descriptionRequired: false,
    quantityRequired: false,
    imageRequired: false,
    priceRequired: false,
  };

  componentDidMount() {
    this.getProductById();
  }

  getProductById = () => {
    axios
      .get(`http://localhost:8080/products/${this.props.match.params.id}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          name: response.data.name,
          description: response.data.description,
          quantity: response.data.quantity,
          image: response.data.image,
          price: response.data.price,
        });
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const eventRequired = event.target.name + "Required";
    this.setState({
      [event.target.name]: event.target.value,
      [eventRequired]: false,
    });
  };

  isFormValid = () => {
    // TO DO: Check if the fields are all filled
    if (
      !this.state.name ||
      !this.state.description ||
      !this.state.quantity ||
      !this.state.image ||
      !this.state.price
    ) {
      return false;
    }
    return true;
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
    if (!this.state.quantity) {
      this.setState({
        quantityRequired: true,
      });
    }
    if (!this.state.image) {
      this.setState({
        imageRequired: true,
      });
    }
    if (!this.state.price) {
      this.setState({
        priceRequired: true,
      });
    }

    const newProduct = {
      name: this.state.name,
      description: this.state.description,
      quantity: this.state.quantity,
      image: this.state.image,

      price: this.state.price,
    };
    if (this.isFormValid()) {
      axios
        .put(
          `http://localhost:8080/products/edit/${this.props.match.params.id}/update`,
          newProduct
        )
        .then((response) => {
          this.setState({
            products: response.data,
          });
        })

        .catch((error) => {
          console.log(error);
        });
      alert("Product updated successfully");
    } else alert("Upload did not complete, please try again");
  };

  render() {
    return (
      <div className="edit-product-card">
        <h1 className="edit-product__title"> Edit Product </h1>
        <form onSubmit={this.handleSubmit} className="edit-product__form">

          <section className="edit-product__container edit-product__container--left">
            <label className="edit-product__label">
              <h3 className="edit-product__label">Product Name</h3>
              <input
                className={`add-product__input ${
                  this.state.nameRequired ? "add-product__input--invalid" : ""
                }`}
                type="text"
                name="name"
                onChange={this.handleChange}
                value={this.state.name}
              />
              {this.state.nameRequired && (
                <div className="add-product__error-container">
                  <img src={error} alt="error" />
                  <p className="add-product-form__error-text">
                    This field is required
                  </p>
                </div>
              )}
            </label>

            <label className="edit-product__label">
              <h3 className="edit-product__label">Product Description</h3>
              <textarea
                className={`add-product__input ${
                  this.state.descriptionRequired
                    ? "add-product__input--invalid"
                    : ""
                }`}
                type="text"
                name="description"
                onChange={this.handleChange}
                value={this.state.description}
              />
              {this.state.descriptionRequired && (
                <div className="add-product__error-container">
                  <img src={error}  alt="error" />
                  <p className="add-product-form__error-text">
                    This field is required
                  </p>
                </div>
              )}
            </label>


            <label className="edit-product__label">
              <h3 className="edit-product__label">Quantity</h3>
              <input
                className={`add-product__input ${
                  this.state.quantityRequired
                    ? "add-product__input--invalid"
                    : ""
                }`}
                type="text"
                name="quantity"
                onChange={this.handleChange}
                value={this.state.quantity}
              />
              {this.state.quantityRequired && (
                <div className="add-product__error-container">
                  <img src={error}  alt="error" />
                  <p className="add-product-form__error-text">
                    This field is required
                  </p>
                </div>
              )}
            </label>

            <label className="edit-product__label">
              <h3 className="edit-product__label">price</h3>
              <input
                className={`add-product__input ${
                  this.state.priceRequired
                    ? "add-product__input--invalid"
                    : ""
                }`}
                type="text"
                name="price"
                onChange={this.handleChange}
                value={this.state.price}
              />
              {this.state.priceRequired && (
                <div className="add-product__label-container">
                  <img src={error}  alt="error" />
                  <p className="add-product-form__error-text">
                    This field is required
                  </p>
                </div>
              )}
            </label>
          </section>

          <div className="edit-product__btnwrapper">
            <Link to="/" className="edit-product__link">
              <button className="edit-product__btn edit-product__btn--cancel">
                Cancel
              </button>
            </Link>
            <button
              className="edit-product__btn edit-product__btn--save"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default EditProduct;
