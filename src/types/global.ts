type ItemChildren = {
  children: IListItems;
};

export type IListItem = ItemChildren & {
  id: string;
  label: string;
  url?: string;
  hasSiblingWithChildren?: boolean;
};

export type IListItems = IListItem[] | [];
