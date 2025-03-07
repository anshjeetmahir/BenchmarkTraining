import OrderCard from "./OrderCard";

interface OrderListProps {
    orders: {
        id: number;
        totalQuantity: number;
        totalProducts: number;
        discountedTotal: number;
    }[];
    statuses: Record<number, string>;
    getStatusColor: (status: string) => string;
}

const OrderList = ({ orders, statuses, getStatusColor }: OrderListProps) => {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(300px, 1fr))", gap: "16px" }}>
            {orders.map((order) => (
                <OrderCard key={order.id} order={order} status={statuses[order.id] || "Pending"} getStatusColor={getStatusColor} />
            ))}
        </div>
    );
};

export default OrderList;
