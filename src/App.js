import React, { useState, useEffect} from 'react';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import './App.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function App() {
  const [todos, setTodos] = useState([]);
  const [nextId, setNextId] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  const [show, setShow] = useState(false);

  const [editingTodo, setEditingTodo] = useState(null);
  const [editText, setEditText] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = (todo) => {setEditingTodo(todo); setEditText(todo.text) ;setShow(true);};
  
  // console.log(editText);
  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos'); 
    const savedNextId = localStorage.getItem('nextId');
    if (savedTodos) { 
      setTodos(JSON.parse(savedTodos)); 
    }
    if (savedNextId) { 
      setNextId(parseInt(savedNextId)); 
    } 
  }, []); // Empty dependency array means this runs once on mount

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]); // This runs whenever todos array changes

    // Save nextId to localStorage whenever it changes
  useEffect(() => {
    if (nextId > 0){
      localStorage.setItem('nextId', nextId.toString()); 
    }
  }, [nextId]);

  const addTodo = (text, prio, due) => {
    const newTodo = {
    id: nextId,
    text: text,
    prio: prio,
    due: due,
    completed: false
    };
    setTodos([...todos, newTodo]);
    setNextId(nextId + 1);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    const delTodos = todos.filter(todo => todo.id !== id);
    setTodos(delTodos);
    localStorage.setItem('todos', JSON.stringify(delTodos));
    // setTodos(todos.filter(todo => todo.id !== id));
  };
  
  const editTodo = (e) => {
    e.preventDefault();
    if (editText.trim() !== ""){
      const editTodos = todos.map(todo=> 
        todo.id === editingTodo.id ? {...todo, text: editText} : todo
      );
      setTodos(editTodos);
    }
    setShow(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My TODO App</h1>
      </header>

      <main>
        <AddTodoForm onAddTodo={addTodo} />
        <form id="editModal">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="todo-input"
          />
        </form>
        {todos.length === 0 ? (
        <p className="no-todos">No TODOs yet. Add one above!</p>
        ) : (
        <ul className="todo-list">  
        {todos.filter(todo => todo.text.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a,b) => b.prio - a.prio).map(todo => 
        // console.log(todo.due)
        (
        <TodoItem
        key={todo.id}
        todo={todo}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onHandleShow={() => handleShow(todo)}
        />
        ))}
        </ul>
        )}
        <div className="todo-stats">
          <p>Total: {todos.length} | Completed: {todos.filter(t => t.completed).length}</p>
        </div>
        <form>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <input
                id="update"
                type="text"
                className=""
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              {/* <Button variant="secondary" onClick={handleClose}>
                Close
              </Button> */}
              <Button variant="primary" form="editModal" onClick={editTodo}>Update</Button>
            </Modal.Footer>
          </Modal>
        </form>
      </main>
    </div>
  );
}

export default App;