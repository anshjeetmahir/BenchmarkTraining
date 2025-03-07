
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/api/userApi";
import { Typography, CircularProgress } from "@mui/material";
import { useState } from "react";
import { IUser } from "@/context/types";
import UserSearch from "../../components/user/UserSearch";
import UserList from "../../components/user/UserList";
import UserPagination from "../../components/user/UserPagination";

const UserPage = () => {
    const { data: users, isLoading, error } = useQuery<IUser[]>({
        queryKey: ["users"],
        queryFn: fetchUsers,
    });

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;

    if (error) return <Typography color="error">Failed to load users.</Typography>;

    const filteredUsers = users?.filter((user) =>
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    ) || [];

    const paginatedUsers = filteredUsers.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <Typography variant="h4" gutterBottom sx={{ marginBottom: "30px" }}>
                User Management
            </Typography>

            {isLoading ? (
                <CircularProgress />
            ) : (
                <>
                    <UserSearch search={search} setSearch={setSearch} setPage={setPage} />
                    <UserList users={paginatedUsers} />
                </>
            )}

            <UserPagination totalPages={totalPages} page={page} setPage={setPage} />
        </div>
    );
};

export default UserPage;
