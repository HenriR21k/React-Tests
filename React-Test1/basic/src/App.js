import "./App.css";
import { ImGlass, ImDownload } from "react-icons/im";
import { AiOutlineFileSearch } from "react-icons/ai";
import ListItem from "./components/ListItem";
import { useEffect, useState } from "react";


const App = () => {
  const [task, setTask] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // New state for the search query
  const [allTasks, setAllTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  const addTask = (e) => {
    e.preventDefault();

    const taskItem = {
      id: new Date().getTime(),
      text: task,
      isChecked: false,
    };

    if (task !== "") {
      setAllTasks([...allTasks, taskItem]);
      setTask("");
    }
  };

  const getAllTasks = () => {
    let stored = JSON.parse(localStorage.getItem("task"));

    if (stored) {
      setAllTasks(stored);
    }
  };

  const toggleChecked = (id) => {
    let updatedTasks = allTasks.map((task) => {
      if (task.id === id) {
        task.isChecked = !task.isChecked;
      }
      return task;
    });

    setAllTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const filteredTasks = allTasks.filter((task) => task.id !== id);
    setAllTasks(filteredTasks);
  };

  const editTaskText = (id, newText) => {
    const updatedTasks = allTasks.map((task) => {
      if (task.id === id) {
        task.text = newText;
      }
      return task;
    });
    setAllTasks(updatedTasks);
  };

  const searchTasks = () => {
    // Filter tasks based on the searchQuery
    const filteredTasks = allTasks.filter((task) =>
      task.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredTasks;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Set the searchQuery state when the "Search" button is clicked
    setSearchQuery(task);
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(allTasks));
  }, [allTasks]);

  return (
    <div className="App">
      <div className="App_task">
        <form className="App_input_wrapper" onSubmit={addTask}>
          <input
            type={"text"}
            className="App_input"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <div className="App_input_button" onClick={addTask}>
            <ImDownload />
          </div>
          <div className="App_input_button" onClick={handleSearch}>
            <AiOutlineFileSearch />
          </div>
        </form>

        <div className="App_task_list">
          {searchQuery !== "" ? (
            searchTasks().map((task) => (
              <ListItem
                key={task.id}
                task={task}
                deleteTask={() => deleteTask(task.id)}
                toggleChecked={() => toggleChecked(task.id)}
                editTaskText={(newText) => editTaskText(task.id, newText)}
              />
            ))
          ) : (
            allTasks.map((task) => (
              <ListItem
                key={task.id}
                task={task}
                deleteTask={() => deleteTask(task.id)}
                toggleChecked={() => toggleChecked(task.id)}
                editTaskText={(newText) => editTaskText(task.id, newText)}
              />
            ))
          )}

          {allTasks.length === 0 && <p className="empty">There are no tasks</p>}
        </div>
      </div>
    </div>
  );
};

export default App;
