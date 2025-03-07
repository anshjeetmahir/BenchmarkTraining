import { Pagination } from "@mui/material";
import { CartPaginationProps } from "@/context/types";


const CartPagination = ({ totalPages, page, setPage }: CartPaginationProps) => {
    return (
        <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            sx={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
        />
    );
};

export default CartPagination;
