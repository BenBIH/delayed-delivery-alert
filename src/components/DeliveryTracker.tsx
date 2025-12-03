import { useState, useEffect } from "react";
import { X, Package, CheckCircle, Truck, MapPin, Home, AlertTriangle } from "lucide-react";

interface DeliveryStep {
  id: number;
  title: string;
  icon: React.ReactNode;
  completed: boolean;
  active: boolean;
  timestamp?: Date;
}

interface DeliveryTrackerProps {
  isOpen: boolean;
  onClose: () => void;
  lastStatusUpdate?: Date;
}

const DeliveryTracker = ({ isOpen, onClose, lastStatusUpdate }: DeliveryTrackerProps) => {
  const [showDelayWarning, setShowDelayWarning] = useState(false);

  // Simulacija - provjerava da li je prošlo više od 3 dana od zadnje promjene
  useEffect(() => {
    if (lastStatusUpdate) {
      const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
      const timeSinceUpdate = Date.now() - lastStatusUpdate.getTime();
      setShowDelayWarning(timeSinceUpdate > threeDaysInMs);
    }
  }, [lastStatusUpdate]);

  const steps: DeliveryStep[] = [
    {
      id: 1,
      title: "Pošiljka naručena. Čeka se na odobravanje od strane prodavača.",
      icon: <Package className="w-5 h-5 text-primary" />,
      completed: true,
      active: false,
    },
    {
      id: 2,
      title: "Narudžba odobrena.",
      icon: <CheckCircle className="w-5 h-5 text-success" />,
      completed: true,
      active: false,
    },
    {
      id: 3,
      title: "Pošiljka preuzeta od strane kurira.",
      icon: <Truck className="w-5 h-5 text-secondary-foreground" />,
      completed: true,
      active: false,
    },
    {
      id: 4,
      title: "Pošiljka je u transportu. Očekujte poziv kurira.",
      icon: <MapPin className="w-5 h-5 text-primary" />,
      completed: false,
      active: true,
    },
    {
      id: 5,
      title: "Pošiljka isporučena kupcu.",
      icon: <Home className="w-5 h-5 text-muted-foreground" />,
      completed: false,
      active: false,
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="bg-primary px-6 py-4 flex items-center justify-between">
          <h2 className="text-primary-foreground font-semibold text-lg">
            Praćenje pošiljke za oglas
          </h2>
          <button
            onClick={onClose}
            className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Timeline */}
          <div className="relative">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-start gap-4 relative mb-6 last:mb-0">
                {/* Vertical line */}
                {index < steps.length - 1 && (
                  <div
                    className={`absolute left-6 top-12 w-0.5 bottom-0 -mb-6 ${
                      step.completed ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.completed
                      ? "bg-secondary"
                      : step.active
                      ? "bg-secondary"
                      : "bg-muted"
                  }`}
                >
                  {step.icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-h-[48px] flex items-center">
                  <p
                    className={`text-sm leading-relaxed ${
                      step.completed || step.active
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Delay Warning - prikazuje se nakon 3 dana bez izmjene statusa */}
          {showDelayWarning && (
            <div className="mt-4 p-4 bg-warning/15 border border-warning/30 rounded-lg animate-pulse-warning">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">
                  Isporuka traje duže od tri dana? Kontaktirajte kurirsku službu za dodatne provjere{" "}
                  <a
                    href="https://www.olx.ba/pomoc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold hover:underline"
                  >
                    OVDJE
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 pb-6 text-xs text-muted-foreground space-y-1">
          <p>Broj narudžbe: #558794</p>
          <p>Narudžba kreirana 21.10.2025 - u 16:49</p>
          <p>Tracking number: Čekanje na generisanje</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTracker;
