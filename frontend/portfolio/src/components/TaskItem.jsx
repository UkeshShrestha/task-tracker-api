export default function TaskItem({task, onToggle, onDelete}){
    return(
        <li
        style ={{
            display:"flex",
            alignItems:"center",
            justifyContent: "space-between",
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
                checked={task.isCompleted}
                onChange={() => onToggle(task)}
                />
                <span style ={{textDecoration: task.isCompleted ? "line-through" : "none"}}>
                    {task.title}
                </span>
            </label>
            <button onClick={() => onDelete(task.id)} style={{padding: "6px 10px"}}>
                Delete
            </button>

        </li>
    );
}