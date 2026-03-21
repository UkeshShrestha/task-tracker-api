import TaskItem from "./TaskItem";

export default function TaskList({tasks, onToggle, onDelete})
{
    return (
        <ul style={{listStyle: "none", padding: 0}}>
            {tasks.map(t => (
                <TaskItem
                key={t.id}
                task={t}
                onToggle={onToggle}
                onDelete={onDelete}
                />
            ))}
        </ul>
    );
}