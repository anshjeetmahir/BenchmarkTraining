import { Typography } from "@mui/material";
import { IUserDetail } from "@/context/types";

const UserBank = ({ user }: { user: IUserDetail }) => {
    return (
        <>
            <Typography variant="h6" sx={{ mt: 2 }}>Bank Details</Typography>
            <Typography>Card Number: {user.bank.cardNumber}</Typography>
            <Typography>Card Type: {user.bank.cardType}</Typography>
            <Typography>Card Expiry: {user.bank.cardExpire}</Typography>
        </>
    );
};

export default UserBank;
