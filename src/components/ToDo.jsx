import {useState, useEffect} from "react";
import {nanoid} from "nanoid";
import ToDoList from "./ToDoList";

export default function ToDo(){

    const [input, setInput] = useState("");
    const [todos, setTodos] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(()=>{
        getTodos();
    }, [page])

    async function getTodos(){
        const res = await fetch(`http://localhost:3001/todos?_limit=4&_page=${page}`);
        const res_data = await res.json();
        setTodos(res_data);
    }

    async function saveTodo(){
        const todo = {
            title : input
        }
        await fetch("http://localhost:3001/todos", {
            method : "POST", 
            body : JSON.stringify(todo),
            headers : {
                "Content-Type" : "application/json"
            }
        });
        getTodos();
    }

    async function DeleteTodo(id)
    {
        await fetch(`http://localhost:3001/todos/${id}`, {
            method : "DELETE"
        });
        getTodos();
    }

    return (
        <div>

            <div>
                <input type="text" placeholder="enter todo" onChange={(e)=>{
                    setInput(e.target.value);
                }}/>
                <button onClick={saveTodo}>Save Todo</button>
            </div>

            {todos.map((todo)=>{
                return <ToDoList todo = {todo} key = {todo.id} DeleteTodo = {DeleteTodo} />
            })}

            <div>
                <button onClick={()=>{
                    if(page > 1)
                    {
                        setPage(page - 1);
                    }
                }}>Prev Page</button>
                <button onClick={()=>{
                    setPage(page + 1);
                }}>Next Page</button>
            </div>

        </div>
    );
}