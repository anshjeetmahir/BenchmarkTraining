import { Typography } from "@mui/material";
import { IUserDetail } from "@/context/types";

const UserCompany = ({ user }: { user: IUserDetail }) => {
    return (
        <>
            <Typography variant="h6" sx={{ mt: 2 }}>Company</Typography>
            <Typography>Name: {user.company.name}</Typography>
            <Typography>Department: {user.company.department}</Typography>
            <Typography>Title: {user.company.title}</Typography>
        </>
    );
};

export default UserCompany;
