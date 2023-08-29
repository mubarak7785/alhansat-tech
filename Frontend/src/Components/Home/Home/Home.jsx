import React, { useEffect, useState } from "react";
import "./Home.css";
import { forwardRef } from "react";

export const Home = () => {
  const [data, setData] = useState([]);
  const [editeddata,setEditeddata]=useState()
  const [toDoData, setToDoData] = useState([]);
  const [doingData, setDoingData] = useState([]);
  const [doneData, setDoneData] = useState([]);
  const [btn, setBtn] = useState(false);
  const [status,setStatus]=useState()

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:2954/data");
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

  const handleEditChange=(e)=>{
    const {id,value}=e.target;
    setEditeddata({...editeddata,[id]:value})
    console.log(editeddata)
  }

  const handleEdit = (id) => {
    setBtn(!btn);
    if(btn==true){
      updateTask(id,editeddata);    
    }
  };

  const updateTask=async(id, editeddata)=>{
    try{
      await fetch(`http://localhost:2954/data/${id}`,{
      method : "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editeddata),
    })
fetchData()
  }
    catch(e){
      console.log(e)
    }
    
  }
const handleDelete = async (delId) => {
  try {
    await fetch(`http://localhost:2954/data/${delId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    alert("Task has been Deleted!");
    fetchData();
  } catch (e) {
    console.log(e);
  }
};

const handleChangeStatus=async(satId)=>{
  try{
      let obj={}
      obj.status=event.target.value
      console.log(obj)
      setStatus(obj)
      await fetch(`http://localhost:2954/data/${satId}`,{
        method : "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
      alert("Status has been updated!")
      fetchData()
  }
  catch(e){
    console.log(e)
  }
}


  return (
    <div className="container">
      <div className="to-do">
        <h2>To-Do</h2>
        <div>
          {toDoData.map((e) => (
            <div className="card" key={e.id}>
              {btn ? (
                <input type="text" onChange={handleEditChange} id="title" value={editeddata?.title || e.title} />
              ) : (
                <h3>Title: {e.title}</h3>
              )}
              {btn ? (
                <textarea
                  name=""
                  id="description"
                  cols="30"
                  rows="2"
                  value={editeddata?.description || e.description}
                  onChange={handleEditChange}
                ></textarea>
              ) : (
                <p>Description: {e.description}</p>
              )}

              <p>Status: {e.status}</p>
              <select onChange={()=>{handleChangeStatus(e._id)}} name="" id="">
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
                {btn ? "Save" : "Edit Task"}
              </button>
              <button className="del" onClick={()=>{handleDelete(e._id)}}>Delete task</button>
            </div>
          ))}
        </div>
      </div>
      <div className="doing">
        <h2>Doing</h2>
        <div>
          {" "}
          {doingData.map((e) => (
            <div className="card" key={e.id}>
              <h3>Title: {e.title}</h3>
              <p>Description: {e.description}</p>
              <p>Status: {e.status}</p>
              <select name="" id="">
                <option value="">Select</option>
                <option value="To-do">To-do</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </select>
              <button>Edit Task</button>
              <button className="del">Delete task</button>
            </div>
          ))}
        </div>
      </div>
      <div className="done">
        <h2>Done</h2>
        <div>
          {doneData.map((e) => (
            <div className="card" key={e.id}>
              <h3>Title: {e.title}</h3>
              <p>Description: {e.description}</p>
              <p>Status: {e.status}</p>
              <select  name="" id="">
                <option value="">Select</option>
                <option value="To-do">To-do</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </select>
              <button>Edit Task</button>
              <button className="del">Delete task</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
