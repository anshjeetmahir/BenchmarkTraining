import React, { useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { IProduct } from "../Context/types";
import "../Styles/cart.css";

const Cart: React.FC = () => {
    const context = useContext(GlobalContext);
    if (!context) return null;
    const { state, dispatch } = context;
    const totalAmount = state.cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

    const handleCheckout = () => {
        if (state.cart.length === 0) {
            alert("Add something to the cart before checking out.");
        } else {
            alert("Thank you for your purchase!");
            dispatch({ type: "CLEAR_CART" });
        }
    };

    return (
        <>
            <div className="cart-container">
                <h2>Shopping Cart</h2>
                {state.cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        {state.cart.map((item: IProduct) => (
                            <div key={item.id} className="cart-item">
                                <div>

                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div>

                                    <h3>{item.title}</h3>
                                </div>
                                <div >

                                    <p>Price: </p><p className="price">${item.price.toFixed(2)}</p>
                                </div>
                                <div>

                                    <p>Quantity: {item.quantity || 1}</p>
                                </div>

                                <button onClick={() => dispatch({ type: "INCREASE_QUANTITY", payload: item.id })} style={{ backgroundColor: "white", color: "black", fontWeight: "bold" }}>+</button>
                                <button
                                    onClick={() => dispatch({ type: "DECREASE_QUANTITY", payload: item.id })} style={{ backgroundColor: "white", color: "black", fontWeight: "bold" }}
                                    disabled={item.quantity <= 1}>
                                    -
                                </button>
                                <button onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}>Remove</button>
                            </div>
                        ))}


                        <div className="order-summary">
                            <h3>Order Summary</h3>
                            <p className="price">Total: ${totalAmount.toFixed(2)}</p>
                        </div>
                        <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
                    </>
                )}
            </div>
        </>
    );
};

export default Cart;
