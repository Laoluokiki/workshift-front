type TableColumnType =
  | "text"
  | "email"
  | "link"
  | "number"
  | "currency"
  | "object"
  | "boolean"
  | "date"
  | "date-time"
  | "percent"
  | "action"
  | "avatar"
  | "router"
  | "router-array"
  | "status"
  | "elipsis"
  | "balance"
  | "capitalText"
  | "hournumber"

export type ButtonActionTypes =
  | "add"
  | "edit"
  | "view"
  | "delete"
  | "state"
  | "assign"
  | "reverse"
  | "close"
  | "query"
  | "approve"
  | "decline"
  | "terminate"
  ;
export type PageType = "next" | "previous";

export interface ITableColumn {
  name: string;
  key: string;
  type: TableColumnType;
  route?: string;
  objectProp?: string;
}

export interface IActionButton {
  label: string;
  action: ButtonActionTypes;
  icon?: string;
  privilege?: string[];
}

export interface IPagination {
  next: string;
  previous: string;
  hasNext: boolean;
  hasPrevious: boolean;
  total: number;
  totalPages?: number;
}


export interface IPageRequest {
  name?: string;
  query?: string;
  filter?: string;
  per_page?: number;
  next?: string;
  prev?: string;
  q?: string;
  date?: string;
  from_date?: string;
  to_date?: string;
  fromdate?: string;
  todate?: string;
  status?: string;
  type?: string;
  pageSize?: number;
  page?: number;
  size?: number;
}

export interface IPaginationData {
  value: string;
  pageType: PageType;
}
