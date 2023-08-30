import React, { useState } from 'react'
import "./Add.css"

export const Add = () => {
  const [post,setPost]=useState()
  const handleChange=(e)=>{
    const {id,value}=e.target
    setPost({...post,[id]:value})
    console.log(post)
  }

  const postData=async ()=>{
    try{
      await fetch(`http://localhost:2954/data`,{
      method : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
alert("Task Added Successfully!")
  }
    catch(e){
      console.log(e)
    }
  }
  return (
    <div className='form'>
    <label htmlFor="">Titel</label>
    <input type="text" id='title' onChange={handleChange}/>
    <br />
    <label htmlFor="">Description</label>
    <textarea name=""  id="description" cols="30" rows="2"  onChange={handleChange}></textarea>
    <br />
    <label htmlFor="">status</label>
    <select name="" id="status"  onChange={handleChange}>
    <option value="">Select</option>
    <option value="To-do">To-do</option>
    <option value="Doing">Doing</option>
    <option value="Done">Done</option>
    </select>
    <br />
    <button onClick={postData}>Submit</button>
    </div>
  )
}
