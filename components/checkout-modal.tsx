"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard, Banknote, Smartphone, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import { InvoiceModal } from "@/components/invoice-modal"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, total, clearCart } = useCart()
  const { toast } = useToast()
  const [paymentMethod, setPaymentMethod] = useState("credit")
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })
  const [showInvoice, setShowInvoice] = useState(false)
  const [invoiceNumber, setInvoiceNumber] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newInvoiceNumber = `NF-${Date.now()}`
    setInvoiceNumber(newInvoiceNumber)

    toast({
      title: "Pedido realizado com sucesso!",
      description: `Pagamento via ${getPaymentMethodName(paymentMethod)} processado. Total: R$ ${total.toFixed(2)}`,
    })

    setShowInvoice(true)
  }

  const handleInvoiceClose = () => {
    setShowInvoice(false)
    clearCart()
    onClose()
  }

  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case "credit":
        return "Cartão de Crédito"
      case "debit":
        return "Cartão de Débito"
      case "pix":
        return "PIX"
      case "cash":
        return "Dinheiro"
      default:
        return method
    }
  }

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case "credit":
        return <CreditCard className="w-5 h-5" />
      case "debit":
        return <Banknote className="w-5 h-5" />
      case "pix":
        return <Smartphone className="w-5 h-5" />
      case "cash":
        return <DollarSign className="w-5 h-5" />
      default:
        return null
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Finalizar Compra</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Order Summary */}
            <div className="space-y-4">
              <h3 className="font-semibold">Resumo do Pedido</h3>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 font-semibold flex justify-between">
                  <span>Total:</span>
                  <span className="text-primary">R$ {total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="font-semibold">Dados do Cliente</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    required
                    value={customerData.name}
                    onChange={(e) => setCustomerData((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={customerData.email}
                    onChange={(e) => setCustomerData((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    required
                    value={customerData.phone}
                    onChange={(e) => setCustomerData((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    required
                    value={customerData.address}
                    onChange={(e) => setCustomerData((prev) => ({ ...prev, address: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <h3 className="font-semibold">Forma de Pagamento</h3>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { value: "credit", label: "Cartão de Crédito" },
                    { value: "debit", label: "Cartão de Débito" },
                    { value: "pix", label: "PIX" },
                    { value: "cash", label: "Dinheiro" },
                  ].map((method) => (
                    <div key={method.value} className="flex items-center space-x-2 border border-border rounded-lg p-3">
                      <RadioGroupItem value={method.value} id={method.value} />
                      <Label htmlFor={method.value} className="flex items-center gap-2 cursor-pointer">
                        {getPaymentIcon(method.value)}
                        {method.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Payment Details */}
            {(paymentMethod === "credit" || paymentMethod === "debit") && (
              <div className="space-y-4">
                <h3 className="font-semibold">Dados do Cartão</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="cardNumber">Número do Cartão</Label>
                    <Input id="cardNumber" placeholder="0000 0000 0000 0000" required />
                  </div>
                  <div>
                    <Label htmlFor="expiry">Validade</Label>
                    <Input id="expiry" placeholder="MM/AA" required />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="000" required />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "pix" && (
              <div className="space-y-4">
                <h3 className="font-semibold">Pagamento via PIX</h3>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Após confirmar, você receberá o código PIX para pagamento
                  </p>
                  <div className="w-32 h-32 bg-primary/10 rounded-lg mx-auto flex items-center justify-center">
                    <Smartphone className="w-12 h-12 text-primary" />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "cash" && (
              <div className="space-y-4">
                <h3 className="font-semibold">Pagamento em Dinheiro</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    O pagamento será realizado na entrega. Tenha o valor exato ou informe se precisará de troco.
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1">
                Confirmar Pedido - R$ {total.toFixed(2)}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <InvoiceModal
        isOpen={showInvoice}
        onClose={handleInvoiceClose}
        items={items}
        total={total}
        customerData={customerData}
        paymentMethod={paymentMethod}
        invoiceNumber={invoiceNumber}
      />
    </>
  )
}
