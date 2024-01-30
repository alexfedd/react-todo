import uncompleteBtn from "./assets/uncomplete.svg";
import closeBtn from "./assets/close.svg";
import completeBtn from "./assets/complete.svg";
import deleteBtn from "./assets/delete.svg";

export function Modal (props) {
    return (  
        <div onClick={props.closeModal} className="modal-window">
        <div className="modal-window__wrapper">
          <img src={closeBtn} alt="" className="modal-window__close-btn" />
          <div className="modal-window__input-wrapper">
            <input
              defaultValue={props.item.title}
              onChange={props.handleEditTitle}
              type="text"
              className="modal-window__title-input"
            />
          </div>
          <textarea
            defaultValue={props.item.description}
            onChange={props.handleEditDescription}
            type="text"
            placeholder="Описание"
            className="modal-window__descr-input"
          />
          <div className="modal-window__functions">
            <button
              onClick={props.handleDelete}
              className="modal-window__btn modal-window__delete-btn"
            >
              <img src={deleteBtn} alt="" className="modal-window__btn-img" />
              <p className="modal-window__btn-text">Delete task</p>
            </button>
            <button
              onClick={props.handleComplete}
              className="modal-window__btn modal-window__complete-btn"
            >
              <img
                src={
                    props.item.isCompleted
                    ? uncompleteBtn
                    : completeBtn
                }
                alt=""
                className="modal-window__btn-img"
              />
              <p className="modal-window__btn-text">
                {props.item.isCompleted
                  ? "Uncomplete task"
                  : "Complete task"}
              </p>
            </button>
          </div>
        </div>
      </div>
    );
}
