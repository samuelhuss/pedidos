import React, { useRef, useState, useEffect } from "react";
import { OrderForm } from "@/components/ui/OrderForm";
import { Order } from "@/types";
import OrderList from "@/components/ui/OrderList";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

export const SendOrder: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const storedOrders = localStorage.getItem("orders");
    return storedOrders ? JSON.parse(storedOrders) : [];
  });
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const connectWebSocket = () => {
      ws.current = new WebSocket("ws://192.168.15.14:8080");
      
      ws.current.onopen = () => {
        setConnectionStatus("connected");
        toast("Conectado ao servidor WebSocket", {
          description: "Você está online.",
          action: {
            label: "Fechar",
            onClick: () => console.log("Fechar"),
          },
        });
      };

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

      ws.current.onclose = () => {
        setConnectionStatus("disconnected");
        toast("Desconectado do servidor WebSocket", {
          description: "Tentando reconectar...",
          action: {
            label: "Fechar",
            onClick: () => console.log("Fechar"),
          },
        });
        setTimeout(connectWebSocket, 10000);
      };

      ws.current.onerror = (error) => {
        setConnectionStatus("error");
        console.error("Erro no WebSocket:", error);
        toast("Erro na conexão WebSocket", {
          description: "Verifique sua conexão.",
          action: {
            label: "Fechar",
            onClick: () => console.log("Fechar"),
          },
        });
      };
    };

    connectWebSocket();

    return () => {
      ws.current?.close();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const sendOrder = (order: Order) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      order.timestamp = new Date().toISOString();
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
      <div className="mb-4 flex items-center">
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            connectionStatus === "connected" ? "bg-green-500" :
            connectionStatus === "disconnected" ? "bg-red-500" :
            connectionStatus === "error" ? "bg-orange-500" : ""
          }`}
        ></span>
        <span className="ml-2">
          {connectionStatus === "connected" && "Conectado"}
          {connectionStatus === "disconnected" && "Desconectado"}
          {connectionStatus === "error" && "Erro na conexão"}
        </span>
      </div>
      <Tabs defaultValue="form" className="w-[380px] p-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="form">Formulário</TabsTrigger>
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
        </TabsList>
        <TabsContent value="form" className="pt-2">
          <OrderForm sendOrder={sendOrder} />
        </TabsContent>
        <TabsContent value="orders" className="pt-2">
          <ScrollArea className="h-80 rounded-md border p-4">
            <OrderList orders={orders} deleteOrder={deleteOrder} />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SendOrder;
