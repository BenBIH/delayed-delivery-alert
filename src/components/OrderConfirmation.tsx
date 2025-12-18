import { X, Info, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrderConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  totalPrice: string;
  deliveryService?: string;
}

const OrderConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  totalPrice = "210.90 KM",
  deliveryService = "BH Post Express",
}: OrderConfirmationProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-md w-full overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-border">
          <h2 className="text-foreground font-semibold text-lg">
            Narudžba artikla - {deliveryService}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Info banner */}
          <div className="bg-[hsl(var(--info-bg))] border border-[hsl(var(--info-border))] rounded-lg p-4 flex items-center gap-3">
            <Info className="w-5 h-5 text-[hsl(var(--info-icon))] flex-shrink-0" />
            <p className="text-sm text-foreground">
              Moguća je korekcija cijene dostave u zavisnosti od težine paketa. <a href="#" className="text-primary hover:underline font-medium">Vidi cjenovnik</a>
            </p>
          </div>

          {/* Truck illustration */}
          <div className="flex justify-center py-4">
            <div className="w-24 h-24 flex items-center justify-center">
              <svg viewBox="0 0 64 64" className="w-20 h-20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 36V16a4 4 0 014-4h28a4 4 0 014 4v20" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round"/>
                <path d="M40 24h12l8 12v8H40V24z" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="16" cy="48" r="6" stroke="hsl(var(--accent))" strokeWidth="2"/>
                <circle cx="48" cy="48" r="6" stroke="hsl(var(--accent))" strokeWidth="2"/>
                <path d="M22 44h20M4 44h6" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* Payment notice */}
          <div className="text-center">
            <div className="inline-block bg-[hsl(var(--info-bg))] border border-[hsl(var(--info-border))] px-4 py-2 rounded">
              <p className="text-sm text-foreground">
                Odabirom "Naruči" se obavezujete da platite prilikom dostave oglasa
              </p>
            </div>
          </div>

          {/* Total price */}
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">{totalPrice}</p>
          </div>

          {/* Confirmation text */}
          <p className="text-center text-sm text-muted-foreground">
            Potvrđujem narudžbu ovog oglasa i ispravnost unesenih podataka.
          </p>

          {/* Action buttons */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1 h-12 text-base font-medium border-border hover:bg-muted/50"
              onClick={onClose}
            >
              Poništi
            </Button>
            <Button
              className="flex-1 h-12 text-base font-medium bg-primary hover:bg-primary/90"
              onClick={onConfirm}
            >
              Naruči
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
