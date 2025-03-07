import { Typography, Box } from "@mui/material";
import { IUserDetail } from "@/context/types";

const UserInfo = ({ user }: { user: IUserDetail }) => {
    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2 }}>
                <img src={user.image} alt="User Avatar" style={{ width: 100, borderRadius: "50%" }} />
            </Box>
            <Typography>Name: {user.firstName} {user.maidenName} {user.lastName}</Typography>
            <Typography>Username: {user.username}</Typography>
            <Typography>Age: {user.age}</Typography>
            <Typography>Gender: {user.gender}</Typography>
            <Typography>Birth Date: {user.birthDate}</Typography>
            <Typography>Blood Group: {user.bloodGroup}</Typography>
            <Typography>Eye Color: {user.eyeColor}</Typography>
            <Typography>Hair: {user.hair.color}, {user.hair.type}</Typography>
            <Typography>Email: {user.email}</Typography>
            <Typography>Phone: {user.phone}</Typography>
        </>
    );
};

export default UserInfo;
