"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"

interface Product {
  id: number
  name: string
  price: number
  unit: string
  image: string
  category: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      image: product.image,
      quantity: 1,
    })
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-muted">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>

        <div className="space-y-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>

          <h3 className="font-semibold text-foreground line-clamp-2">{product.name}</h3>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-primary">R$ {product.price.toFixed(2)}</span>
              <span className="text-sm text-muted-foreground ml-1">/{product.unit}</span>
            </div>

            <Button size="sm" onClick={handleAddToCart} className="shrink-0">
              <Plus className="w-4 h-4 mr-1" />
              Adicionar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
