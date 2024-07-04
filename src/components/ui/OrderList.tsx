import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Order } from '@/types';

interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <div className="space-y-4">
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <Card key={index} className="w-full">
            <CardHeader>
              <CardTitle>Pedido {order.orderNumber}</CardTitle>
              <CardDescription>{order.customerName}</CardDescription>
            </CardHeader>
          </Card>
        ))
      ) : (
        <Card className="w-full">
          <CardContent>
            <p className="text-center">Nenhum pedido pronto.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrderList;
