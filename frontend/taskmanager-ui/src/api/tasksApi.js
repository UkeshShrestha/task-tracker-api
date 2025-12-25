const baseUrl = import.meta.env.VITE_API_BASE_URL;

export async function getTasks(){
    const res = await fetch(`${baseUrl}/api/tasks`);
    if (!res.ok) throw new Error("Failed to load tasks");
    return await res.json();
}

export async function createTask(){
    const res = await fetch(`${baseUrl}/api/tasks`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({title})
    });
    if (!res.ok) throw new Error("Failed to create task");
    return await res.json();
}

export async function updateTaskCompletion(id, isCompleted){
    const res = await fetch(`${baseUrl}/api/tasks/${id}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({isCompleted})
    });
    if (!res.ok) throw new Error("Failed to update  task");
    return await res.json();
}

export async function deleteTask(id){
    const res = await fetch(`${baseUrl}/api/tasks/${id}`,{
        method: "DELETE"
    });
    if(!res.ok) throw new Error("Failed to delete task");
}