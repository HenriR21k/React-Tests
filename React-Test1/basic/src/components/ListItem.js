import "./listItem.css";
import { AiOutlineCheck } from "react-icons/ai";
import { ImBin, ImPencil, ImUpload } from "react-icons/im";
import { useState } from "react";

const ListItem = ({ task, deletetask, toggleChecked, edittaskText }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    edittaskText(newText);
    setIsEditing(false);
  };

  return (
    <div className="task">
      <div
        className={`${task.isChecked ? "task_radio" : "task_radio_unchecked"}`}
        onClick={toggleChecked}
      >
        {task.isChecked && <AiOutlineCheck />}
      </div>

      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="transparent-input"
        />
      ) : (
        <div
          className={` ${task.isChecked ? "task_text_checked" : "task_text"}`}
        >
          {task.text}
        </div>
      )}

      <div className="task_actions">
        {isEditing ? (
          
          <div className="task_btn">
          <ImUpload onClick={handleSave}/>
          </div>

        ) : (
          <div className="task_btn">
          <ImPencil onClick={handleEdit}/>
          </div>
        )}
        <div className="task_btn">
          <ImBin onClick={deletetask} />
          </div>

      </div>
    </div>
  );
};

export default ListItem;
