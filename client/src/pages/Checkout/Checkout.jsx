import { Component } from "react";
import { Link } from "react-router-dom";
import "./Checkout.scss";
import error from "../../assets/icons/error-24px.svg";

class Checkout extends Component {
  state = {
    name: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    phone: "",
    email: "",
    isSubmitted: false,
    nameRequired: false,
    addressRequired: false,
    cityRequired: false,
    countryRequired: false,
    postalCodeRequired: false,
    phoneRequired: false,
    emailRequired: false,
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
      !this.state.address ||
      !this.state.city ||
      !this.state.country ||
      !this.state.postalCode ||
      !this.state.phone ||
      !this.state.email
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
    if (!this.state.address) {
      this.setState({
        addressRequired: true,
      });
    }
    if (!this.state.city) {
      this.setState({
        cityRequired: true,
      });
    }
    if (!this.state.country) {
      this.setState({
        countryRequired: true,
      });
    }
    if (!this.state.postalCode) {
      this.setState({
        postalCodeRequired: true,
      });
    }
    if (!this.state.phone) {
      this.setState({
        phoneRequired: true,
      });
    }
    if (!this.state.email) {
      this.setState({
        emailRequired: true,
      });
    }
  };

  render() {
    return (
      <article className="add-item">
        <div className="add-item__card">
          <form onSubmit={this.handleSubmit} className="add-item__form">
            <section className="add-item__container add-item__container--left">
              <h2 className="add-item__subtitle">Shipping Details</h2>
              <label className="add-item__label">
                <h3 className="add-item__label">Contact Name</h3>
                <input
                  className={`add-item__input ${
                    this.state.nameRequired
                      ? "add-item__input--invalid"
                      : ""
                  }`}
                  type="text"
                  name="name"
                  onChange={this.handleChange}
                  value={this.state.name}
                  placeholder="item Name"
                />
                {this.state.nameRequired && (
                  <div className="add-item__error-container">
                    <img src={error} alt="error" />
                    <p className="add-item-form__error-text">
                      This field is required
                    </p>
                  </div>
                )}
              </label>
              <label className="add-item__label">
                <h3 className="add-item__label">Street Address</h3>
                <input
                  className={`add-item__input ${
                    this.state.addressRequired
                      ? "add-item__input--invalid"
                      : ""
                  }`}
                  type="text"
                  name="address"
                  onChange={this.handleChange}
                  value={this.state.address}
                  placeholder="Street Address"
                />
                {this.state.addressRequired && (
                  <div className="add-item__error-container">
                    <img src={error} alt="error" />
                    <p className="add-item-form__error-text">
                      This field is required
                    </p>
                  </div>
                )}
              </label>
              <label className="add-item__label">
                <h3 className="add-item__label">City</h3>
                <input
                  className={`add-item__input ${
                    this.state.cityRequired
                      ? "add-item__input--invalid"
                      : ""
                  }`}
                  type="text"
                  name="city"
                  onChange={this.handleChange}
                  value={this.state.city}
                  placeholder="City"
                />
                {this.state.cityRequired && (
                  <div className="add-item__error-container">
                    <img src={error} alt="error" />
                    <p className="add-item-form__error-text">
                      This field is required
                    </p>
                  </div>
                )}
              </label>
              <label className="add-item__label">
                <h3 className="add-item__label">Country</h3>
                <input
                  className={`add-item__input ${
                    this.state.countryRequired
                      ? "add-item__input--invalid"
                      : ""
                  }`}
                  type="text"
                  name="country"
                  onChange={this.handleChange}
                  value={this.state.country}
                  placeholder="Country"
                />
                {this.state.countryRequired && (
                  <div className="add-item__error-container">
                    <img src={error} alt="error" />
                    <p className="add-item-form__error-text">
                      This field is required
                    </p>
                  </div>
                )}
              </label>
            </section>
            <section className="add-item__container">
              <label className="add-item__label">
                <h3 className="add-item__label">postalCode</h3>
                <input
                  className={`add-item__input ${
                    this.state.postalCodeRequired
                      ? "add-item__input--invalid"
                      : ""
                  }`}
                  type="text"
                  name="postalCode"
                  onChange={this.handleChange}
                  value={this.state.postalCode}
                  placeholder="postalCode"
                />
                {this.state.postalCodeRequired && (
                  <div className="add-item__label-container">
                    <img src={error} alt="error" />
                    <p className="add-item__error-text">
                      This field is required
                    </p>
                  </div>
                )}
              </label>
              <label className="add-item__label">
                <h3 className="add-item__label">Phone Number</h3>
                <input
                  className={`add-item__input ${
                    this.state.phoneRequired
                      ? "add-item__input--invalid"
                      : ""
                  }`}
                  type="text"
                  name="phone"
                  onChange={this.handleChange}
                  value={this.state.phone}
                  placeholder="Phone"
                />
                {this.state.phoneRequired && (
                  <div className="add-item__label-container">
                    <img src={error} alt="error" />
                    <p className="add-item__error-text">
                      This field is required
                    </p>
                  </div>
                )}
              </label>
              <label className="add-item__label">
                <h3 className="add-item__label">Email</h3>
                <input
                  className={`add-item__input ${
                    this.state.emailRequired
                      ? "add-item__input--invalid"
                      : ""
                  }`}
                  type="email"
                  name="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                  placeholder="Email"
                />
                {this.state.emailRequired && (
                  <div className="add-item__error-container">
                    <img src={error} alt="error" />
                    <p className="add-item__error-text">
                      This field is required
                    </p>
                  </div>
                )}
              </label>
            </section>
            <div className="add-item__btnwrapper">
              <Link to="/items" className="add-item__link">
                <button className="add-item__btn">Cancel</button>
              </Link>
              <button
                className="add-item__btn add-item__btn--add"
                type="submit"
              >
                Pay Now
              </button>
            </div>
          </form>
        </div>
      </article>
    );
  }
}
export default Checkout;
