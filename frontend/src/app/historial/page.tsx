"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HistorialPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Alias de ruta para acceder al historial de compras
    // Redirige a la página existente de órdenes/historial
    router.replace("/orders");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirigiendo...</p>
      </div>
    </div>
  );
}