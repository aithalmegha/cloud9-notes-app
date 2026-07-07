package com.notesapp.server;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.notesapp.server.repo.ChecklistItemRepo;
import com.notesapp.server.repo.NoteRepo;
import com.notesapp.server.model.ContentEntity;
import com.notesapp.server.model.TitleEntity;

@SpringBootApplication
@RestController
@EnableAutoConfiguration(exclude = { ErrorMvcAutoConfiguration.class })
@CrossOrigin(origins = "http://localhost:5173/")
public class ServerApplication {
	// List<Note> notesList = new ArrayList<>();
	// String[] notesTitleArray = new String[notesList.size()];

	@Autowired
	private NoteRepo repo;

	@Autowired
	private ChecklistItemRepo chkListItemRepo;

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	public List<Note> getNotes() {
		return repo.findAll();
	}

	public Note getNoteById(int noteId) {
		return repo.findById(noteId).orElseThrow();
	}

	public void saveNote(Note note) {
		repo.save(Objects.requireNonNull(note));
	}

	// *****************************/

	public List<ChecklistItem> getChecklistItem() {
		return chkListItemRepo.findAll();
	}

	public ChecklistItem getChecklistItemByCId(int cid) {
		return chkListItemRepo.findById(cid).orElseThrow();
	}

	public void saveChecklistItem(ChecklistItem chkList) {
		chkListItemRepo.save(Objects.requireNonNull(chkList));
	}

	// *****************************/

	@CrossOrigin
	@GetMapping("/getAllNotesTitle")
	public List<TitleEntity> getAllNotesTitle() {
		List<Note> notesList = getNotes();
		List<TitleEntity> titleEntityList = new ArrayList<>();

		for (int i = 0; i < notesList.size(); i++) {
			TitleEntity titleEntity = new TitleEntity(notesList.get(i).getId(), notesList.get(i).getTitle());
			titleEntityList.add(titleEntity);
		}
		return titleEntityList;
	}

	@PostMapping("/noteSelected")
	public Object selectedNotes(@RequestBody int selectedNoteId) {
		System.out.println("Request received: " + selectedNoteId);
		Note noteElement = getNoteById(selectedNoteId);
		if (selectedNoteId == noteElement.getId()) {
			System.out.println("Content: " + noteElement.getContent());
			return noteElement.getContent();
		}
		return "No info found";
	}

	@PostMapping("/updatedNote")
	public boolean updatedNoteContent(@RequestBody ContentEntity contentEntity) {
		boolean result = true;
		try {
			Note notefound = getNoteById(contentEntity.getId());
			notefound.setContent(contentEntity.getContent());
			System.out.println("Found note: " + notefound.getTitle() + notefound.getId());
			saveNote(notefound);
			System.out.println("Request received: " + contentEntity);
		} catch (Exception ex) {
			System.out.println("Update content failed " + ex.getMessage());
			result = false;
		}
		return result;
	}

	@PostMapping("/newNote")
	public int addNewNote(@RequestBody String newNoteTitle) {
		addNewChecklistNote();
		TextNote newNote = TextNote.builder().build();
		newNote.setTitle(newNoteTitle);
		saveNote(newNote);

		return newNote.getId();
	}

	public void addNewChecklistNote() {
		ChecklistNote newNote = ChecklistNote.builder().build();
		newNote.addNewChecklistItem(new ChecklistItem(false, "Broccoli"));
		newNote.addNewChecklistItem(new ChecklistItem(true, "Banana"));
		newNote.setTitle("Grocery List");
		saveNote(newNote);
	}

	public boolean toggleCheckListItem(int cid) {
		ChecklistItem checkedItem = getChecklistItemByCId(cid);
		boolean toggledItem = checkedItem.toggleItemChecked();
		saveChecklistItem(checkedItem);
		return toggledItem;
	}

	public boolean updateChecklistItemText(@RequestBody ContentEntity contentEntity) {
		boolean result = true;
		try {
			ChecklistItem checkListItem = getChecklistItemByCId(contentEntity.getId());
			checkListItem.setItemText(contentEntity.getContent());
			saveChecklistItem(checkListItem);
		} catch (Exception ex) {
			System.out.println("Update content failed " + ex.getMessage());
			result = false;
		}
		return result;
	}

	@PostMapping("/noteToDelete")
	public int deleteNote(@RequestBody int deletingNoteId) {
		// String[] notesTitleArray = new String[notesList.size() - 1];
		repo.deleteById(deletingNoteId);
		List<Note> listOfNotes = getNotes();
		System.out.println("Notes after deleting: " + listOfNotes);
		return deletingNoteId;
	}
}