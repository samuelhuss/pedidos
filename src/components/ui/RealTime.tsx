import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  type: "chat";
}

export const RealTimeChat: React.FC<{ ws: WebSocket | null }> = ({ ws }) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ws) return;

    ws.onmessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      if (message.type === "chat") {
        setChatMessages((prevMessages) => [message, ...prevMessages]);
        scrollToBottom();
      }
    };

    return () => {
      ws.onmessage = null;
    };
  }, [ws]);

  const sendChatMessage = (message: string) => {
    if (ws?.readyState === WebSocket.OPEN) {
      const chatMessage: ChatMessage = {
        id: generateUniqueId(),
        type: "chat",
        sender: "Me",
        content: message,
      };
      ws.send(JSON.stringify(chatMessage));
      setChatMessages((prevMessages) => [chatMessage, ...prevMessages]);
      scrollToBottom();
    } else {
      toast("Erro ao enviar mensagem de chat", {
        description: "Falha na conexão com o servidor",
        action: {
          label: "Fechar",
          onClick: () => console.log("Fechar"),
        },
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      sendChatMessage(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  const toggleChat = () => {
    setChatOpen((prevChatOpen) => !prevChatOpen);
  };

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="h-full p-4 border rounded-md flex flex-col">
      {!chatOpen && (
        <button onClick={toggleChat} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md">
          Abrir Chat
        </button>
      )}

      {chatOpen && (
        <>
          <div className="flex-1 overflow-y-auto">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="mb-2">
                <span className="font-semibold">{msg.sender}: </span>
                <span>{msg.content}</span>
              </div>
            ))}
            <div ref={bottomRef}></div>
          </div>
          <div className="mt-4">
            <input
              ref={inputRef}
              type="text"
              placeholder="Digite sua mensagem"
              className="w-full px-3 py-2 border rounded-md"
              onKeyDown={handleKeyDown}
            />
          </div>
        </>
      )}
    </div>
  );
};

function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}
