import React from "react";
import ReactDOM from "react-dom/client";
import { UserProvider } from "./contexts/user.context.jsx";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./contexts/productsContext.jsx";
import { CartProvider } from "./contexts/cart.context.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <UserProvider>
                <ProductProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </ProductProvider>
            </UserProvider>
        </BrowserRouter>
    </React.StrictMode>
);
