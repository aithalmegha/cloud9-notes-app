import { useState, type KeyboardEvent } from "react";
//import { BsArchive } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
//import styles from "./styles.module.css";
import "./Button.css";
import type { ListEntity } from "./ListEntity";

interface Props {
  items: ListEntity[];
  heading: string;
  onSelectItem: (index: number) => void;
  isNewItemInputVisible: boolean;
  onAddNewItemToListGroup: (item: string) => void;
  selectedId: number;
  onDeleteItem: (index: number) => void;
}

function ListGroup({
  items,
  heading,
  onSelectItem,
  isNewItemInputVisible,
  onAddNewItemToListGroup,
  selectedId,
  onDeleteItem,
}: Props) {
  //Hook
  //const [selectedIndex, setSelectedIndex] = useState(selectedIndexFromParent);
  const [newInputItemValue, setnewInputItemValue] = useState(""); //used to add new title for a new note
  //const [hidenewItemInput, setHideNewItemInput] = useState<boolean>(false);

  const handleGetNewNoteTitle = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.trim() !== "" && e.key === "Enter") {
      let newTitleEntered = e.currentTarget.value.trim();
      onAddNewItemToListGroup(newTitleEntered);
      setnewInputItemValue("");
    }
  };

  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No item found</p>}
      <div className="list-group">
        {items.map((item) => (
          <a
            href="#"
            className={
              selectedId === item.id
                ? "list-group-item list-group-item-action active"
                : "list-group-item"
              //list-group-item-action"
            }
            key={item.id}
            onClick={() => {
              //setSelectedIndex(index);
              console.log(item.id);
              onSelectItem(item.id);
            }}
          >
            <span>{item.title}</span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteItem(item.id);
              }}
              className={"my-button"}
              type="button"
              //className="btn btn-danger"
              style={{
                //background: "none",
                border: "none",
                cursor: "pointer",
                color: "red",
                //marginLeft: "auto",
                float: "right",
              }}
              aria-label="Delete item"
            >
              <MdDelete size={20} />
            </button>
          </a>
        ))}

        {isNewItemInputVisible === true && (
          <input
            type="text"
            autoFocus
            id="NewTitleID"
            value={newInputItemValue}
            onChange={(e) => setnewInputItemValue(e.target.value)}
            onKeyDown={handleGetNewNoteTitle}
            placeholder="Type new note title and press enter"
            style={{ width: "100%", padding: "10px" }}
          />
        )}
      </div>
    </>
  );
}

export default ListGroup;
