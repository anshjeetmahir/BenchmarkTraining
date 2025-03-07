
import { Card, CardContent, Typography, CircularProgress, Alert } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: {
        street: string;
        city: string;
    };
}

const fetchUserDetails = async (userId: number) => {
    const response = await axios.get(`https://dummyjson.com/users/${userId}`);
    return response.data as IUser;
};

const UserInfo = ({ userId }: { userId: number }) => {
    const { data: user, error, isLoading } = useQuery({
        queryKey: ["user", userId],
        queryFn: () => fetchUserDetails(userId),
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
