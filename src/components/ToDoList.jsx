export default function ToDoList({todo, DeleteTodo}){
    return (
        <div id = {todo.id} className = "list">
            <span>{todo.title}</span>
            <button onClick={(e)=>{
                DeleteTodo(e.target.parentElement.id);
            }}>Delete</button>
        </div>
    );
}