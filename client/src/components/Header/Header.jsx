import "./Header.scss";
import cart from "../../assets/icons/shopping_cart_black_24dp.svg";
import home from "../../assets/icons/home_black_24dp.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={home} alt="Cocosan Logo" />
      </Link>
      <Link to="/cart">
        <img className="header__cart" src={cart} alt="Shopping Cart" />
      </Link>
    </header>
  );
}
export default Header;
