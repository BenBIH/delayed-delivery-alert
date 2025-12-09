import { useState } from "react";
import { X, Package, Truck, Plus, MapPin, Check, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import OrderConfirmation from "./OrderConfirmation";
import { toast } from "@/hooks/use-toast";
interface SavedAddress {
  id: string;
  name: string;
  postalCode: string;
  phone: string;
  address: string;
  city: string;
}

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  productPrice?: string;
  productImage?: string;
}

const OrderForm = ({ 
  isOpen, 
  onClose, 
  productName = "Gigabyte GS255F2 25\" monitor 200Hz FHD I...",
  productPrice = "199,90 KM",
  productImage
}: OrderFormProps) => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>("1");
  const [selectedDelivery, setSelectedDelivery] = useState<"bhpost" | "seller">("bhpost");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    city: "",
    postalCode: "",
    sellerNote: "",
    courierNote: "",
  });
  const [hideProductName, setHideProductName] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [activeNoteTab, setActiveNoteTab] = useState<"seller" | "courier">("seller");

  const sellerPriceList = [
    { weight: "Do 10 kg", price: 20 },
    { weight: "10 do 20 kg", price: 30 },
    { weight: "20 do 30 kg", price: 40 },
    { weight: "30 do 40 kg", price: 50 },
    { weight: "40 do 50 kg", price: 60 },
    { weight: "Preko 50 kg", price: 70 },
  ];

  const deliveryPrice = selectedDelivery === "bhpost" ? 11 : 20;
  const productPriceNum = parseFloat(productPrice.replace(",", ".").replace(/[^\d.]/g, ""));
  const totalPrice = (productPriceNum + deliveryPrice).toFixed(2).replace(".", ",") + " KM";
  const deliveryServiceName = selectedDelivery === "bhpost" ? "BH Post Express" : "Dostava po izboru prodavača";

  const handleContinue = () => {
    setShowConfirmation(true);
  };

  const handleConfirmOrder = () => {
    setShowConfirmation(false);
    onClose();
    toast({
      title: "Narudžba uspješna!",
      description: "Vaša narudžba je uspješno poslana.",
    });
  };
  const savedAddresses: SavedAddress[] = [
    {
      id: "1",
      name: "Neko nekox",
      postalCode: "88000",
      phone: "38761123321",
      address: "Dejzina Bikića 24",
      city: "Mostar",
    },
    {
      id: "2",
      name: "as fsa",
      postalCode: "71000",
      phone: "38761123321",
      address: "sana b",
      city: "Sarajevo",
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddress(addressId);
    const address = savedAddresses.find(a => a.id === addressId);
    if (address) {
      setFormData({
        name: address.name,
        address: address.address,
        phone: address.phone,
        city: address.city,
        postalCode: address.postalCode,
        sellerNote: formData.sellerNote,
        courierNote: formData.courierNote,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-foreground/50 flex items-start justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-card rounded-lg shadow-xl max-w-2xl w-full my-4 overflow-hidden flex-shrink-0">
        {/* Header */}
        <div className="bg-primary px-6 py-4 flex items-center justify-between">
          <h2 className="text-primary-foreground font-semibold text-lg">
            Narudžba artikla - BH Post Express
          </h2>
          <button
            onClick={onClose}
            className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Info banner */}
          <div className="bg-secondary/20 border border-secondary/30 rounded-lg p-4 flex items-center gap-3">
            <Info className="w-5 h-5 text-secondary-foreground flex-shrink-0" />
            <p className="text-sm text-foreground">
              Za svaku isporučenu narudžbu nagrađujemo Vas sa OLX kreditom
            </p>
          </div>

          {/* Product info */}
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

          {/* Delivery info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="w-4 h-4 text-secondary" />
              <span>Šta je OLX brza dostava</span>
              <a href="#" className="text-primary hover:underline font-medium">Vidi više</a>
            </div>
            <h3 className="font-medium text-foreground">Izaberite dostavu</h3>

            <button
              onClick={() => setSelectedDelivery("bhpost")}
              className={`w-full border rounded-lg p-4 text-left transition-all ${
                selectedDelivery === "bhpost"
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    selectedDelivery === "bhpost" ? "bg-primary" : "border-2 border-primary"
                  }`}>
                    {selectedDelivery === "bhpost" && <Check className="w-3 h-3 text-primary-foreground" />}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">BH Post Express</p>
                    <p className="text-sm text-muted-foreground">Integrisana dostava putem BH Post Express servisa</p>
                  </div>
                </div>
                <p className="font-semibold text-foreground">11 KM</p>
              </div>
            </button>

            <div>
              <button
                onClick={() => setSelectedDelivery("seller")}
                className={`w-full border rounded-lg p-4 text-left transition-all ${
                  selectedDelivery === "seller"
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20 rounded-b-none"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      selectedDelivery === "seller" ? "bg-primary" : "border-2 border-primary"
                    }`}>
                      {selectedDelivery === "seller" && <Check className="w-3 h-3 text-primary-foreground" />}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Dostava po izboru prodavača</p>
                      <p className="text-sm text-muted-foreground">Organizacija dostave lično ili posredstvom kurirskih službi</p>
                    </div>
                  </div>
                  <p className="font-semibold text-foreground">20 KM</p>
                </div>
              </button>

              {selectedDelivery === "seller" && (
                <div className="bg-muted/50 border border-t-0 border-primary rounded-b-lg p-4">
                  <p className="text-sm font-medium text-foreground mb-3">Cjenovnik dostave</p>
                  <div className="grid grid-cols-3 gap-2">
                    {sellerPriceList.map((item) => (
                      <div key={item.weight} className="bg-card shadow-sm rounded-md p-3">
                        <span className="text-xs font-medium text-muted-foreground block">{item.weight}</span>
                        <span className="font-semibold text-foreground">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Address selection */}
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Izaberite adresu</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {savedAddresses.map((addr) => (
                <button
                  key={addr.id}
                  onClick={() => handleAddressSelect(addr.id)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedAddress === addr.id
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
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
              <button className="p-3 rounded-lg border border-dashed border-border hover:border-primary hover:bg-muted/30 flex flex-col items-center justify-center gap-2 transition-all min-h-[120px]">
                <Plus className="w-6 h-6 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Dodaj ili promijeni adresu</span>
              </button>
            </div>
          </div>

          {/* Form fields */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Popunite podatke za dostavu</h3>
            
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

            <div className="grid grid-cols-2 gap-4">
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
            </div>

            <div className="space-y-2">
              <div className="flex rounded-lg overflow-hidden border border-border">
                <button
                  type="button"
                  onClick={() => setActiveNoteTab("seller")}
                  className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                    activeNoteTab === "seller"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                  }`}
                >
                  Napomena prodavaču
                </button>
                <button
                  type="button"
                  onClick={() => setActiveNoteTab("courier")}
                  className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                    activeNoteTab === "courier"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                  }`}
                >
                  Napomena kuriru
                </button>
              </div>
              
              {activeNoteTab === "seller" ? (
                <div className="space-y-1">
                  <Textarea
                    value={formData.sellerNote}
                    onChange={(e) => handleInputChange("sellerNote", e.target.value.slice(0, 200))}
                    placeholder="Napomena za prodavača..."
                    className="bg-muted/30 border-border focus:border-primary resize-none min-h-[80px]"
                    maxLength={200}
                  />
                  <p className="text-xs text-primary">{formData.sellerNote.length} / 200</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <Textarea
                    value={formData.courierNote}
                    onChange={(e) => handleInputChange("courierNote", e.target.value.slice(0, 200))}
                    placeholder="Napomena za kurirsku službu..."
                    className="bg-muted/30 border-border focus:border-primary resize-none min-h-[80px]"
                    maxLength={200}
                  />
                  <p className="text-xs text-primary">{formData.courierNote.length} / 200</p>
                </div>
              )}
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Checkbox
                id="hideProductName"
                checked={hideProductName}
                onCheckedChange={(checked) => setHideProductName(checked as boolean)}
                className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label htmlFor="hideProductName" className="text-sm text-foreground cursor-pointer">
                Sakrij naziv oglasa na pošiljci
              </label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox
                id="acceptTerms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label htmlFor="acceptTerms" className="text-sm text-foreground cursor-pointer">
                Slažem se sa{" "}
                <a href="#" className="text-primary hover:underline font-medium">
                  Uslovima korištenja
                </a>{" "}
                ove usluge.
              </label>
            </div>
          </div>

          {/* Submit button */}
          <Button
            className="w-full h-12 text-base font-medium"
            variant="outline"
            disabled={!acceptTerms}
            onClick={handleContinue}
          >
            Nastavi
          </Button>
        </div>

        {/* Confirmation Modal */}
        <OrderConfirmation
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleConfirmOrder}
          totalPrice={totalPrice}
          deliveryService={deliveryServiceName}
        />
      </div>
    </div>
  );
};

export default OrderForm;
