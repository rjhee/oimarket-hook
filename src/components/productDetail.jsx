import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

function ProductDetail(props) {
  let history = useHistory();
  let { id } = useParams();

  const product = props.products.find((product) => product.id === id);
  const productImg = { backgroundImage: `url(${product.img})` };

  return (
    <section className="product-detail">
      <div className="img-cover">
        <span className="productImg" style={productImg}></span>
      </div>
      <div className="product-detail-contents">
        <h1 className="title">{product.title}</h1>
        <div className="detail-btn-cover">
          <button className="edit">수정</button>

          <button className="delete">삭제</button>
        </div>
        <strong className="price">{product.price}</strong>
        <div className="product-detail-info">
          <div className="user-profile">
            <div className="user-photo">
              <i className="icon-user"></i>
            </div>
            <div className="user-profile-cover">
              <span className="user-name">{product.name}</span>
              <span className="user-location">{product.location}</span>
            </div>
          </div>
        </div>

        <p className="product-detail-desc">{product.desc}</p>
        <div className="product-detail-count">
          <span className="date">{product.time}</span>
          <div>
            <span className="like">찜 3</span>
            <span className="comment">채팅 3</span>
            <span className="views">조회 3</span>
          </div>
        </div>
        <div className="product-detail-btn">
          <button className="like-btn">
            <i className="icon-heart"></i>
          </button>
          <button className="chat-btn">채팅하기</button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
