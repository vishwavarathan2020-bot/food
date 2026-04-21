import React, { useMemo, useState } from 'react';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { apiClient } from '../api';

const CartDrawer = ({
  isOpen,
  onClose,
  cart,
  clearCart,
  onUpdateQuantity,
  onUpdateMessage,
  onRemoveItem,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");

  const totalAmount = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  if (!isOpen) {
    return null;
  }

  const handleCheckout = async () => {
    if (cart.length === 0 || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setOrderMessage("");

    try {
      await apiClient.post('/orders', {
        items: cart.map(({ id, name, price, quantity, message }) => ({
          id,
          name,
          price,
          quantity,
          message,
        })),
        totalAmount,
      });

      clearCart();
      setOrderMessage("Order placed successfully.");
    } catch (error) {
      console.error("Checkout failed:", error);
      setOrderMessage("Could not place order. Please start the server and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="explosive-cart-overlay" onClick={onClose}>
      <aside
        className="explosive-cart-drawer"
        onClick={(event) => event.stopPropagation()}
        aria-label="Shopping cart"
      >
        <div className="explosive-cart-header">
          <h2>
            <ShoppingBag size={28} strokeWidth={3} />
            Cart
          </h2>
          <button className="explosive-close-btn" onClick={onClose} aria-label="Close cart">
            <X size={22} strokeWidth={3} />
          </button>
        </div>

        <div className="explosive-cart-body">
          {cart.length === 0 ? (
            <p className="explosive-cart-empty">
              {orderMessage || "Your cart is empty."}
            </p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="explosive-cart-item">
                <div className="explosive-cart-item-info">
                  <h4>{item.name}</h4>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>

                  <div className="explosive-cart-controls">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      <Minus size={16} strokeWidth={3} />
                    </button>
                    <strong>{item.quantity}</strong>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      <Plus size={16} strokeWidth={3} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={16} strokeWidth={3} />
                    </button>
                  </div>

                  <textarea
                    placeholder="Add instruction"
                    value={item.message || ""}
                    onChange={(event) => onUpdateMessage(item.id, event.target.value)}
                    className="explosive-cart-message"
                  />
                </div>
              </div>
            ))
          )}
        </div>

        <div className="explosive-cart-footer">
          {orderMessage && cart.length > 0 && (
            <p className="explosive-cart-status">{orderMessage}</p>
          )}
          <div className="explosive-cart-total">
            <span>Total</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <button
            className="explosive-checkout-btn"
            onClick={handleCheckout}
            disabled={cart.length === 0 || isSubmitting}
          >
            {isSubmitting ? "Placing..." : "Checkout"}
          </button>
        </div>
      </aside>
    </div>
  );
};

export default CartDrawer;
