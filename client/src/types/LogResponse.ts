export interface LogResponse<T> {
    items: T[];
    totalCount?: number;
    [key: string]: any;
  }
  