export default function TaskForm({title, setTitle, onAdd, isAdding}){
    const trimmed = title.trim();
    const canSubmit = trimmed.length > 0 && !isAdding;
    return (
        <form onSubmit={onAdd} style={{display: "flex", gap: 8}}>
            <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a task..."
            style={{flex:1, padding:10}} />
            <button type="submit" style={{padding: "10px 14px"}} disabled={!canSubmit}>{isAdding ? "Adding..." : "Add"}</button>
        </form>
    )
}