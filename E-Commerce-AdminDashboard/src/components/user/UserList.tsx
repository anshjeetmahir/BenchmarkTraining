import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IUser } from "@/context/types";

interface UserListProps {
    users: IUser[];
}

const UserList = ({ users }: UserListProps) => {
    const navigate = useNavigate();

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(300px, 1fr))", gap: "16px" }}>
            {users.length > 0 ? (
                users.map((user) => (
                    <Card
                        key={user.id}
                        onClick={() => navigate(`/admin/users/${user.id}`)}
                        sx={{ cursor: "pointer" }}
                    >
                        <CardContent>
                            <Typography variant="h6">
                                {user.firstName} {user.lastName}
                            </Typography>
                            <Typography>Email: {user.email}</Typography>
                            <Typography>Phone: {user.phone}</Typography>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography>No users found.</Typography>
            )}
        </div>
    );
};

export default UserList;
