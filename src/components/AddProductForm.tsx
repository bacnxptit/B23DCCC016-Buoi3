import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/productsReducer.js";
import Select from "./Select";

interface Option {
  label: string;
  value: string;
}

interface AddProductFormProps {
  setVisibleForm: (visible: boolean) => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ setVisibleForm }) => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const dispatch = useDispatch();

  const options: Option[] = [
    { label: "Văn phòng phẩm", value: "Văn phòng phẩm" },
    { label: "Thực phẩm", value: "Thực phẩm" },
    { label: "Khác", value: "Khác" },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      name,
      price: parseFloat(price),
    };
    dispatch(addProduct(newProduct));
    setVisibleForm(false);
  };

  return (
    <div className="form-container">
      <h2>Thêm Hàng Hóa</h2>
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
        <Select
          options={options}
          value={selectedOption}
          onChange={(value: string) => {
            setSelectedOption(value);
          }}
          placeholder="Loại hàng hóa"
        />
        {selectedOption === "Văn phòng phẩm" && (
          <input
            type="text"
            placeholder="Hạn sử dụng"
            required
          />
        )}
        <button type="submit">Thêm hàng hóa</button>
      </form>
      <button className="back-btn" onClick={() => setVisibleForm(false)}>
        Đóng
      </button>
    </div>
  );
};

export default AddProductForm;
