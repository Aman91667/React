import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import './user.css';

const User = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/getall');
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter(user =>
        Object.values(user).some(value =>
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      ));
    }
  }, [searchQuery, users]);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/delete/${userId}`);
      setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
      setFilteredUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
      toast.success(response.data.msg, { position: 'top-right' });
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className='userTable'>
      <Link to="/add" className='addButton'>Add User</Link>
      <div className='search'>
        <input
          type='text'
          placeholder='Search...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>Stock Entry</th>
            <th>Stock Entry Date</th>
            <th>Item Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Supplier</th>
            <th>Location</th>
            <th>Update/Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user._id}>
              <td>{user.stockEntry}</td>
              <td>{user.stockEntryDate}</td>
              <td>{user.itemName}</td>
              <td>{user.category}</td>
              <td>{user.quantity}</td>
              <td>{user.supplier}</td>
              <td>{user.location}</td>
              <td className='actionButtons'>
                <button onClick={() => deleteUser(user._id)}><i className="fa-solid fa-trash"></i></button>
                <Link to={`/edit/${user._id}`}><i className="fa-solid fa-pen-to-square"></i></Link>
              </td>
            </tr>
           ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
