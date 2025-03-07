
import { Box, Typography, Select, MenuItem, SelectChangeEvent } from "@mui/material";

interface OrderStatusProps {
    orderId: number;
    currentStatus: string;
    setStatus?: (orderId: number, status: string) => void;
}

const OrderStatus: React.FC<OrderStatusProps> = ({ orderId, currentStatus, setStatus }) => {
    const handleChange = (event: SelectChangeEvent<string>) => {
        if (setStatus) {
            setStatus(orderId, event.target.value);
        }
    };

    return (
        <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6">Order Status</Typography>
            <Select value={currentStatus} onChange={handleChange} displayEmpty fullWidth>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Processing">Processing</MenuItem>
                <MenuItem value="Shipped">Shipped</MenuItem>
                <MenuItem value="Delivered">Delivered</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
        </Box>
    );
};

export default OrderStatus;

