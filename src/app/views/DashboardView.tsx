"use client";

import { DragField, ItemActions } from "@/components/ListItem/ListItem";
import React from "react";
import { useState } from "react";
import Button from "@/components/Button";
import ItemsList from "@/components/ItemsList";
import ListItem from "@/components/ListItem";

export const initialItems = [
  {
    id: "1",
    label: "Promocje",
    url: "https://rc32141.redcart.pl/promocje",
    children: [
      {
        id: "2",
        label: "Ostatnie 7 dni",
        url: "https://rc32141.redcart.pl/7dni",
        children: [],
      },
    ],
  },
  {
    id: "3",
    label: "Diamenty forbes",
    url: "https://www.forbes.pl/diamenty",
    children: [],
  },
];

const DashboardView = () => {
  const [items, setItems] = useState(initialItems);

  const renderItem = (item: (typeof initialItems)[0], depth = 0) => (
    <React.Fragment key={item.id}>
      <ListItem id={item.id} key={item.id}>
        <DragField />

        <ItemActions item={item} />
      </ListItem>

      {item.children && item.children.length > 0 && (
        <ItemsList
          items={item.children}
          onChange={setItems}
          renderItem={(item) => renderItem(item)}
          className="pl-16"
        >
          {item.children.map((child) => renderItem(child, depth + 1))}
        </ItemsList>
      )}
    </React.Fragment>
  );

  return (
    <div className="rounded-lg border-border-primary border-solid border w-[100%] max-w-6xl overflow-hidden">
      <ItemsList items={items} renderItem={(item) => renderItem(item)} />

      <div className="p-4">
        <Button>Dodaj pozycję menu</Button>
      </div>
    </div>
  );
};

export default DashboardView;
