"use client"
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
let nextId = 0;
let isVisible = false;
export default function todoList() {
  const [name, setName] = useState('');
  const [todos, setTodos] = useState([]);
  function handleClearRow(removeId) {
    setTodos((prevState) => prevState.filter(({ id }) => id !== removeId));
  }
  function handleAddTodo(){
    if(name){
      setTodos([
        ...todos,
        { id: nextId++, name: name, checked:0 }
      ]);
      isVisible = true;
      setName('');
    }
  }
  function handleCheck(e, todo){
    var ischk = 0;
    if(e.target.checked){
      ischk = 1;
      isVisible = false
    }
    const dataTodo = [...todos];
    const todoChange = dataTodo.find(
      a => a.id === todo.id
    );
    todoChange.checked = ischk;
    setTodos(dataTodo);
    isVisible = true
  }
  return (
    <>
    <main className="container col-4 p-24">
      <div className="col-12 d-flex">
        <input className='form-control col-6 m-2'
          value={name}
          placeholder='Please enter you to do...'
          onChange={e => setName(e.target.value)}
        />  
        <button className='btn btn-primary m-2' onClick={() => handleAddTodo() }>Add</button>
      </div>
      <div className="col-12">
          { (todos.length != 0 && isVisible === true) ? (
              <table className='table'>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Todo</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {todos.map(todo => (
                  <tr key={todo.id}>
                    <td><input key={todo.id} value={1} type="checkbox" onChange={(e) => handleCheck(e, todo)} /></td>
                    <td><span style={{'text-decoration': todo.checked == 1 ? 'line-through' : '' }} >{todo.name}</span></td>
                    <td><button disabled={todo.checked == 1 ? 'disabled' : ''} name="Delete" className='btn btn-danger' onClick={() => handleClearRow(todo.id)}>Delete</button></td>
                  </tr>
                ))}
                </tbody>
              </table>
            ) : ''
          }
        </div>
      </main>
    </>
  );
}