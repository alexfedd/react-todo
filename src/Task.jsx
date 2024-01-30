/* eslint-disable react/prop-types */
import listItem from "./assets/list-item.svg";
import listItemActive from "./assets/list-item-active.svg";
export function Task(props) {
    return (
        <li
        onClick={props.handleModal}
        key={props.index}
        id={props.index}
        className={
          props.isCompleted
            ? "todo-list__item completed"
            : "todo-list__item"
        }
      >
        <button className="todo-list__button" onClick={props.handleComplete}>
          <img
            src={props.isCompleted ? listItemActive : listItem}
            alt=""
            className="todo-list__button-image"
          />
        </button>
        <p className="todo-list__item-title">{props.title}</p>
      </li>
    );
}
