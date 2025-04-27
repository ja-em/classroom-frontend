export interface IPaginationResponse<TItem> {
  items: TItem;
  totalItem: number;
  totalPage: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
