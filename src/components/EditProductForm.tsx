import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProduct } from "../redux/productsReducer.js";

interface EditProductFormProps {
  setVisibleForm: (visible: boolean) => void;
  idSanPham: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ setVisibleForm, idSanPham }) => {
  const product = useSelector((state: { products: Product[] }) =>
    state.products.find((product) => product.id === idSanPham)
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  // Đặt giá trị ban đầu cho form khi có hàng hóa
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price.toString());
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!product) return;

    dispatch(updateProduct({ id: product.id, name, price: parseFloat(price) }));
    setVisibleForm(false);
    // navigate("/products"); // Quay lại danh sách hàng hóa
  };

  return (
    <div className="form-container">
      <h2>Chỉnh Sửa Hàng Hóa</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên hàng hóa"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Giá hàng hóa"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">Lưu Thay Đổi</button>
      </form>
      <button
        className="back-btn"
        onClick={() => {
          setVisibleForm(false);
        }}
      >
        Quay Lại
      </button>
    </div>
  );
};

export default EditProductForm;