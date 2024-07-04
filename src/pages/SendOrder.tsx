import React, { useRef, useState, useEffect } from "react";
import { OrderForm } from "@/components/ui/OrderForm";
import { Order } from "@/types";
import OrderList from "@/components/ui/OrderList";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

export const SendOrder: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(() => {
    // Inicializa com os pedidos do localStorage ou um array vazio se não houver nada armazenado
    const storedOrders = localStorage.getItem("orders");
    return storedOrders ? JSON.parse(storedOrders) : [];
  });
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onmessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      if (message.action === "delete") {
        setOrders((prevOrders) =>
          prevOrders.filter(
            (order) => order.orderNumber !== message.orderNumber
          )
        );
      }
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  // Atualiza o localStorage sempre que o estado de orders mudar
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const sendOrder = (order: Order) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(order));
      setOrders((prevOrders) => [...prevOrders, order]);
      toast("Pedido enviado com sucesso", {
        description: "Pedido já está no telão",
        action: {
          label: "Fechar",
          onClick: () => console.log("Fechar"),
        },
      });
    } else {
      toast("Erro ao enviar o pedido", {
        description: "Falha na conexão com o servidor",
        action: {
          label: "Fechar",
          onClick: () => console.log("Fechar"),
        },
      });
    }
  };

  const deleteOrder = (orderNumber: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ action: "delete", orderNumber }));
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.orderNumber !== orderNumber)
      );
      toast("Pedido excluído com sucesso", {
        description: "Pedido removido do telão",
        action: {
          label: "Fechar",
          onClick: () => console.log("Fechar"),
        },
      });
    } else {
      toast("Erro ao excluir o pedido", {
        description: "Falha na conexão com o servidor",
        action: {
          label: "Fechar",
          onClick: () => console.log("Fechar"),
        },
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Tabs defaultValue="form" className="w-[380px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="form">Formulário</TabsTrigger>
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
        </TabsList>
        <TabsContent value="form" className="pt-2">
          <OrderForm sendOrder={sendOrder} />
        </TabsContent>
        <TabsContent value="orders" className="pt-2">
        <ScrollArea className="h-[450px] rounded-md border p-4">
            <OrderList orders={orders} deleteOrder={deleteOrder} />
          </ScrollArea>

        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SendOrder;
