import { useState } from "react";

export default function Calculator() {
  const [input, setInput] = useState("");

  const buttons = [
    "7","8","9","/",
    "4","5","6","*",
    "1","2","3","-",
    "0",".","=","+"
  ];

  const handleClick = (value) => {
    setInput(prev => prev + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleEquals = () => {
    try {
      const res = eval(input);
      setInput(res.toString());
    } catch {
      setInput("Error");
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: "40px auto", textAlign: "center" }}>
      <h1>Calculator</h1>

      <input
        value={input}
        readOnly
        style={{ width: "92%", padding: 10, marginBottom: 10 }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 10
        }}
      >
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() =>
              btn === "=" ? handleEquals() : handleClick(btn)
            }
            style={{ padding: 15, fontSize: 16 }}
          >
            {btn}
          </button>
        ))}
      </div>

      <button
        onClick={handleClear}
        style={{ marginTop: 10, width: "100%", padding: 10 }}
      >
        Clear
      </button>
    </div>
  );
}