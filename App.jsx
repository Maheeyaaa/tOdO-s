import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    console.log(todos);
    saveToLS()
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS()
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS()
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS()
  };

  const toggleFinished= (e) => {
    setshowFinished(!showFinished)
  }
  

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  return (

    <div>

      <Navbar />

      <div className="container mx-auto m-6 border border-amber-50 bg-blue-200 rounded-lg p-4 min-h-[80vh] min-w-[150px] w-full sm:w-5/6 md:w-3/4 lg:w-1/2">
      <h1 className='font-bold text-center text-amber-50 text-xl'>tOdO's - Manage yours todos at one place</h1>
        <div className="add flex flex-col gap-2 w-full">

          <h2 className='text-amber-50 m-1'>Add Your tOdO's</h2>
          <input type="text" value={todo} onChange={handleChange} className=' bg-amber-50 rounded-full p-2 w-full hover:cursor-pointer hover: border border-blue-700' />
          <button onClick={handleAdd} disabled={todo.length<= 3} className='disabled:bg-blue-600 text-amber-50 bg-blue-700 rounded-xl p-2 py-1.5 hover:bg-amber-50 hover:text-blue-700 hover:cursor-pointer font-bold'>Save</button>
        </div>

        <div className="todos text-amber-50 m-1 my-6 w-[85%] mx-auto">

          <input id="show" onChange={toggleFinished} type="checkbox" checked={showFinished} />
          <label className='mx-2' htmlFor="show" >Show Finished</label>
          <div className="h-px bg-black opacity-15"></div>
          <h1 className='font-bold text-l text-amber-50 my-3'>Your tOdO's</h1>
          <div className="todos">
            {todos.length === 0 && <div className='text-amber-50 m-1.5'>No tOdO's have been added yet!</div>}

            {todos.map(item => {
              return (showFinished|| !item.isCompleted) && <div key={item.id} className="todo flex flex-col sm:flex-row justify-between gap-3 my-2.5 w-full">

                <div className='flex gap-5 items-center'>
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                  <div className='text-amber-50'>
                    <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                  </div>
                </div>

                <div className="buttons flex h-full">
                  <button onClick={(e) => handleEdit(e, item.id)} className='text-amber-50 bg-blue-700 rounded-sm mx-2 p-2 py-1.5 hover:bg-amber-50 hover:text-blue-700 hover:cursor-pointer font-bold'><FaRegEdit /></button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='text-amber-50 bg-blue-700 rounded-sm mx-2 p-2 py-1.5 hover:bg-amber-50 hover:text-blue-700 hover:cursor-pointer font-bold'><MdDelete /></button>
                </div>

              </div>
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
