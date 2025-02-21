using Microsoft.EntityFrameworkCore;

namespace backend.Helpers.API
{
    public class PaginatedList<T>
    {
        private PaginatedList(T[] items, int totalCount, int pageNumber, int pageSize)
        {
            Items = items;
            CurrentPage = pageNumber;
            TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
            PageSize = pageSize;

        }

        public int TotalPages { get; }
        public int PageSize { get; }
        public int CurrentPage { get; }
        public T[] Items { get; }


        public static async Task<PaginatedList<T>> CreateListAsync(IQueryable<T> list, PaginationRequest paginationRequest, CancellationToken cancellationToken)
        {
            int totalCount = await list.CountAsync();
            var items = await list.Skip((paginationRequest.PageNumber - 1) * paginationRequest.PageSize).Take(paginationRequest.PageSize).ToArrayAsync(cancellationToken);


            return new PaginatedList<T>(items, totalCount, paginationRequest.PageNumber, paginationRequest.PageSize);

        }


    }

    public class PaginationRequest
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}
