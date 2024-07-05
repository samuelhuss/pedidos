import * as React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Order } from "@/types";
import { Button } from "./Button";

interface OrderListProps {
  orders: Order[];
  deleteOrder?: (orderNumber: string) => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders, deleteOrder }) => {
  return (
    <div className="space-y-2">
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <Card key={index} className="w-full">
            <CardHeader>
              <CardTitle>Pedido {order.orderNumber}</CardTitle>
              <CardDescription className="text-2xl">
                {order.customerName}
              </CardDescription>
              <CardDescription className="text-sm">
                Horário: {order.timestamp ? new Date(order.timestamp).toLocaleString() : ""}
              </CardDescription>
            </CardHeader>
            {deleteOrder && (
              <CardFooter>
                <Button
                  variant="destructive"
                  onClick={() => deleteOrder(order.orderNumber)}
                >
                  Excluir
                </Button>
              </CardFooter>
            )}
          </Card>
        ))
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Sem pedidos prontos</CardTitle>
              <CardDescription>Espere alguns minutos</CardDescription>
            </CardHeader>
          </Card>
        </div>
      )}
    </div>
  );
};

export default OrderList;
