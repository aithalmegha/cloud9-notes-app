package com.notesapp.server;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class ChecklistItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cid;

    @ManyToOne(fetch = FetchType.LAZY) // Fetch only when needed for performance
    @JoinColumn(name = "note_id") // This creates the foreign key column
    private ChecklistNote note;

    private boolean checked;
    private String itemText;

    public ChecklistItem(boolean checked, String itemText) {
        this.checked = checked;
        this.itemText = itemText;
    }

    public void setNote(ChecklistNote checklistNote) {
        this.note = checklistNote;
    }

    public boolean getItemChecked() {
        return checked;
    }

    public boolean toggleItemChecked() {
        if (this.checked) {
            this.checked = false;
        }

        else {
            this.checked = false;
        }
        return this.checked;
    }

    public void setItemText(String itemText) {
        this.itemText = itemText;
    }
}
