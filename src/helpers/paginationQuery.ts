export interface PaginationQuery {
  page?: number;
  pageSize?: number;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationQueryWithSearchKey extends PaginationQuery {
  searchKey?: string;
}

export interface PaginationQueryWithDate extends PaginationQuery {
  date?: Date;
}
