"use client";

import { DragField, ItemActions } from "@/components/ListItem/ListItem";
import React from "react";
import { useState } from "react";
import Button from "@/components/Button";
import ItemsList from "@/components/ItemsList";
import ListItem from "@/components/ListItem";
import { IListItem, IListItems } from "@/types/global";
import EmptyList from "@/components/EmptyList";
import { ItemFormValues } from "@/types/itemFormValues";
import EditItemForm from "../components/Forms/EditItemForm";
import AddItemForm from "../components/Forms/AddItemForm";

const DashboardView = () => {
  const [items, setItems] = useState<IListItems>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newItemParentId, setNewItemParentId] = useState<string | null>(null);
  const [editedItem, setEditedItem] = useState<IListItem | null>(null);

  const deleteItem = (itemId: string) => {
    const removeItem = (items: IListItem[]): IListItem[] =>
      items
        .filter((item) => item.id !== itemId)
        .map((item) => ({
          ...item,
          children: item.children ? removeItem(item.children) : [],
        }));

    setItems((prevItems) => removeItem(prevItems));
  };

  const editItem = (itemId: string) => {
    const findItemById = (items: IListItems): IListItem | null => {
      for (const item of items) {
        if (item.id === itemId) return item;

        const childResult = findItemById(item.children);
        if (childResult) return childResult;
      }
      return null;
    };

    const itemToEdit = findItemById(items);
    if (itemToEdit) {
      setEditedItem(itemToEdit);
    }
  };

  const addNewItemToParent = (parentId: string | null) => {
    setNewItemParentId(parentId);
  };

  const addItem = (parentId: string | null, values: ItemFormValues) => {
    const newItem = {
      id: String(Date.now()),
      label: values.label,
      url: values.url,
      children: [],
    };

    if (parentId === null) {
      setItems((prevItems) => [...prevItems, newItem]);
    } else {
      const addChildToItems = (items: IListItems): IListItems =>
        items.map((item) =>
          item.id === parentId
            ? { ...item, children: [...item.children, newItem] }
            : { ...item, children: addChildToItems(item.children) }
        );

      setItems((prevItems) => addChildToItems(prevItems));
    }

    setNewItemParentId(null);
  };

  const updateItem = (values: ItemFormValues) => {
    const updateItemById = (items: IListItems): IListItems =>
      items.map((item) =>
        item.id === editedItem?.id
          ? { ...item, label: values.label, url: values.url }
          : { ...item, children: updateItemById(item.children) }
      );

    setItems((prevItems) => updateItemById(prevItems));
    setEditedItem(null);
  };

  const renderItem = (item: IListItem, depth = 0) => (
    <React.Fragment key={item.id}>
      <ListItem id={item.id}>
        <DragField />

        <ItemActions
          item={item}
          onAddChild={() => addNewItemToParent(item.id)}
          onItemDelete={() => deleteItem(item.id)}
          onItemEdit={() => editItem(item.id)}
        />
      </ListItem>

      {editedItem?.id === item.id && (
        <EditItemForm
          onFormSubmit={updateItem}
          onClose={() => setEditedItem(null)}
          initialValues={{
            label: editedItem.label,
            url: editedItem.url,
          }}
          onDelete={() => deleteItem(editedItem.id)}
        />
      )}

      {item.children && item.children.length > 0 && (
        <ItemsList
          items={item.children}
          onChange={(newChildren) => {
            setItems((prevItems) =>
              prevItems.map((prevItem) =>
                prevItem.id === item.id
                  ? { ...prevItem, children: newChildren }
                  : prevItem
              )
            );
          }}
          renderItem={(childItem) => renderItem(childItem, depth + 1)}
          className={`pl-16`}
        />
      )}

      {newItemParentId === item.id && (
        <AddItemForm
          onFormSubmit={(values) => addItem(item.id, values)}
          onClose={() => setNewItemParentId(null)}
        />
      )}
    </React.Fragment>
  );

  return (
    <div className="rounded-lg border-border-primary border-solid border w-[100%] max-w-6xl overflow-hidden">
      {items.length === 0 ? (
        isAdding ? (
          <AddItemForm
            onFormSubmit={(values) => {
              addItem(null, values);
              setIsAdding(false);
            }}
            onClose={() => setIsAdding(false)}
          />
        ) : (
          <EmptyList onItemFormOpen={() => setIsAdding(true)} />
        )
      ) : (
        <>
          <ItemsList
            items={items}
            onChange={setItems}
            renderItem={(item) => renderItem(item)}
          />

          {isAdding && newItemParentId === null ? (
            <AddItemForm
              onFormSubmit={(values) => {
                addItem(null, values);
                setIsAdding(false);
              }}
              onClose={() => setIsAdding(false)}
            />
          ) : (
            <div className="p-4">
              <Button
                onClick={() => {
                  setIsAdding(true);
                  setNewItemParentId(null);
                }}
              >
                Dodaj pozycję menu
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardView;
