import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate} from 'react-router-dom';
import './add.css'; // Ensure this points to your updated CSS

const CreateUser = () => {
  const [formData, setFormData] = useState({
    stockEntry: "",
    stockEntryDate: "",
    itemName: "",
    category: "",
    quantity: "",
    supplier: "",
    location: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      const response = await axios.post("http://localhost:8000/api/create", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("User created successfully!", { position: "top-right" });
      navigate("/");  // Navigate back to user list after creation
    } catch (error) {
      console.error(error);
      toast.error("Failed to create user", { position: "top-right" });
    }
  };

  return (
    <div className="addUser">
      <Link to="/">Back</Link>
      <h2>Add Inventory Item</h2>
      <form className="addUserForm" onSubmit={handleSubmit}>
        <div className="formInline">
          <div className="inputGroup">
            <label htmlFor="stockEntry">Stock Entry</label>
            <input
              type="text"
              id="stockEntry"
              name="stockEntry"
              placeholder="Stock Entry"
              value={formData.stockEntry}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="stockEntryDate">Stock Entry Date</label>
            <input
              type="date"
              id="stockEntryDate"
              name="stockEntryDate"
              placeholder="Stock Entry Date"
              value={formData.stockEntryDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="itemName">Item Name</label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              placeholder="Item Name"
              value={formData.itemName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="supplier">Supplier</label>
            <input
              type="text"
              id="supplier"
              name="supplier"
              placeholder="Supplier"
              value={formData.supplier}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputGroup">
            <button type="submit" className="btn">Create Item</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
