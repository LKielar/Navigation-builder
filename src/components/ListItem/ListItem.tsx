import type { PropsWithChildren } from "react";
import DragDropIcon from "@/assets/DragDropIcon.tsx.svg";
import { initialItems } from "@/app/views/DashboardView";
import Button from "../Button";

export const DragField = () => {
  return (
    <Button variant="icon">
      <DragDropIcon />
    </Button>
  );
};

export const ItemActions = ({ item }: { item: (typeof initialItems)[0] }) => (
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

      <button className="text-text-secondary font-semibold py-[10px] px-4 border border-border-primary border-solid border-l-0 rounded-br-md rounded-tr-md whitespace-nowrap">
        Dodaj pozycję menu
      </button>
    </div>
  </div>
);

type ListItemProps = {
  id: string;
};

const ListItem = ({ children, id }: PropsWithChildren<ListItemProps>) => {
  return (
    <li className="flex items-center gap-1 px-5 py-[18px] bg-white border-border-secondary border-solid border-b list-none text-gray-800 font-normal text-base font-sans">
      {children}
    </li>
  );
};
export default ListItem;
