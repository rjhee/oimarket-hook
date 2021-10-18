import React from 'react';
import Product from './product';

function ProductList(props) {
  return (
    <ul className="product-list">
      {props.products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </ul>
  );
}

export default ProductList;
