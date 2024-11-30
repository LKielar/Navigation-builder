"use client";

import { DragField, ItemActions } from "@/components/ListItem/ListItem";
import React from "react";
import { useState } from "react";
import Button from "@/components/Button";
import ItemsList from "@/components/ItemsList";
import ListItem from "@/components/ListItem";
import { IListItem, IListItems } from "@/types/global";

const DashboardView = () => {
  const [items, setItems] = useState<IListItems>([]);

  const addSibling = () => {
    const newItem = {
      id: String(Date.now()),
      label: "Nowa pozycja",
      url: "",
      children: [],
    };

    setItems((prevItems) => [...prevItems, newItem]);
  };

  const addChild = (parentId: string) => {
    const newItem = {
      id: String(Date.now()),
      label: "Nowe dziecko",
      url: "",
      children: [],
    };

    const addChildToItems = (items: IListItems): IListItems =>
      items.map((item) =>
        item.id === parentId
          ? { ...item, children: [...item.children, newItem] }
          : { ...item, children: addChildToItems(item.children) }
      );

    setItems((prevItems) => addChildToItems(prevItems));
  };

  const renderItem = (item: IListItem, depth = 0) => (
    <React.Fragment key={item.id}>
      <ListItem id={item.id}>
        <DragField />

        <ItemActions item={item} onAddChild={() => addChild(item.id)} />
      </ListItem>

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
    </React.Fragment>
  );

  return (
    <div className="rounded-lg border-border-primary border-solid border w-[100%] max-w-6xl overflow-hidden">
      <ItemsList
        items={items}
        onChange={setItems}
        renderItem={(item) => renderItem(item)}
      />

      <div className="p-4">
        <Button onClick={addSibling}>Dodaj pozycję menu</Button>
      </div>
    </div>
  );
};

export default DashboardView;
