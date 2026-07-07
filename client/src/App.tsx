import { useEffect, useState, type ChangeEvent } from "react";
import "./App.css";
import ListGroup from "./ListGroup";
import Button from "./Button";
import type { ListEntity } from "./ListEntity";

function App() {
  // const noteSelected = useRef(-1);
  const [selectedNoteId, setSelectedNoteId] = useState(-1);
  const [notesTitle, setNotesTitle] = useState<ListEntity[]>([]);
  const [content, setContent] = useState<string>("");
  const [isNewTitleAddable, setIsNewTitleAddable] = useState(false);
  const [isNoteSelected, setIsNoteSelected] = useState(false);
  //const [isNoteDeleted, setIsNoteDeleted] = useState(false);

  // Handle changes with the correct event type
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const postContent = {
      id: selectedNoteId,
      content: e.target.value,
    };
    const updatedNoteContent = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postContent),
    };

    fetch("http://localhost:8080/updatedNote", updatedNoteContent)
      .then((response) => {
        return response.text();
      })
      .then((responseText) => {
        let contentUpdated = JSON.parse(responseText) as boolean;
        console.log("Response received: " + contentUpdated);
        if (contentUpdated) {
          setContent(postContent.content);
        } else {
          console.log("Content wasn't updated");
        }
      })
      .catch((error) => {
        console.log("Error fetching Content ", error);
      });
  };

  useEffect(() => {
    fetch("http://localhost:8080/getAllNotesTitle")
      .then((response) => {
        return response.text();
      })
      .then((responseText) => {
        let allNotesTitle = JSON.parse(responseText) as [ListEntity];
        setNotesTitle(allNotesTitle);
        console.log("UseEffect fetch updated: " + allNotesTitle);
      })
      .catch((error) => {
        console.log("Error fetching ", error);
      });
  }, []);

  function handleNoteSelection(selectedNoteId: number) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedNoteId),
    };
    fetch("http://localhost:8080/noteSelected", requestOptions)
      .then((response) => {
        return response.text();
      })
      .then((responseText) => {
        console.log("Response received: " + responseText);
        setContent(responseText);
      })
      .catch((error) => {
        console.log("Error fetching Content ", error);
      });
  }

  function handleAddnewNote(newNoteTitle: string) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: newNoteTitle,
    };
    fetch("http://localhost:8080/newNote", requestOptions)
      .then((response) => {
        return response.text();
      })
      .then((responseText) => {
        let responseTextId = JSON.parse(responseText) as number;
        let listEntityObj = {
          id: responseTextId,
          title: newNoteTitle,
        };
        console.log("Response received: " + responseTextId);
        setNotesTitle([...notesTitle, listEntityObj]);
        //used notes.length instead of notes.length-1 because, notes array gets updated asynchronously later.
        //At this point of time the responseText is not yet added to the array.
        setSelectedNoteId(responseTextId);
        handleNoteSelection(responseTextId);
        setIsNoteSelected(true);
        setIsNewTitleAddable(false);
      })
      .catch((error) => {
        console.log("Error fetching Content ", error);
      });
  }

  function handleNoteDeletion(deletingNoteId: number) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deletingNoteId),
    };

    //noteSelected.current = selectedNoteId;
    fetch("http://localhost:8080/noteToDelete", requestOptions)
      .then((response) => {
        return response.text();
      })
      .then((responseText) => {
        console.log("Response received: " + responseText);
        const responseTextId = JSON.parse(responseText) as number;
        setNotesTitle((notesTitle) =>
          notesTitle.filter((item) => item.id !== responseTextId),
        );
        if (selectedNoteId == responseTextId) {
          setSelectedNoteId(-1);
          setIsNoteSelected(false);
        }
        //console.log("notestitle after deletion ", notesTitle);
      })
      .catch((error) => {
        console.log("Error fetching Content ", error);
      });
  }

  return (
    <>
      <ListGroup
        items={notesTitle}
        heading="Save iT"
        onSelectItem={(selectedId) => {
          handleNoteSelection(selectedId);
          setSelectedNoteId(selectedId);
          setIsNoteSelected(true);
          setIsNewTitleAddable(false);
        }}
        isNewItemInputVisible={isNewTitleAddable}
        onAddNewItemToListGroup={(newNoteTitle) => {
          handleAddnewNote(newNoteTitle);
        }}
        selectedId={selectedNoteId}
        onDeleteItem={(noteDeletingId) => {
          handleNoteDeletion(noteDeletingId);
        }}
      />

      {isNoteSelected === true && (
        <div className="note-container">
          <textarea
            name="ContentTextArea"
            value={content}
            onChange={handleChange}
            placeholder="Type your note here..."
            rows={10}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>
      )}

      <div key="+">
        {/* <Button buttonType="Green" text="+" onClick={handleAddnewNote} /> */}
        <Button
          buttonType="Green"
          text="+"
          onClick={() => {
            setIsNewTitleAddable(true);
            setIsNoteSelected(false);
          }}
        />
      </div>
    </>
  );
}

export default App;
