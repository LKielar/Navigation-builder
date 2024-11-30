import React, { ReactNode } from "react";

type ItemProps = {
  id: string;
};

type ItemsListProps<T extends ItemProps> = {
  items: T[];
  renderItem(item: T): ReactNode;
  className?: string;
};

const ItemsList = <T extends ItemProps>({
  items,
  renderItem,
  className,
}: ItemsListProps<T>) => {
  return (
    <ul
      className={`list-none bg-bg-secondary flex flex-col first:border-none ${className}`}
      role="application"
    >
      {items.map((item) => (
        <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
      ))}
    </ul>
  );
};

export default ItemsList;
