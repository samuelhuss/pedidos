import * as React from "react";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Order } from "@/types";

interface OrderFormProps {
  sendOrder: (order: Order) => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({ sendOrder }) => {
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (orderNumber && customerName) {
      sendOrder({ orderNumber, customerName });
      setOrderNumber("");
      setCustomerName("");
    }
  };

  return (
    <Card >
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Enviar Pedido</CardTitle>
          <CardDescription>Envie o pedido para o display.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="orderNumber">Número do Pedido</Label>
              <Input
                id="orderNumber"
                placeholder="Digite o número do pedido"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="customerName">Nome do Cliente</Label>
              <Input
                id="customerName"
                placeholder="Digite o nome do cliente"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              setOrderNumber("");
              setCustomerName("");
            }}
          >
            Cancelar
          </Button>
          <Button type="submit">Enviar</Button>
        </CardFooter>
      </form>
    </Card>
  );
};
