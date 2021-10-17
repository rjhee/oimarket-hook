import React from 'react';

function UploadForm() {
  return (
    <form className="upload-form">
      <input
        type="text"
        className="upload-title"
        placeholder="글 제목"
        autoFocus
      />
      <input type="text" className="upload-price" placeholder="₩ 상품 가격" />
      <textarea
        className="upload-desc"
        placeholder="판매하실 상품에 대한 설명을 입력해주세요!"
      ></textarea>
      <label htmlFor="upload-img" className="upload-img">
        파일업로드
      </label>
      <input type="file" id="upload-img" className="hidden" accept="image/*" />
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
