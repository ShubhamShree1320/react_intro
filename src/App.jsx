import { useState, useEffect } from 'react'

export default function App() {
  const [newItem, setNewItem] = useState("")
  const [todos, setTodos] = useState(()=>{
    const saved = localStorage.getItem("todos")
    if (saved===null) return []
    else return JSON.parse(saved)
  })

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  function handleSubmit(e) {
    e.preventDefault()
    if (newItem.trim() === "") return // Prevent adding empty todos

    setTodos((current) => {
      return [...current, {
        id: Date.now(),
        text: newItem
      }]
    })

    setNewItem("") // Clear the input field after adding a todo
  }

  function handleDelete(id) {
    setTodos(current => current.filter(todo => todo.id !== id))
  }

  return (
    <>
      <h1 className="app-title" style={{ textAlign: 'center' }}>Todo App</h1>
      <form onSubmit={handleSubmit} className="form-label" style={{ display: 'flex', gap: '1rem' }}>
        <label htmlFor="todo">
          Todo:
          <input value={newItem} onChange={(e) => setNewItem(e.target.value)} type="text" id="todo" />
        </label>
        <button type="submit">Submit</button>
      </form>
      <h1 className="todo-list">Todo List</h1>
      <ul className="todo-list">
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <input type="checkbox" />
              <label htmlFor={`todo-${todo.id}`}>{todo.text}</label>
              <button 
                className="delete" 
                style={{ backgroundColor:'red',color:'black',height:'20px',width:'100px'}} 
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}
