import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import OrderList from "@/components/ui/OrderList";
import { Order } from "@/types";
import { toast } from "sonner";

export const DisplayOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }

    const ws = new WebSocket("ws://192.168.15.14:8080");

    ws.onopen = () => {
      toast("Conectado ao servidor WebSocket", {
        description: "A conexão foi estabelecida com sucesso.",
        action: {
          label: "Fechar",
          onClick: () => console.log("Fechar"),
        },
      });
    };

    ws.onmessage = async (event: MessageEvent) => {
      try {
        const message = await (event.data instanceof Blob
          ? event.data.text()
          : event.data);
        const parsedMessage = JSON.parse(message);

        if (parsedMessage.action === "delete") {
          const deletedOrderNumber = parsedMessage.orderNumber;
          setOrders((prevOrders) =>
            prevOrders.filter(
              (order) => order.orderNumber !== deletedOrderNumber
            )
          );
        } else {
          const newOrder: Order = parsedMessage;
          setOrders((prevOrders) => {
            const updatedOrders = [...prevOrders, newOrder];
            localStorage.setItem("orders", JSON.stringify(updatedOrders));
            return updatedOrders;
          });

          toast("Novo pedido recebido", {
            description: `Pedido #${newOrder.orderNumber} foi adicionado.`,
            action: {
              label: "Fechar",
              onClick: () => console.log("Fechar"),
            },
          });
        }
      } catch (error) {
        console.error("Erro ao processar mensagem WebSocket:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("Erro na conexão WebSocket:", error);
      toast("Erro na conexão WebSocket", {
        description: "Falha na conexão com o servidor.",
        action: {
          label: "Fechar",
          onClick: () => console.log("Fechar"),
        },
      });
    };

    ws.onclose = () => {
      console.log("Conexão WebSocket fechada.");
      toast("Conexão WebSocket fechada", {
        description: "A conexão com o servidor foi encerrada.",
        action: {
          label: "Fechar",
          onClick: () => console.log("Fechar"),
        },
      });
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="flex flex-col p-4 items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-2">Pedidos Prontos</h1>
      <p className="text-md text-muted-foreground mb-4">
        Retire seu pedido na área de entrega no lado de fora da igreja.
      </p>

      <div className="w-full max-w-screen-lg border border-dashed p-8 rounded-md shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orders.map((order, index) => (
            <motion.div
              key={index}
              className="mb-4 px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <OrderList orders={[order]} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayOrders;
