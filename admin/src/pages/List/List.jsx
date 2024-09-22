import React from "react";
import "./List.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/snack/list`);
    // console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };
  const removeSnack = async (snackId) => {
    const response = await axios.post(`${url}/api/snack/remove`, {
      id: snackId,
    });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="list add flex-col">
      <p>All Snacks List</p>
      <div className="list-table">
        <div className="list-table-format">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/${item.image}`} alt={item.name} />

              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <p onClick={() => removeSnack(item._id)}>X</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
