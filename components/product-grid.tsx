"use client"

import { ProductCard } from "@/components/product-card"

const products = [
  {
    id: 1,
    name: "Banana Prata",
    price: 4.99,
    unit: "kg",
    image: "/fresh-bananas.png",
    category: "Frutas",
  },
  {
    id: 2,
    name: "Leite Integral",
    price: 5.49,
    unit: "1L",
    image: "/milk-carton.png",
    category: "Laticínios",
  },
  {
    id: 3,
    name: "Pão Francês",
    price: 8.9,
    unit: "kg",
    image: "/french-bread.png",
    category: "Padaria",
  },
  {
    id: 4,
    name: "Arroz Branco",
    price: 4.29,
    unit: "1kg",
    image: "/white-rice-package.png",
    category: "Grãos",
  },
  {
    id: 5,
    name: "Feijão Carioca",
    price: 7.99,
    unit: "1kg",
    image: "/carioca-beans-package.png",
    category: "Grãos",
  },
  {
    id: 6,
    name: "Tomate",
    price: 6.99,
    unit: "kg",
    image: "/fresh-tomatoes.png",
    category: "Verduras",
  },
  {
    id: 7,
    name: "Carne Bovina",
    price: 32.9,
    unit: "kg",
    image: "/raw-beef.png",
    category: "Carnes",
  },
  {
    id: 8,
    name: "Frango",
    price: 12.99,
    unit: "kg",
    image: "/raw-chicken-pieces.png",
    category: "Carnes",
  },
]

export function ProductGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
