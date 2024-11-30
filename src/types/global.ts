type ItemChildren = {
  children: IListItems;
};

export type IListItem = ItemChildren & {
  id: string;
  label: string;
  url?: string;
};

export type IListItems = IListItem[] | [];
