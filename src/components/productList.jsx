import React, { Component } from 'react';
import Product from './product';
import { Link } from 'react-router-dom';

function ProductList(props) {
  console.log(props.products);
  return (
    <ul className="product-list">
      {props.products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </ul>
  );
}

export default ProductList;
