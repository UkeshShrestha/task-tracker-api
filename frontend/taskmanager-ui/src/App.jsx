// Disable Add when input is empty or while saving

// Show “Adding…” while saving

// Disable toggle/delete while a request is running (optional, but good)

// Clearer error handling

import {useEffect, useState} from "react";
import{
  getTasks,
  createTask,
  updateTaskCompletion,
  deleteTask
} from "./api/tasksApi";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App(){
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [busyIds, setBusyIds] = useState(() => new Set());
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.isCompleted;
    if (filter === "active") return !task.isCompleted;
    return true;
  });

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
    if(!trimmed || isAdding) return;

    setError("");
    try{
      setIsAdding(true);
      const created = await createTask(trimmed);
      setTasks((prev) => [created, ...prev]);
      setTitle("");
    }
    catch(e){
      setError(e.message || "Failed to add task")
    }
    finally{
      setIsAdding(false);
    }
  }

  async function onToggle(task){
    if(isBusy(task.id)) return;
    setError("");
    try{
      markBusy(task.id);
      const updated = await updateTaskCompletion(task.id, !task.isCompleted);
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    }
    catch(e){
      setError(e.message || "Failed to update task");
    }
    finally{
      unmarkBusy(task.id);
    }
  }

  async function onDelete(id){
    if(isBusy(id)) return;
    setError("");
    markBusy(id);
    try{
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
    catch (e){
      setError(e.message || "Failed to delete task");
    }
    finally{
      unmarkBusy(id);
    }
  }
   function markBusy(id){
      setBusyIds((prev) => new Set(prev).add(id));
    }
    
    function unmarkBusy(id){
      setBusyIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
    function isBusy(id){
      return busyIds.has(id);
    }


  return(
    <div style = {{maxWidth: 720, margin: "40px auto", padding: 16}}>
      
      <h1>Task Manager</h1>

      <TaskForm title={title} setTitle={setTitle} onAdd={onAdd} isAdding={isAdding}></TaskForm>

      {error && (
        <p style={{marginTop: 12}}>
          <strong>Error: </strong>{error}
        </p>
      )}

      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <button onClick={() => setFilter("all")} disabled={filter === "all"}>All</button>
        <button onClick={() => setFilter("active")} disabled={filter === "active"}>Active</button>
        <button onClick={() => setFilter("completed")} disabled={filter === "completed"}>Completed</button>
      </div>

      {loading ? (
        <p style = {{marginTop: 16}}>Loading...</p>
      ) : tasks.length === 0? (
        <p style ={{marginTop: 16}}>No tasks yet.</p>
      ) : (
        <TaskList tasks={filteredTasks} onToggle={onToggle} onDelete={onDelete} busyIds={busyIds}></TaskList>
      )}

    </div>
  );
}