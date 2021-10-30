import React, { useEffect } from 'react';

function UploadForm(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <form className="upload-form" onSubmit={props.onSubmitUploadForm}>
      <input
        name="title"
        type="text"
        className="upload-title"
        placeholder="글 제목"
        autoFocus
        onChange={props.onProductChange}
      />
      <input
        name="price"
        type="tel"
        className="upload-price"
        placeholder="₩ 상품 가격"
        onChange={props.onProductChange}
      />
      <textarea
        name="desc"
        className="upload-desc"
        placeholder="판매하실 상품에 대한 설명을 입력해주세요!"
        onChange={props.onProductChange}
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

export default UploadForm;
