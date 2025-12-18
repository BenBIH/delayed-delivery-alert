import { useState } from "react";
import { X, Plus, Info, Truck, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
interface SavedAddress {
  id: string;
  name: string;
  postalCode: string;
  phone: string;
  address: string;
  city: string;
}

interface RecipientData {
  name: string;
  username: string | null;
  city: string;
}

interface OrderApprovalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  productPrice?: string;
  productImage?: string;
  buyerNote?: string;
  recipientData?: RecipientData;
}

const OrderApproval = ({
  isOpen,
  onClose,
  productName = "Klima INVERTER 12 VIVAX ACP-12CH35AERI AERI 12ka -25 A+++",
  productPrice = "999 KM",
  productImage,
  buyerNote = "",
  recipientData = { name: "Ime i prezime", username: null, city: "Sarajevo" }
}: OrderApprovalProps) => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>("1");
  const [shippingPayer, setShippingPayer] = useState<"seller" | "buyer">("buyer");
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    postalCode: "",
    address: "",
    phone: "",
  });
  const [isFragile, setIsFragile] = useState(false);
  const [allowInspection, setAllowInspection] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const savedAddresses: SavedAddress[] = [
    {
      id: "1",
      name: "Be be",
      postalCode: "71000",
      phone: "38761123309",
      address: "besto bb",
      city: "Sarajevo",
    },
    {
      id: "2",
      name: "The first",
      postalCode: "72000",
      phone: "38762445554",
      address: "I'm not sure what",
      city: "Zenica - dostava",
    },
  ];

  const productPriceNum = parseFloat(productPrice.replace(",", ".").replace(/[^\d.]/g, ""));

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddress(addressId);
    const address = savedAddresses.find(a => a.id === addressId);
    if (address) {
      setFormData({
        name: address.name,
        city: address.city,
        postalCode: address.postalCode,
        address: address.address,
        phone: address.phone,
      });
    }
  };

  const handleContinue = () => {
    setShowConfirmation(true);
  };

  const handleConfirmOrder = () => {
    setShowConfirmation(false);
    onClose();
    toast({
      title: "Narudžba potvrđena!",
      description: "Uspješno ste odobrili narudžbu.",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-foreground/50 flex items-start justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-card rounded-lg shadow-xl max-w-2xl w-full my-4 overflow-hidden flex-shrink-0">
        {/* Header */}
        <div className="bg-primary px-6 py-4 flex items-center justify-between">
          <h2 className="text-primary-foreground font-semibold text-lg">
            Potvrdi narudžbu - BH Post Express
          </h2>
          <button
            onClick={onClose}
            className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {!showConfirmation ? (
          <div className="p-6 space-y-6">
            {/* Product info with image */}
            <div className="bg-muted/50 rounded-lg p-4 flex items-center gap-4">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                {productImage ? (
                  <img src={productImage} alt={productName} className="w-full h-full object-cover" />
                ) : (
                  <Package className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{productName}</p>
                <p className="text-lg font-semibold text-primary">{productPrice}</p>
              </div>
            </div>

            {/* OLX brza dostava info */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="w-4 h-4 text-secondary" />
              <span>Šta je OLX brza dostava</span>
              <a href="#" className="text-primary hover:underline font-medium">Vidi više</a>
            </div>

            {/* Buyer's note */}
            {buyerNote && (
              <div className="space-y-2">
                <h3 className="font-medium text-muted-foreground">Napomena kupca:</h3>
                <p className="text-foreground">{buyerNote}</p>
              </div>
            )}

            {/* Shipping cost responsibility */}
            <div className="space-y-3">
              <h3 className="font-medium text-foreground">Ko snosi troškove dostave</h3>
              <RadioGroup
                value={shippingPayer}
                onValueChange={(value) => setShippingPayer(value as "seller" | "buyer")}
                className="flex gap-8"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="seller" id="seller" />
                  <label htmlFor="seller" className="text-foreground cursor-pointer">Prodavač</label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="buyer" id="buyer" />
                  <label htmlFor="buyer" className="text-foreground cursor-pointer">Kupac</label>
                </div>
              </RadioGroup>
            </div>

            {/* OLX Garancija */}
            <div className="bg-warning/20 border border-warning/30 rounded-lg p-4">
              <h4 className="font-bold text-sm text-warning-foreground">OLX GARANCIJA</h4>
              <p className="text-sm text-warning-foreground mt-1">
                U slučaju povrata pošiljke ne plaćate dodatne troškove.
              </p>
            </div>

            {/* Address selection */}
            <div className="space-y-3">
              <h3 className="font-medium text-foreground">Izaberite adresu</h3>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {savedAddresses.map((addr) => (
                  <button
                    key={addr.id}
                    onClick={() => handleAddressSelect(addr.id)}
                    className={`p-3 rounded-lg border text-left transition-all min-w-[200px] flex-shrink-0 ${
                      selectedAddress === addr.id
                        ? "border-[hsl(var(--selected-border))] bg-[hsl(var(--selected-bg))] ring-2 ring-[hsl(var(--selected-ring))]/20"
                        : "border-border hover:border-primary/50 hover:bg-muted/30"
                    }`}
                  >
                    <p className="text-xs text-muted-foreground">Ime i prezime: <span className="text-primary font-medium">{addr.name}</span></p>
                    <p className="text-xs text-muted-foreground">Poštanski broj: <span className="text-foreground font-medium">{addr.postalCode}</span></p>
                    <p className="text-xs text-muted-foreground">Broj telefona: <span className="text-primary font-medium">{addr.phone}</span></p>
                    <p className="text-xs text-muted-foreground">Adresa: <span className="text-foreground font-medium">{addr.address}</span></p>
                    <p className="text-xs text-muted-foreground">Grad: <span className="text-foreground font-medium">{addr.city}</span></p>
                  </button>
                ))}
                <button className="p-3 rounded-lg border border-dashed border-border hover:border-primary hover:bg-muted/30 flex flex-col items-center justify-center gap-2 transition-all min-w-[140px] flex-shrink-0">
                  <Plus className="w-6 h-6 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground text-center">Dodaj</span>
                </button>
              </div>
            </div>

            {/* Form fields - Vaši podaci */}
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Vaši podaci</h3>
              
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Ime i prezime</label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Unesite ime i prezime"
                  className="bg-muted/30 border-border focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Grad</label>
                <Input
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="Unesite grad"
                  className="bg-muted/30 border-border focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Poštanski broj</label>
                <Input
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange("postalCode", e.target.value)}
                  placeholder="00000"
                  className="bg-muted/30 border-border focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Adresa</label>
                <Input
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Unesite adresu"
                  className="bg-muted/30 border-border focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Broj telefona</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Unesite broj telefona"
                  className="bg-muted/30 border-border focus:border-primary"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="fragile"
                  checked={isFragile}
                  onCheckedChange={(checked) => setIsFragile(checked as boolean)}
                  className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label htmlFor="fragile" className="text-sm text-foreground cursor-pointer">
                  Lomljivo
                </label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox
                  id="allowInspection"
                  checked={allowInspection}
                  onCheckedChange={(checked) => setAllowInspection(checked as boolean)}
                  className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label htmlFor="allowInspection" className="text-sm text-foreground cursor-pointer">
                  Omogući pregled pošiljke prilikom preuzimanja.
                </label>
              </div>
            </div>

            {/* Recipient data */}
            <div className="bg-[hsl(var(--info-bg))] border border-[hsl(var(--info-border))] rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-2">Podaci o primaocu</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Primaoc: <span className="text-foreground">{recipientData.name}</span></p>
                <p>Korisničko ime: <span className="text-foreground">{recipientData.username || "null"}</span></p>
                <p>Grad: <span className="text-foreground">{recipientData.city}</span></p>
              </div>
            </div>

            {/* Additional information */}
            <div className="bg-warning/20 border border-warning/30 rounded-lg p-4 space-y-2">
              <h4 className="font-bold text-sm text-warning-foreground">DODATNE INFORMACIJE</h4>
              <div className="text-sm text-warning-foreground space-y-2">
                <p>
                  Odobravanjem dostave ovog oglasa prihvatate da ćete isti propisno upakovati i predati
                  kuriru na dostavu odabranom kupcu.
                </p>
                <p>
                  Prije odobravanja Vas molimo da provjerite da li artikal imate na stanju, te da li ste
                  unijeli tačnu adresu za preuzimanje paketa.
                </p>
                <p>
                  Nakon što artikal bude dostavljen kupcu, iznos od <strong>{productPrice}</strong> će se
                  dostaviti na Vašu adresu.
                </p>
                <p>
                  Ovu opciju mogu koristiti samo korisnici iz Bosne i Hercegovine.
                </p>
              </div>
            </div>

            {/* Submit button */}
            <Button
              className="w-full h-12 text-base font-medium"
              variant="outline"
              onClick={handleContinue}
            >
              Nastavi
            </Button>
          </div>
        ) : (
          /* Confirmation Modal Content */
          <div className="p-6 flex flex-col items-center text-center space-y-6">
            {/* Delivery truck icon */}
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
              <Truck className="w-12 h-12 text-primary" />
            </div>

            <div className="space-y-2">
              <p className="text-muted-foreground">
                Odabirom opcije "Potvrdi" se obavezujete da pošaljete pošiljku oglasa
              </p>
            </div>

            <div className="text-3xl font-bold text-foreground">
              {productPriceNum.toFixed(2).replace(".", ",")} KM
            </div>

            <p className="text-muted-foreground">
              Potvrđujem narudžbu ovog oglasa i ispravnost unesenih podataka.
            </p>

            <div className="flex gap-4 w-full">
              <Button
                variant="outline"
                className="flex-1 h-12"
                onClick={() => setShowConfirmation(false)}
              >
                Poništi
              </Button>
              <Button
                className="flex-1 h-12"
                onClick={handleConfirmOrder}
              >
                Potvrdi
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderApproval;
