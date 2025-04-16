export interface LogResponse<T> {
    items: T[];
    totalCount?: number;
    [key: string]: any; // if the server might return more data
  }