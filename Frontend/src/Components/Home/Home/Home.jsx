import React, { useEffect, useState } from "react";
import "./Home.css";
import { forwardRef } from "react";
import Swal from 'sweetalert2';
import {Link} from "react-router-dom"

import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const Home = () => {
  const [data, setData] = useState([]);
  const [editeddata, setEditeddata] = useState({}); 
  const [toDoData, setToDoData] = useState([]);
  const [doingData, setDoingData] = useState([]);
  const [doneData, setDoneData] = useState([]);
  const [btn, setBtn] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:2554/data");
      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (data) {
      const toDo = data.filter((elem) => elem.status === "To-do");
      const doing = data.filter((elem) => elem.status === "Doing");
      const done = data.filter((elem) => elem.status === "Done");

      setToDoData(toDo);
      setDoingData(doing);
      setDoneData(done);
    }
  }, [data]);

  const handleEditChange = (e) => {
    const { id, value } = e.target;

    setEditeddata({ ...editeddata, [id]: value });
  };

  const handleEdit = (id) => {
    setBtn(!btn);
    if (btn === true) {
      updateTask(id, editeddata);
    } else {
      setEditeddata({ id: id });
    }
  };
  
  const updateTask = async (id, editeddata) => {
    try {
      await fetch(`http://localhost:2554/data/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editeddata),
      });
      MySwal.fire(
        'Task has been Updated!',
        'Please click the button!',
        'success'
      )
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (delId) => {
    try {
      await fetch(`http://localhost:2554/data/${delId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      MySwal.fire(
        'Task has been Deleted!',
        'Please click the button!',
        'success'
      )
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangeStatus = async (satId, event) => {
    try {
      const newStatus = event.target.value;
      setStatus(newStatus);
      const obj = { status: newStatus };
      await fetch(`http://localhost:2554/data/${satId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
   
      MySwal.fire(
        'Status has been updated!',
        'Please click the button!',
        'success'
      )
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container">
      
      <div className="to-do">
        <h2>To-Do</h2>
        <div>
          {toDoData.map((e) => (
            <div className="card" key={e.id}>
              {btn ? (
                <input
                  type="text"
                  onChange={(e)=>handleEditChange(e,e._id)}
                  id="title"
                  value={
                    e._id === editeddata.id ? editeddata.title || e.title : e.title
                  }
                />
              ) : (
                <h3>Title: {e.title}</h3>
              )}
              {btn ? (
                <textarea
                  name=""
                  id="description"
                  cols="40"
                  rows="2"
                  value={e._id === editeddata.id ? editeddata.description || e.description : e.description}
                  onChange={handleEditChange}
                ></textarea>
              ) : (
                <p>Description: {e.description}</p>
              )}

              <p>Status: {e.status}</p>
              <select
                onChange={(event) => {
                  handleChangeStatus(e._id, event);
                }}
                value={status} 
              >
                <option value="">Select</option>
                <option value="To-do">To-do</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </select>
              <button
                onClick={() => {
                  handleEdit(e._id);
                }}
              >
                {btn && e._id === editeddata.id ? "Save" : "Edit Task"}
              </button>
              <button className="del" onClick={() => handleDelete(e._id)}>
                Delete task
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="doing">
        <h2>Doing</h2>
        <div>
          {doingData.map((e) => (
            <div className="card" key={e.id}>
              {btn ? (
                <input
                  type="text"
                  onChange={(e)=>handleEditChange(e,e._id)}
                  id="title"
                  value={
                    e._id === editeddata.id ? editeddata.title || e.title : e.title
                  }
                />
              ) : (
                <h3>Title: {e.title}</h3>
              )}
              {btn ? (
                <textarea
                  name=""
                  id="description"
                  cols="40"
                  rows="2"
                  value={e._id === editeddata.id ? editeddata.description || e.description : e.description}
                  onChange={handleEditChange}
                ></textarea>
              ) : (
                <p>Description: {e.description}</p>
              )}

              <p>Status: {e.status}</p>
              <select
                onChange={(event) => {
                  handleChangeStatus(e._id, event);
                }}
                value={status} 
              >
                <option value="">Select</option>
                <option value="To-do">To-do</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </select>
              <button
                onClick={() => {
                  handleEdit(e._id);
                }}
              >
                {btn && e._id === editeddata.id ? "Save" : "Edit Task"}
              </button>
              <button className="del" onClick={() => handleDelete(e._id)}>
                Delete task
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="done">
        <h2>Done</h2>
        <div>
          {doneData.map((e) => (
            <div className="card" key={e.id}>
              {btn ? (
                <input
                  type="text"
                  onChange={(e)=>handleEditChange(e,e._id)}
                  id="title"
                  value={
                    e._id === editeddata.id ? editeddata.title || e.title : e.title
                  }
                />
              ) : (
                <h3>Title: {e.title}</h3>
              )}
              {btn ? (
                <textarea
                  name=""
                  id="description"
                  cols="40"
                  rows="2"
                  value={e._id === editeddata.id ? editeddata.description || e.description : e.description}
                  onChange={handleEditChange}
                ></textarea>
              ) : (
                <p>Description: {e.description}</p>
              )}

              <p>Status: {e.status}</p>
              <select
                onChange={(event) => {
                  handleChangeStatus(e._id, event);
                }}
                value={status} 
              >
                <option value="">Select</option>
                <option value="To-do">To-do</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </select>
              <button
                onClick={() => {
                  handleEdit(e._id);
                }}
              >
                {btn && e._id === editeddata.id ? "Save" : "Edit Task"}
              </button>
              <button className="del" onClick={() => handleDelete(e._id)}>
                Delete task
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};