import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const events = [
  {
    name: "8 de Fevereiro - Hamburgada",
    location: "Av. Diogo Álvarez, 2074",
    routes: [
      { path: "/send-order", label: "Enviar Pedido" },
      { path: "/display-orders", label: "Mostrar Pedidos" }
    ]
  },
  {
    name: "Acampamento",
    location: "EETAD - Leme",
    routes: [
      { path: "/control-timer", label: "Ver Placar" },
      { path: "/control-timer", label: "Controlar Tempo" }
    ]
  },

  {
    name: "Em breve",
    location: "Á definir",
    routes: [
      { path: "/scoreboard", label: "Ver" },
      { path: "/control-timer", label: "Controlar" }
    ]
  },

];

export function Home() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 320; // Distância do scroll
      if (direction === "left") {
        carouselRef.current.scrollLeft -= scrollAmount;
      } else {
        carouselRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold tracking-tighter mb-6 text-center">Eventos</h1>
      <div className="relative w-full max-w-4xl">
        {/* Botão esquerdo, fora da área do carrossel */}
        <button
          className="absolute left-[-24px] top-1/2 transform -translate-y-1/2 p-3 bg-white shadow-md rounded-full z-20"
          onClick={() => scroll("left")}
        >
          <ChevronLeft size={24} />
        </button>
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-scroll scrollbar-hide p-4 snap-x snap-mandatory scroll-smooth"
        >
          {events.map((event, index) => (
            <div
              key={index}
              className="min-w-[320px] flex-shrink-0 border p-6 rounded-lg shadow-md snap-center bg-white"
            >
              <h2 className="text-xl font-semibold text-center">{event.name}</h2>
              <p className="text-center text-muted-foreground mb-4">{event.location}</p>
              <div className="flex gap-4">
                {event.routes.map((route, idx) => (
                  <Button key={idx} asChild variant={idx % 2 === 0 ? "outline" : "default"} className="flex-1">
                    <Link to={route.path}>{route.label}</Link>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Botão direito, fora da área do carrossel */}
        <button
          className="absolute right-[-24px] top-1/2 transform -translate-y-1/2 p-3 bg-white shadow-md rounded-full z-20"
          onClick={() => scroll("right")}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
