
import { Card, CardContent, Typography, CircularProgress, Alert } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "@/api/userApi";



const UserInfo = ({ userId }: { userId: number }) => {
    const { data: user, error, isLoading } = useQuery({
        queryKey: ["user", userId],
        queryFn: () => fetchUserById(userId),
        enabled: !!userId,
    });

    if (isLoading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error.message}</Alert>;
    if (!user) return <Alert severity="warning">User not found</Alert>;

    return (
        <Card sx={{ marginY: 2 }}>
            <CardContent>
                <Typography variant="h6">User Info</Typography>
                <Typography>Name: {user.firstName} {user.lastName}</Typography>
                <Typography>Email: {user.email}</Typography>
                <Typography>Phone: {user.phone}</Typography>
                <Typography>Address: {user.address.street}, {user.address.city}</Typography>
            </CardContent>
        </Card>
    );
};

export default UserInfo;
