import { TextField } from "@mui/material";

interface UserSearchProps {
    search: string;
    setSearch: (value: string) => void;
    setPage: (value: number) => void;
}

const UserSearch = ({ search, setSearch, setPage }: UserSearchProps) => {
    return (
        <TextField
            label="Search Users"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "20px" }}
            value={search}
            onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
            }}
        />
    );
};

export default UserSearch;
