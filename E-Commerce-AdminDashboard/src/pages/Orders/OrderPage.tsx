


import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "@/api/orderApi";
import { Typography, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useOrderStore } from "@/store/orderStore";
import { useTheme } from "@mui/material/styles";
import { IOrder } from "@/context/types";
import OrderList from "../../components/order/OrderList";
import OrderPagination from "../../components/order/OrderPagination";

const Orders = () => {
    const { data: orders, isLoading } = useQuery<IOrder[]>({ queryKey: ["orders"], queryFn: fetchOrders });
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;
    const theme = useTheme();
    const { statuses } = useOrderStore();

    const paginatedOrders = orders?.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const totalPages = Math.ceil((orders?.length || 0) / itemsPerPage);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Pending": return theme.palette.primary.main;
            case "Shipped": return theme.palette.warning.main;
            case "Delivered": return theme.palette.success.main;
            case "Cancelled": return theme.palette.error.main;
            default: return "gray";
        }
    };

    return (
        <div style={{ justifyContent: "center", textAlign: "center", padding: "20px" }}>
            <Typography variant="h4" gutterBottom sx={{ marginBottom: "30px" }}>Orders</Typography>

            {isLoading ? <CircularProgress /> : <OrderList orders={paginatedOrders || []} statuses={statuses} getStatusColor={getStatusColor} />}

            <OrderPagination totalPages={totalPages} page={page} setPage={setPage} />
        </div>
    );
};

export default Orders;
