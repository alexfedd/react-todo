import { useState } from "react";
import { useEffect } from "react";
import plus from "./assets/plus.svg";
import { Task } from "./Task";
import { Modal } from "./Modal";
import "./app.scss";

function App() {
  const [todoList, setTodoList] = useState([]); // list with all tasks
  let [taskInput, setTaskInput] = useState(""); // input value to add a new task
  const [isModalOpen, setIsModalOpen] = useState(false); // boolean var for opening a modal window
  const [currentItemId, setCurrentItemId] = useState(0); // var storing id of a task which triggered modal window opening
  const [didUpdate, setDidUpdate] = useState(true); // var to update states (in case when we update only objects inside a list)

  useEffect(() => {
    const loadFromLocalStorage = () => {
      if (localStorage.getItem("todoList")) {
        setTodoList(JSON.parse(localStorage.getItem("todoList")));
      }
    };
    loadFromLocalStorage();
  }, []);
  const updateLocalStorage = (updatedTodoList) => {
    localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
  };

  // Function to open a modal window by clicking on a task
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
    setCurrentItemId(event.target.closest("li").id);
    event.stopPropagation();
  };

  // Close a modal window in case user clicked out of window borders or a close button
  const closeModal = () => {
    if (
      !event.target.closest(".modal-window__wrapper") ||
      event.target.closest(".modal-window__close-btn")
    ) {
      setIsModalOpen(!isModalOpen);
    }
  };

  // Function for editing the task title
  const handleEditTitle = () => {
    const newTodoList = todoList;
    newTodoList[currentItemId].title = event.target.value;
    setTodoList(newTodoList);
    updateLocalStorage(newTodoList);
    setDidUpdate(!didUpdate);
  };

  // Function for editing the task description
  const handleEditDescription = () => {
    const newTodoList = todoList;
    newTodoList[currentItemId].description = event.target.value;
    setTodoList(newTodoList);
    updateLocalStorage(newTodoList);
    setDidUpdate(!didUpdate);
  };

  // Function for handling input for adding a new task
  const handleInput = (event) => {
    setTaskInput(event.target.value);
  };

  // Function for adding a new task into the list
  const addToList = (event) => {
    event.preventDefault();
    if (taskInput != "") {
      const newItem = {
        title: taskInput,
        isCompleted: false,
        description: "",
      };
      setTodoList([...todoList, newItem]);
      setTaskInput("");
      event.target.closest("form").reset();
      updateLocalStorage([...todoList, newItem]);
    }
  };

  // Function that handle button click to complete/uncomplete a task
  const handleComplete = (event) => {
    event.stopPropagation();
    const newTodoList = todoList;
    const currentItem = event.target.closest("li")
      ? event.target.closest("li").id
      : currentItemId;
    newTodoList[currentItem].isCompleted =
      !newTodoList[currentItem].isCompleted;
    setTodoList(newTodoList);
    updateLocalStorage(newTodoList);
    setDidUpdate(!didUpdate);
  };

  // Function that handle button click to delete a task
  const handleDelete = () => {
    setTodoList((prev) => (prev = prev.toSpliced(currentItemId, 1)));
    setIsModalOpen(!isModalOpen);
    updateLocalStorage(todoList.toSpliced(currentItemId, 1));
  };

  return (
    <div className="container">
      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          item={todoList[currentItemId]}
          handleEditTitle={handleEditTitle}
          handleEditDescription={handleEditDescription}
          handleDelete={handleDelete}
          handleComplete={handleComplete}
        />
      )}
      <ul className="todo-list">
        {todoList.map((value, index) => {
          return (
            <Task
              handleModal={handleModal}
              key={index}
              index={index}
              isCompleted={value.isCompleted}
              handleComplete={handleComplete}
              title={value.title}
            />
          );
        })}
      </ul>
      <form className="task-adding">
        <input
          onChange={handleInput}
          type="text"
          className="task-adding__input"
          placeholder="New task..."
        />
        <button onClick={addToList} className="task-adding__button">
          <img src={plus} alt="" className="task-adding__plus-image" />
        </button>
      </form>
    </div>
  );
}

export default App;
