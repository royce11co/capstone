import "./Header.scss";
import cart from "../../assets/icons/shopping_cart_black_24dp.svg";
import home from "../../assets/icons/home_black_24dp.svg";
import add from "../../assets/icons/add_black_24dp.svg";
import edit from "../../assets/icons/edit_black_24dp.svg"
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img className="header__home" src={home} alt="Cocosan Logo" />
      </Link>
      <Link to="/products/edit">
        <img className="header__edit" src={edit} alt="Edit item" />
      </Link>
      <Link to="/products/add">
        <img className="header__add" src={add} alt="Add item" />
      </Link>
      <Link to="/cart">
        <img className="header__cart" src={cart} alt="Shopping Cart" />
      </Link>
    </header>
  );
}
export default Header;
