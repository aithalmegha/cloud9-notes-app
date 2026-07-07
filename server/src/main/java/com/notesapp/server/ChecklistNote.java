package com.notesapp.server;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor // can remove later
@NoArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = false, onlyExplicitlyIncluded = true)
@DiscriminatorValue("CHECKLIST")
public class ChecklistNote extends Note {
    // private String content;
    // mappedBy refers to the field name in the child class
    @OneToMany(mappedBy = "note", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ChecklistItem> checkListItemContent = new ArrayList<>();

    @Override
    public Object getContent() {
        return this.checkListItemContent;
    }

    @Override
    public void setContent(Object content) {
        // ChecklistItem chkListItem = new ChecklistItem();
        // chkListItem.setItems(this.checkListItem);
    }

    public void addNewChecklistItem(ChecklistItem item) {
        checkListItemContent.add(item);
        item.setNote(this);
    }
}