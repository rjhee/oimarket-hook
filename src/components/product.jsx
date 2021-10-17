import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

function Product(props) {
  let history = useHistory();
  const productImg = { backgroundImage: `url(${props.product.img})` };
  return (
    <li
      className="product"
      onClick={() => {
        history.push('/productDetail/' + props.product.id);
      }}
    >
      <div className="product-img" style={productImg}></div>
      <div className="product-info">
        <h3 className="product-title">{props.product.title}</h3>
        <div className="upload-info">
          <span className="upload-location">{props.product.loction}</span>
          <span className="upload-date">{props.product.time}</span>
        </div>
        <strong className="product-price">{props.product.price}</strong>
        <div className="btn-group">
          <div className="like">
            <i className="far fa-heart like-btn"></i>
            <span className="like-num">2</span>
          </div>
          <div className="comment">
            <i className="far fa-comment comment-btn"></i>
            <span className="comment-num">0</span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Product;
