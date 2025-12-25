import {useEffect, useState} from "react";
import{
  getTasks,
  createTask,
  updateTaskCompletion,
  deleteTask
} from "./api/tasksApi";

export default function App(){
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load(){
    setError("");
    setLoading(true);
    try{
      const data = await getTasks();
      setTasks(data);
    } 
    catch(e){
      setError(e.message || "Something went wrong");
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    load();
  }, []);

  async function onAdd(e){
    e.preventDefault();
    const trimmed = title.trim();
    if(!trimmed) return;

    setError("");
    try{
      const created = await createTask(trimmed);
      setTasks((prev) => [created, ...prev]);
      setTitle("");
    }
    catch(e){
      setError(e.message || "Failed to add task")
    }
  }

  async function onToggle(task){
    setError("");
    try{
      const updated = await updateTaskCompletion(task.id, !task.isCompleted);
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    }
    catch(e){
      setError(e.message || "Failed to update task");
    }
  }

  async function onDelete(id){
    setError("");
    try{
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
    catch (e){
      setError(e.message || "Failed to delete task");
    }
  }

  return(
    <div style = {{maxWidth: 720, margin: "40px auto", padding: 16}}>
      
      <h1>Task Manager</h1>

      <form onSubmit = {onAdd} style = {{display: "flex", gap: 8}}>
        <input value = {title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder = "Add a task..."
        style={{flex:1, padding: 10}}
        />
        <button type="submit" style={{padding: "10px 14px"}}>
          Add
        </button>
      </form>

      {error && (
        <p style={{marginTop: 12}}>
          <strong>Error:</strong>{error}
        </p>
      )}

      {loading ? (
        <p style = {{marginTop: 16}}>Loading...</p>
      ) : tasks.length === 0? (
        <p style ={{marginTop: 16}}>No tasks yet.</p>
      ) : (
        <ul style = {{listStyle: "none", padding: 0, marginTop: 16}}>
          {tasks.map((t) => (
            <li key = {t.id}
            style = {{
              display:"flex",
              alignItems:"center",
              justifyContet: "space-between",
              gap: 12,
              padding: 12,
              border: "1px solid #333",
              borderRadius: 10,
              marginBottom: 10
            }}
            >
              <label style={{display: "flex", alignItems: "center", gap: 10}}>
                <input
                type="checkbox"
                checked={t.isCompleted}
                onChange={() => onToggle(t)}
                />
                <span style ={{textDecoration: t.isCompleted ? "line-through" : "none"}}>
                  {t.title}
                </span>
              </label>
              <button onClick={() => onDelete(t.id)} style={{padding: "6px 10px"}}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}