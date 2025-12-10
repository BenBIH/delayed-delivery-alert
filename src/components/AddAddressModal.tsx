import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AddressData {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  isPrimary: boolean;
}

interface AddAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAddress: (address: AddressData) => void;
}

const AddAddressModal = ({ isOpen, onClose, onAddAddress }: AddAddressModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [isPrimary, setIsPrimary] = useState<"yes" | "no">("no");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const newAddress: AddressData = {
      id: Date.now().toString(),
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
      isPrimary: isPrimary === "yes",
    };
    onAddAddress(newAddress);
    // Reset form
    setFormData({
      name: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
    });
    setIsPrimary("no");
    onClose();
  };

  const isFormValid = formData.name && formData.phone && formData.address && formData.city && formData.postalCode;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="bg-primary px-6 py-4 flex items-center justify-between">
          <h2 className="text-primary-foreground font-semibold text-lg">
            Dodaj novu adresu
          </h2>
          <button
            onClick={onClose}
            className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Name and Phone */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Ime i prezime
              </label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Unesite ime i prezime"
                className="bg-muted/30 border-border focus:border-primary"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Broj telefona
              </label>
              <Input
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+38X XX XXX XXX"
                className="bg-muted/30 border-border focus:border-primary"
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Adresa
            </label>
            <Input
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Unesite adresu"
              className="bg-muted/30 border-border focus:border-primary"
            />
          </div>

          {/* City and Postal Code */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Grad
              </label>
              <Input
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                placeholder="Izaberi grad"
                className="bg-muted/30 border-border focus:border-primary"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Poštanski broj
              </label>
              <Input
                value={formData.postalCode}
                onChange={(e) => handleInputChange("postalCode", e.target.value)}
                placeholder="00000"
                className="bg-muted/30 border-border focus:border-primary"
              />
            </div>
          </div>

          {/* Primary Address */}
          <div className="space-y-3">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Primarna adresa
            </label>
            <RadioGroup
              value={isPrimary}
              onValueChange={(value) => setIsPrimary(value as "yes" | "no")}
              className="space-y-2"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="yes" id="primary-yes" className="border-primary text-primary" />
                <label htmlFor="primary-yes" className="text-sm text-foreground cursor-pointer">
                  Da
                </label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="no" id="primary-no" className="border-primary text-primary" />
                <label htmlFor="primary-no" className="text-sm text-foreground cursor-pointer">
                  Ne
                </label>
              </div>
            </RadioGroup>
          </div>

          {/* Submit button */}
          <Button
            className="w-full h-12 text-base font-medium"
            disabled={!isFormValid}
            onClick={handleSubmit}
          >
            Dodaj adresu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddAddressModal;
