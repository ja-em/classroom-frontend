import { IPaginationResponse } from "@/types/interface/response";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

export function TablePagination({
  pagination,
}: {
  pagination: Omit<IPaginationResponse<object>, "items">;
}) {
  return (
    <Pagination className="mt-4">
      <PaginationContent>
        {pagination.hasPreviousPage && (
          <PaginationItem>
            <PaginationPrevious href={`?page=${pagination.page - 1}`} />
          </PaginationItem>
        )}
        {Array.from({ length: pagination.totalPage }).map((_, i) => {
          const targetPage = i + 1;
          return (
            <PaginationItem key={targetPage}>
              <PaginationLink
                href={`?page=${targetPage}`}
                isActive={targetPage === pagination.page}
              >
                {targetPage}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {pagination.hasNextPage && (
          <PaginationItem>
            <PaginationNext href={`?page=${pagination.page + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
