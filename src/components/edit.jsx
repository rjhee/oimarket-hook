import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Edit(props) {
  let { id } = useParams();
  const product = props.products.find((product) => product.id === id);

  return (
    <form className="upload-form" onSubmit={props.onSubmitEdit}>
      <input
        name="title"
        type="text"
        className="upload-title"
        placeholder="글 제목"
        autoFocus
        value={props.editProduct.title}
        onChange={props.onEditChange}
      />
      <input
        name="price"
        type="tel"
        className="upload-price"
        placeholder="₩ 상품 가격"
        value={props.editProduct.price}
        onChange={props.onEditChange}
      />
      <textarea
        name="desc"
        className="upload-desc"
        placeholder="판매하실 상품에 대한 설명을 입력해주세 요!"
        value={props.editProduct.desc}
        onChange={props.onEditChange}
      ></textarea>
      <label htmlFor="upload-img" className="upload-img">
        파일업로드
      </label>
      <input
        type="file"
        id="upload-img"
        className="hidden"
        accept="image/*"
        onChange={props.onFileChange}
      />
      <div className="btn-group">
        <button className="close-btn">뒤로가기</button>
        <button type="submit" className="upload-btn">
          글 올리기
        </button>
      </div>
    </form>
  );
}

export default Edit;
