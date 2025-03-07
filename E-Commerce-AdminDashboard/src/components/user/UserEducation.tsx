
import { Typography } from "@mui/material";
import { IUserDetail } from "@/context/types";

const UserEducation = ({ user }: { user: IUserDetail }) => {
    return (
        <>
            <Typography variant="h6" sx={{ mt: 2 }}>Education</Typography>
            <Typography>University: {user.university}</Typography>
        </>
    );
};

export default UserEducation;
