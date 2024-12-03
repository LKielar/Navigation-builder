import React, { ReactNode, useId, useMemo, useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { Active } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import DropArea from "../DropArea";
import { IListItem, IListItems } from "@/types/global";
import { useUniqueId } from "@dnd-kit/utilities";

type ItemsListProps = {
  items: IListItems;
  itemsTree: IListItems;
  onChange: (items: IListItems) => void;
  renderItem: (item: IListItem) => ReactNode;
  className?: string;
};

const ItemsList = ({
  items,
  itemsTree,
  onChange,
  renderItem,
  className,
}: ItemsListProps) => {
  const [active, setActive] = useState<Active | null>(null);
  const activeItem = useMemo(
    () => items.find((item) => item.id === active?.id),
    [active, items]
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const swapItemsInTree = (
    tree: IListItems,
    activeId: string,
    overId: string
  ): IListItems => {
    const updateTree = (currentTree: IListItems): IListItems => {
      const activeIndex = currentTree.findIndex((item) => item.id === activeId);
      const overIndex = currentTree.findIndex((item) => item.id === overId);

      if (activeIndex !== -1 && overIndex !== -1) {
        return arrayMove(currentTree, activeIndex, overIndex);
      }

      return currentTree.map((item) => {
        if (item.children) {
          const updatedChildren = updateTree(item.children);
          return { ...item, children: updatedChildren };
        }
        return item;
      });
    };

    const swapItems = (
      currentTree: IListItems,
      id1: string,
      id2: string
    ): IListItems => {
      return currentTree.map((item) => {
        if (item.children) {
          const childIds = item.children.map((child) => child.id);

          if (childIds.includes(id1) && childIds.includes(id2)) {
            const childActiveIndex = childIds.indexOf(id1);
            const childOverIndex = childIds.indexOf(id2);
            const swappedChildren = arrayMove(
              item.children,
              childActiveIndex,
              childOverIndex
            );
            return { ...item, children: swappedChildren };
          }

          return { ...item, children: swapItems(item.children, id1, id2) };
        }
        return item;
      });
    };

    return updateTree(tree);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        setActive(active);
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over.id) {
          const updatedTree = swapItemsInTree(
            itemsTree,
            active.id as string,
            over.id as string
          );

          onChange(updatedTree);
        }
        setActive(null);
      }}
      onDragCancel={() => {
        setActive(null);
      }}
      id={useUniqueId(useId())} // id must be passed to fix SSR hydration error
    >
      <SortableContext items={items}>
        <ul className={`list-none bg-bg-secondary flex flex-col ${className}`}>
          {items.map((item) => (
            <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
          ))}
        </ul>
      </SortableContext>

      <DropArea>{activeItem ? renderItem(activeItem) : null}</DropArea>
    </DndContext>
  );
};

export default ItemsList;
