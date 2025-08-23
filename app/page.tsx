"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { ProductGrid } from "@/components/product-grid"
import { Cart } from "@/components/cart"
import { CartProvider } from "@/components/cart-provider"

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header onCartClick={() => setIsCartOpen(true)} />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">SuperMercado 4 SIT</h1>
            <p className="text-muted-foreground text-lg">Produtos frescos e de qualidade para sua família</p>
          </div>
          <ProductGrid />
        </main>
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </CartProvider>
  )
}
