import React, { useRef, useState, useEffect } from "react";
import OrderList from "@/components/ui/OrderList";
import { Order } from "@/types";

export const DisplayOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");
    ws.current.onmessage = async (event: MessageEvent) => {
      try {
        const message = await (event.data instanceof Blob
          ? event.data.text()
          : event.data);
        const order: Order = JSON.parse(message);
        // Adiciona o pedido à lista de pedidos
        if (orders.length < 10) {
          setOrders((prevOrders) => [...prevOrders, order]);
        }
      } catch (error) {
        console.error("Erro ao processar mensagem WebSocket:", error);
      }
    };

    return () => {
      ws.current?.close();
    };
  }, [orders]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-2">Pedidos Prontos</h1>
      <p className="text-md text-muted-foreground mb-4">
        Retire seu pedido na área de entrega no lado de fora da igreja.
      </p>
      <div className="w-full max-w-screen-lg border border-dashed p-8 rounded-md shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orders.slice(0, 10).map((order, index) => (
            <div key={index} className="mb-4 px-2">
              <OrderList orders={[order]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayOrders;
