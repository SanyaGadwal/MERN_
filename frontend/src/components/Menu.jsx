import React, { useState } from "react";
import { useDispatchCart } from "../components/ContextReducer"; // Import the dispatch function
import data from "../restApi.json"; // Ensure the correct import path

const Menu = () => {
  const [quantities, setQuantities] = useState({});
  const [variants, setVariants] = useState({});
  const dispatch = useDispatchCart(); // Get the dispatch function

  const handleQuantityChange = (id, quantity) => {
    setQuantities({ ...quantities, [id]: quantity });
  };

  const handleVariantChange = (id, variant) => {
    setVariants({ ...variants, [id]: variant });
  };

  const handleAddToCart = (element) => {
    const quantity = quantities[element.id] || 1;
    const variant = variants[element.id] || "small";

    dispatch({
      type: "ADD",
      id: element.id,
      name: element.title,
      qty: quantity,
      size: variant,
      price: element.prices[variant.toLowerCase()] * quantity,
      img: element.image,
    });

    console.log(`Added to cart: ${element.title}, Qty: ${quantity}, Size: ${variant}`);
  };

  return (
    <section className="menu" id="menu">
      <div className="container">
        <div className="heading_section">
          <h1 className="heading">POPULAR DISHES</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga,
            iusto dolorem! Voluptatibus ipsum nam mollitia architecto. Soluta
            pariatur eius et recusandae veritatis. Quasi, et molestias!
          </p>
        </div>
        <div className="dishes_container">
          {data.data[0].dishes.map((element) => {
            const quantity = quantities[element.id] || 1;
            const variant = variants[element.id] || "small";
            return (
              <div className="card" key={element.id}>
                <img src={element.image} alt={element.title} />
                <h3>{element.title}</h3>
                <button className="btn1">{element.category}</button>

                <div className="w-100">
                  <p>Variants</p>
                  <select
                    className="form-control"
                    value={variant}
                    onChange={(e) => handleVariantChange(element.id, e.target.value)}
                  >
                    {element.varients.map((variant) => (
                      <option key={variant} value={variant}>
                        {variant}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-100">
                  <p>Quantity</p>
                  <select
                    className="form-control"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(element.id, e.target.value)}
                  >
                    {[...Array(10).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-container">
                  <div className="m-1 w-100">
                    <h1>Price: ₹{element.prices[variant.toLowerCase()] * quantity}</h1>
                  </div>
                  <div className="m-1 w-100">
                    <button
                      className="btn"
                      onClick={() => handleAddToCart(element)}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Menu;
