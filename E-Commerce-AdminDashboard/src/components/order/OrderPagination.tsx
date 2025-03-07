import { Pagination } from "@mui/material";

interface OrderPaginationProps {
    totalPages: number;
    page: number;
    setPage: (value: number) => void;
}

const OrderPagination = ({ totalPages, page, setPage }: OrderPaginationProps) => {
    return totalPages > 1 ? (
        <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
        />
    ) : null;
};

export default OrderPagination;
