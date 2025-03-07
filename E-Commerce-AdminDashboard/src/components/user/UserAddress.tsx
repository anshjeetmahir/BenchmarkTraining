import { Typography } from "@mui/material";
import { IUserDetail } from "@/context/types";

const UserAddress = ({ user }: { user: IUserDetail }) => {
    return (
        <>
            <Typography variant="h6" sx={{ mt: 2 }}>Address</Typography>
            <Typography>{user.address.address}, {user.address.city}, {user.address.state}, {user.address.postalCode}, {user.address.country}</Typography>
        </>
    );
};

export default UserAddress;
