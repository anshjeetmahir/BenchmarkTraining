import { Pagination } from "@mui/material";

interface UserPaginationProps {
    totalPages: number;
    page: number;
    setPage: (value: number) => void;
}

const UserPagination = ({ totalPages, page, setPage }: UserPaginationProps) => {
    if (totalPages <= 1) return null;

    return (
        <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
        />
    );
};

export default UserPagination;
