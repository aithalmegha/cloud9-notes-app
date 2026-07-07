package com.notesapp.server.repo;

import com.notesapp.server.ChecklistItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChecklistItemRepo extends JpaRepository<ChecklistItem, Integer> {

}