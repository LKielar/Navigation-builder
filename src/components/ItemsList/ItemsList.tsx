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

type ItemsListProps = {
  items: IListItems;
  onChange: (items: IListItems) => void;
  renderItem: (item: IListItem) => ReactNode;
  className?: string;
};

const ItemsList = ({
  items,
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

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        setActive(active);
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over.id) {
          const activeIndex = items.findIndex(({ id }) => id === active.id);
          const overIndex = items.findIndex(({ id }) => id === over.id);

          onChange(arrayMove(items, activeIndex, overIndex));
        }
        setActive(null);
      }}
      onDragCancel={() => {
        setActive(null);
      }}
      id={useId()} // id must be passed to fix SSR hydration error
    >
      <SortableContext items={items}>
        <ul
          className={`list-none bg-bg-secondary flex flex-col first:border-none ${className}`}
        >
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
