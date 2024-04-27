import Footer from './Components/Footer'
import Navbar from './Components/Navbar'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import "./App.css"

function App() {

  const [input, setinput] = useState("")

  const [items, setitems] = useState([])

  const [finishedItems, setfinishedItems] = useState([])

  const [EditingItemId, setEditingItemId] = useState(null)

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items"))
    if(items)
    {
      setitems(items)
    }
  }, [])
  
  const savepending = () =>{
    localStorage.setItem("items",JSON.stringify(items))
  }

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("finishedItems"))
    if(items)
    {
      setfinishedItems(items)
    }
  }, [])
  
  const savecompleted = () =>{
    localStorage.setItem("finishedItems",JSON.stringify(finishedItems))
  }



  function getCurrentDateTime()
  {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedDateTime = `${formattedDate} ${formattedTime}`;
    return formattedDateTime;
  }

  function updateItem(e) {
    if (EditingItemId == null) {
      setinput(e.target.value)
    }
    else
      alert("First save the changes before adding a new task.")
  }

  const AddItems = () => {
    const date_time = getCurrentDateTime()
    console.log(items)
    setitems([...items, { id: uuidv4(), input, IsCompleted: false,date_time:date_time }])
    setinput("")
    savepending()
  }

  function DelItems(e) {
    const confirmed = confirm("Are you sure you want to delete this task?")
    if (confirmed) {
      const id = e.target.name
      const newItems = items.filter(item => item.id != id)
      setitems(newItems)
      savepending()
    }
  }

  function EditItems(e) {
    const id = e.target.name
    setEditingItemId(id)
    savepending()
  }

  function handleEditInputChange(e) {
    const id = e.target.name
    const newItems = items.map((item) => item.id === id ? { ...item, input: e.target.value } : item)
    setitems(newItems)
  }

  function handleEditDeleteItem(e) {
    const id = e.target.name
    const newItems = finishedItems.map((item) => item.id === id ? { ...item, input: e.target.value } : item)
    setfinishedItems(newItems)
    savecompleted()
  }

  function handleSaveClick() {
    setEditingItemId(null);
    savepending()
    savecompleted()
  }

  function OnCheck(e) {
    const Id = e.target.name
    const newItems = items.filter(item => item.id != Id)
    setitems(newItems)
    const date_time = getCurrentDateTime()
    items.map(({input,id})=>{
      if(id==Id)
      {
        setfinishedItems([...finishedItems,{id:uuidv4(),input,IsCompleted:true,date_time:date_time}])
        savepending()
        savecompleted()
      }
    })
    console.log("finished = ",finishedItems)
  }

  function DeleteFinished(e)
  {
    const id = e.target.name
    const newItems = finishedItems.filter(item=>item.id!=id)
    setfinishedItems(newItems)
    savecompleted()
  }


  return (
    <>
      <div className="container bg-black h-[100vh] w-[100%]">
        <Navbar />
        <div className="box mt-1 w-[100%]  bg-pink-300 rounded-3xl flex flex-col border-s-violet-100  items-center py-10 ">
          <div className="innerbox ">
            <div className="title text-center py-2 "><h2 className='font-extrabold text-xl' >Add your tasks here :</h2></div>
            <div className="inputs flex items-center ">
              <input onKeyUp={(e) => {
                if (e.key === "Enter" && (input.length > 5)) AddItems()
              }} autoFocus onChange={updateItem} value={input} className=' placeholder:normal-case placeholder:text-slate-400 block bg-white shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1  rounded-md p-2 mx-6 w-80  placeholder-gray-500  ' placeholder="Enter task..." type="text" />
              <button disabled={input.length <= 5} onClick={AddItems} className='bg-blue-400 p-1 rounded-sm text-xl w-16 hover:bg-blue-500 disabled:bg-blue-300 disabled:text-white ' type="button">Add</button>
            </div>
          </div>
          <div className="content flex flex-col items-center   my-10 w-10/12">
            <div className="tasksTitle w-8/12 ">
              <h2 className='my-2 text-xl font-bold' >Your Tasks :</h2>
              <div className="line border-solid border-2 max-w-full "></div>
            </div>
            <div className="tasks w-5/6 my-10  ">
              <div className="pending_task mb-10">
                <h2 className='mb-2 text-xl underline' >Pending Tasks:</h2>
                {
                  items.length == 0 ? <h2 className='text-center' >No Pending tasks ...</h2> : items.map(({ input, id ,IsCompleted,date_time}) => {
                    return (
                      <div key={id} className="content bg-orange-300 flex justify-between px-5 py-6  rounded-2xl ">
                        <div className="  left flex gap-5 items-center mr-5 w-11/12">
                          <input disabled={EditingItemId != null}  checked={IsCompleted} onChange={OnCheck} type="checkbox" name={id} id="checkbox" />
                          <div className="task bg-teal-300 py-2 px-2 rounded-lg ">
                            {
                              EditingItemId === id ? (
                                <input className='p-1 bg-violet-100 w-[40vw]'
                                  type="text"
                                  value={input}
                                  onChange={(e) => handleEditInputChange(e, id)}
                                  name={id}
                                  autoFocus
                                />
                              ) : (
                                <h2>{input}</h2>
                              )
                            }
                          </div>
                        </div>
                        <div className=" right flex gap-5 items-center ">
                          {
                            EditingItemId === id ? (
                              <button onClick={handleSaveClick} type="button " className='bg-green-700 text-white rounded-md py-1 px-2 hover:bg-green-600'>Save</button>
                            ) :
                              (
                                <button onClick={EditItems} name={id} type="button " className='bg-green-700 text-white rounded-md py-1 px-2 hover:bg-green-600'>Edit</button>
                              )
                          }
                          <button onClick={DelItems} name={id} type="button" className='bg-red-700 text-white rounded-md py-1 px-2 hover:bg-red-600 '>Delete</button>
                          <div className="date_time text-fuchsia-700 font-bold">
                            <h2>{date_time}</h2>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              <div className="completed_task">
                <h2 className='mb-2 text-xl underline' >Completed Tasks:</h2>
                {
                  finishedItems.length == 0 ? <h2 className='text-center' >No Completed tasks ...</h2> : finishedItems.map(({input,id,date_time}) => {
                    return (
                      <div key={id} className="content bg-orange-200 flex justify-between px-5 py-6  rounded-xl  ">
                        <div className="  left flex gap-5 items-center mr-5 w-11/12">
                          <div className="task bg-teal-500 py-2 px-2 rounded-lg   ">
                            {
                              EditingItemId === id ? (
                                <input className='p-1 bg-violet-100 w-[40vw] '
                                  type="text "
                                  value={input}
                                  onChange={(e) => handleEditDeleteItem(e, id)}
                                  name={id} autoFocus
                                />
                              ) : (
                                <h2 className='line-through'>{input}</h2>
                              )
                            }
                          </div>
                        </div>
                        <div className=" right flex gap-5 items-center ">
                          {
                            EditingItemId === id ? (
                              <button onClick={handleSaveClick} type="button " className='bg-green-700 text-white rounded-md py-1 px-2 hover:bg-green-600'>Save</button>
                            ) :
                              (
                                <button onClick={EditItems} name={id} type="button " className='bg-green-700 text-white rounded-md py-1 px-2 hover:bg-green-600'>Edit</button>
                              )
                          }
                          <button name={id} onClick={DeleteFinished}  type="button" className='bg-red-700 text-white rounded-md py-1 px-2 hover:bg-red-600 '>Delete</button>
                          <div className="date_time text-fuchsia-700 font-bold">
                            <h2>{date_time}</h2>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App

