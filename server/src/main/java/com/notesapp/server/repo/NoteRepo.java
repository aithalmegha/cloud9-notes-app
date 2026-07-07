package com.notesapp.server.repo;

import com.notesapp.server.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepo extends JpaRepository<Note, Integer> {

}