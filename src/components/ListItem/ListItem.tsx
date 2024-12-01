import {
  createContext,
  CSSProperties,
  useContext,
  useMemo,
  type PropsWithChildren,
} from "react";
import DragDropIcon from "@/assets/DragDropIcon.tsx.svg";
import Button from "../Button";
import { DraggableSyntheticListeners } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IListItem } from "@/types/global";

export const DragField = () => {
  const { attributes, listeners, ref } = useContext(SortableItemContext);

  return (
    <Button
      {...attributes}
      {...listeners}
      ref={ref}
      variant="icon"
      additionalClasses="cursor-move"
    >
      <DragDropIcon />
    </Button>
  );
};

type ItemActionsProps = {
  item: IListItem;
  onAddChild: () => void;
};

export const ItemActions = ({ item, onAddChild }: ItemActionsProps) => (
  <div className="flex justify-between w-full">
    <div className="flex flex-col gap-[6px] w-full">
      <span className="text-text-primary text-sm font-semibold">
        {item.label}
      </span>

      <span className="text-text-tertiary text-sm">{item.url}</span>
    </div>

    <div className="flex ">
      <button className="text-text-secondary font-semibold py-[10px] px-4 border border-border-primary border-solid border-r-0 rounded-bl-md rounded-tl-md">
        Usuń
      </button>

      <button className="text-text-secondary font-semibold py-[10px] px-4 border border-border-primary border-solid">
        Edytuj
      </button>

      <button
        onClick={onAddChild}
        className="text-text-secondary font-semibold py-[10px] px-4 border border-border-primary border-solid border-l-0 rounded-br-md rounded-tr-md whitespace-nowrap"
      >
        Dodaj pozycję menu
      </button>
    </div>
  </div>
);

type ListItemProps = {
  id: string;
};

type Context = {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref: (node: HTMLElement | null) => void;
};

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref: () => {},
});

const ListItem = ({ children, id }: PropsWithChildren<ListItemProps>) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef]
  );

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <SortableItemContext.Provider value={context}>
      <li
        className="flex items-center gap-1 px-5 py-[18px] bg-white border-border-secondary border-solid border-b list-none text-gray-800 font-normal text-base font-sans"
        ref={setNodeRef}
        style={style}
      >
        {children}
      </li>
    </SortableItemContext.Provider>
  );
};
export default ListItem;
