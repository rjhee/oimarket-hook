import React from 'react';
import { useHistory } from 'react-router-dom';

function Product(props) {
  let history = useHistory();
  const productImg = { backgroundImage: `url(${props.product.img})` };

  const year = props.product.time[0];
  const month = props.product.time[1];
  const day = props.product.time[2];
  const hours = props.product.time[3];
  const minutes = props.product.time[4];

  let uploadDate = `${month + 1}월${day}일 ${hours}시${minutes}분`;
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
          <span className="upload-date">{uploadDate}</span>
        </div>
        <strong className="product-price">
          {Number(props.product.price).toLocaleString('ko-KR') + '원'}
        </strong>
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
