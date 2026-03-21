import { useNavigate } from "react-router-dom";



export default function Home() {
const navigate = useNavigate();
const apps = [
  { name: "Task Manager", icon: "📝", path: "/tasks" },
  { name: "Calculator", icon: "🧮", path: "/calculator" },
  { name: "Weather", icon: "🌤️", path: "/weather" },
  { name: "Expense Tracker", icon: "💵", path: "/expenses" },
  { name: "Quiz", icon: "🏆", path: "/quiz" },
  { name: "Chatbot", icon: "🤖", path: "/chatbot" },
  { name: "Email", icon: "📧", path: "/email" }
];

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>
        My Apps
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 20
      }}>
        {apps.map((app) => (
          <div
            key={app.name}
            onClick={() => navigate(app.path)}
            style={{
              padding: 20,
              border: "1px solid #333",
              borderRadius: 12,
              cursor: "pointer",
              textAlign: "center"
            }}
          >
            <div style={{ fontSize: 40 }}>{app.icon}</div>
            <p>{app.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}