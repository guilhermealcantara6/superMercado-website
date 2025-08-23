"use client"
import { Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface InvoiceItem {
  id: number
  name: string
  quantity: number
  price: number
}

interface InvoiceModalProps {
  isOpen: boolean
  onClose: () => void
  items: InvoiceItem[]
  total: number
  customerData: {
    name: string
    email: string
    phone: string
    address: string
  }
  paymentMethod: string
  invoiceNumber: string
}

export function InvoiceModal({
  isOpen,
  onClose,
  items,
  total,
  customerData,
  paymentMethod,
  invoiceNumber,
}: InvoiceModalProps) {
  const currentDate = new Date().toLocaleDateString("pt-BR")
  const currentTime = new Date().toLocaleTimeString("pt-BR")

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

  const handlePrint = () => {
    const printContent = document.getElementById("invoice-content")
    if (printContent) {
      const printWindow = window.open("", "_blank")
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Nota Fiscal - ${invoiceNumber}</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .header { text-align: center; border-bottom: 2px solid #059669; padding-bottom: 20px; margin-bottom: 20px; }
                .company-name { color: #059669; font-size: 24px; font-weight: bold; }
                .invoice-info { display: flex; justify-content: space-between; margin-bottom: 20px; }
                .customer-info { margin-bottom: 20px; }
                .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                .items-table th, .items-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                .items-table th { background-color: #f8f9fa; }
                .total-section { text-align: right; font-weight: bold; font-size: 18px; }
                .payment-info { margin-top: 20px; }
                @media print { body { margin: 0; } }
              </style>
            </head>
            <body>
              ${printContent.innerHTML}
            </body>
          </html>
        `)
        printWindow.document.close()
        printWindow.print()
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Nota Fiscal
            <div className="flex gap-2">
              <Button onClick={handlePrint} variant="outline" size="sm">
                <Printer className="w-4 h-4 mr-2" />
                Imprimir
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div id="invoice-content" className="space-y-6 p-4">
          {/* Header */}
          <div className="text-center border-b-2 border-primary pb-6">
            <h1 className="text-3xl font-bold text-primary mb-2">SuperMercado Fresh</h1>
            <p className="text-muted-foreground">Rua das Compras, 123 - Centro - CEP: 12345-678</p>
            <p className="text-muted-foreground">CNPJ: 12.345.678/0001-90 | Tel: (11) 1234-5678</p>
          </div>

          {/* Invoice Info */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold mb-2">NOTA FISCAL DE VENDA</h2>
              <p>
                <strong>Número:</strong> {invoiceNumber}
              </p>
              <p>
                <strong>Data:</strong> {currentDate}
              </p>
              <p>
                <strong>Hora:</strong> {currentTime}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Série: 001</p>
              <p className="text-sm text-muted-foreground">Modelo: 65</p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-3">DADOS DO CLIENTE</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <p>
                <strong>Nome:</strong> {customerData.name}
              </p>
              <p>
                <strong>Email:</strong> {customerData.email}
              </p>
              <p>
                <strong>Telefone:</strong> {customerData.phone}
              </p>
              <p>
                <strong>Endereço:</strong> {customerData.address}
              </p>
            </div>
          </div>

          {/* Items Table */}
          <div>
            <h3 className="font-semibold mb-3">PRODUTOS</h3>
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Produto</th>
                  <th className="border border-border p-3 text-center">Qtd</th>
                  <th className="border border-border p-3 text-right">Valor Unit.</th>
                  <th className="border border-border p-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="border border-border p-3">{item.name}</td>
                    <td className="border border-border p-3 text-center">{item.quantity}</td>
                    <td className="border border-border p-3 text-right">R$ {item.price.toFixed(2)}</td>
                    <td className="border border-border p-3 text-right">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Section */}
          <div className="border-t-2 border-primary pt-4">
            <div className="flex justify-end">
              <div className="text-right space-y-2">
                <div className="text-2xl font-bold text-primary">TOTAL: R$ {total.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">
                  Forma de Pagamento: {getPaymentMethodName(paymentMethod)}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground border-t pt-4">
            <p>Obrigado pela sua compra!</p>
            <p>Esta é uma via da sua nota fiscal eletrônica.</p>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t">
          <Button onClick={onClose} variant="outline">
            Fechar
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" />
            Imprimir Nota Fiscal
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
