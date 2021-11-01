import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function ProductDetail(props) {
  let history = useHistory();
  let { id } = useParams();

  const product = props.products.find((product) => product.id === id);
  const year = product.time[0];
  const month = product.time[1];
  const day = product.time[2];
  const hours = product.time[3];
  const minutes = product.time[4];
  let uploadDate = `${month + 1}월${day}일 ${hours}시${minutes}분`;
  const productImg = { backgroundImage: `url(${product.img})` };

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <section className="product-detail">
      <div className="img-cover">
        <span className="productImg" style={productImg}></span>
      </div>
      <div className="product-detail-contents">
        <h1 className="title">{product.title}</h1>
        <div className="detail-btn-cover">
          <button
            className="edit"
            onClick={() => {
              history.push('/edit/' + product.id);
              props.getProductDetail();
            }}
          >
            수정
          </button>

          <button
            className="delete"
            onClick={() => {
              props.deleteProduct();
            }}
          >
            삭제
          </button>
        </div>
        <strong className="price">{product.price}</strong>
        <div className="product-detail-info">
          <div className="user-profile">
            <div className="user-photo">
              <i className="icon-user"></i>
            </div>
            <div className="user-profile-cover">
              <span className="user-name">{product.user}</span>
              <span className="user-location">{product.location}</span>
            </div>
          </div>
        </div>

        <p className="product-detail-desc">{product.desc}</p>
        <div className="product-detail-count">
          <span className="date">{uploadDate}</span>
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
          <button
            className="chat-btn"
            onClick={() => {
              const chatRoomId = props.createChat();
              chatRoomId.then((id) => {
                history.push('/chatroom/' + id);
                props.getChatMessages(10);
              });
            }}
          >
            채팅하기
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
