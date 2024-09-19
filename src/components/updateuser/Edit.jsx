import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import '../adduser/add.css';

const Edit = () => {
  const initialUserState = {
    stockEntry: '',
    stockEntryDate: '',
    itemName: '',
    category: '',
    quantity: '',
    supplier: '',
    location: '',
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(initialUserState);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/getone/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/update/${id}`, user);
      toast.success(response.data.msg, { position: 'top-right' });
      navigate('/');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user', { position: 'top-right' });
    }
  };

  return (
    <div className="addUser">
      <Link to="/">Back</Link>
      <h2>Update Inventory</h2>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label htmlFor="stockEntry" className="text-light">Stock Entry</label>
          <input
            type="text"
            id="stockEntry"
            name="stockEntry"
            placeholder="Enter stock entry details"
            value={user.stockEntry}
            onChange={inputChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stockEntryDate" className="text-light">Stock Entry Date</label>
          <input
            type="date"
            id="stockEntryDate"
            name="stockEntryDate"
            value={user.stockEntryDate}
            onChange={inputChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="itemName" className="text-light">Item Name</label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            placeholder="Enter item name"
            value={user.itemName}
            onChange={inputChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category" className="text-light">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            placeholder="Enter category"
            value={user.category}
            onChange={inputChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity" className="text-light">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            placeholder="Enter quantity"
            value={user.quantity}
            onChange={inputChangeHandler}
            min="1"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="supplier" className="text-light">Supplier</label>
          <input
            type="text"
            id="supplier"
            name="supplier"
            placeholder="Enter supplier name"
            value={user.supplier}
            onChange={inputChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location" className="text-light">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter location"
            value={user.location}
            onChange={inputChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn text-dark">Update</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
