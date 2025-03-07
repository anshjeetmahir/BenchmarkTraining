import { Box, Typography } from "@mui/material";
import { IUserDetail } from "@/context/types";

const UserDetails = ({ user }: { user: IUserDetail }) => {
    return (
        <Box>
            <Typography variant="h6">User Details</Typography>
            <Typography variant="body1"><strong>Name:</strong> {user.firstName} {user.lastName}</Typography>
            <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
            <Typography variant="body1"><strong>Phone:</strong> {user.phone}</Typography>
        </Box>
    );
};

export default UserDetails;
