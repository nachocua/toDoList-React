import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const leerLS = () => {
    let data = localStorage.getItem("datos");
    return data ? JSON.parse(data) : [];
  };

  const [newTask, setNewTask] = useState("");
  const [toDo, setTodo] = useState(leerLS());

  const handleAdd = () => {
    if (newTask !== "") {
      let lista = [...toDo];
      lista.push(newTask);
      setNewTask("");
      setTodo(lista);
    }
  };

  useEffect(() => {
    if (toDo.length > 0) {
      guardarLS();
    }
  }, [toDo]);

  const handleDelete = (item) => {
    setTodo(toDo.filter((value) => value !== item));
  };

  const guardarLS = () => {
    localStorage.setItem("datos", JSON.stringify(toDo));
  };

  return (
    <>
      <input
        style={{ marginRight: "15px" }}
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => (e.key === "Enter" ? handleAdd() : null)}
      ></input>
      <button onClick={handleAdd} disabled={newTask === ""}>
        Ejecutar
      </button>
      <ul>
        {toDo.map((item, indx) => (
          <li key={indx} style={{ listStyle: "none" }}>
            <span style={{ marginRight: "15px" }}>{item}</span>
            <button onClick={(e) => handleDelete(item)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
