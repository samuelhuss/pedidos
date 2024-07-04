import React, { useRef, useEffect } from 'react';
import {OrderForm} from '@/components/ui/OrderForm';
import { Order } from '@/types';

export const SendOrder: React.FC = () => {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8080');
    return () => {
      ws.current?.close();
    };
  }, []);

  const sendOrder = (order: Order) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(order));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <OrderForm sendOrder={sendOrder} />
    </div>
  );
};

export default SendOrder;
