import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="max-w-[800px] mx-auto p-8  rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold tracking-tighter mb-2 text-center">6 de Julho - Hamburgada</h1>
        <p className="text-center mb-4 text-muted-foreground">
        Av. Diogo Álvarez, 2074
        </p>
        <div className="flex gap-4">
          <Button asChild variant="outline" className="flex-1">
            <Link to="/send-order">Enviar Pedido</Link>
          </Button>
          <Button asChild className="flex-1">
            <Link to="/display-orders">Mostrar Pedidos</Link>
          </Button>
        </div>
        
      </div>
    </div>
  );
}
