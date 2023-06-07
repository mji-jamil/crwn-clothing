import "./product-card.styles.scss";
import Button from "../button/button.component.jsx";
import { CartContext } from "../../contexts/cart.context.jsx";
import { useContext } from "react";

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;
    const { addItemsToCart } = useContext(CartContext);
    const addProductToCart = () => addItemsToCart(product);
    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType="inverted" onClick={addProductToCart}>
                Add to cart
            </Button>
        </div>
    );
};

export default ProductCard;
