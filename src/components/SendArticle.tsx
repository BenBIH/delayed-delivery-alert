import { useState } from "react";
import { X, Package, Truck, Plus, Check, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

interface SendArticleProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  productPrice?: string;
  productImage?: string;
}

const SendArticle = ({ 
  isOpen, 
  onClose, 
  productName = "Klima INVERTER 12 VIVAX ACP-12CH35AERI AERI 12ka -25 A+++",
  productPrice = "999 KM",
  productImage
}: SendArticleProps) => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>("1");
  const [selectedDelivery, setSelectedDelivery] = useState<"bhpost" | "seller">("bhpost");
  const [purchasePrice, setPurchasePrice] = useState(productPrice.replace(/[^\d,]/g, ""));
  const [deliveryPayer, setDeliveryPayer] = useState<"buyer" | "seller">("buyer");
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const [sellerData, setSellerData] = useState({
    name: "",
    address: "",
    phone: "",
    city: "",
    postalCode: "",
  });

  const [buyerData, setBuyerData] = useState({
    name: "",
    address: "",
    phone: "",
    city: "",
    postalCode: "",
  });

  const [courierNote, setCourierNote] = useState("");
  const [hideProductName, setHideProductName] = useState(false);
  const [isFragile, setIsFragile] = useState(false);
  const [allowInspection, setAllowInspection] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const sellerPriceList = [
    { weight: "Do 10 kg", price: 20 },
    { weight: "10 do 20 kg", price: 30 },
    { weight: "20 do 30 kg", price: 40 },
    { weight: "30 do 40 kg", price: 50 },
    { weight: "40 do 50 kg", price: 60 },
    { weight: "Preko 50 kg", price: 70 },
  ];

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

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddress(addressId);
    const address = savedAddresses.find(a => a.id === addressId);
    if (address) {
      setSellerData({
        name: address.name,
        address: address.address,
        phone: address.phone,
        city: address.city,
        postalCode: address.postalCode,
      });
    }
  };

  const handleContinue = () => {
    setShowConfirmation(true);
  };

  const handleConfirmSend = () => {
    setShowConfirmation(false);
    onClose();
    toast({
      title: "Oglas uspješno poslan!",
      description: "Vaš oglas je spreman za dostavu.",
    });
  };

  if (!isOpen) return null;

  const priceValue = parseFloat(purchasePrice.replace(",", ".") || "0");
  const formattedPrice = priceValue.toFixed(2).replace(".", ",") + " KM";

  return (
    <div className="fixed inset-0 bg-foreground/50 flex items-start justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-card rounded-lg shadow-xl max-w-2xl w-full my-4 overflow-hidden flex-shrink-0">
        {/* Header */}
        <div className="bg-primary px-6 py-4 flex items-center justify-between">
          <h2 className="text-primary-foreground font-semibold text-lg">
            Pošaljite oglas - BH Post Express
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
            {/* Info banner */}
            <div className="bg-secondary/20 border border-secondary/30 rounded-lg p-4 flex items-center gap-3">
              <Info className="w-5 h-5 text-secondary-foreground flex-shrink-0" />
              <p className="text-sm text-foreground">
                U slučaju izmjene brojnog stanja, ili dodatnih artikala izmijenite otkupnu cijenu
              </p>
            </div>

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

            {/* Purchase price input */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Unesite otkupnu cijenu oglasa
              </label>
              <Input
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                placeholder="0"
                className="bg-muted/30 border-border focus:border-primary"
              />
            </div>

            {/* Delivery selection */}
            <div className="space-y-3">
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
                    <p className="font-semibold text-foreground">Po dogovoru</p>
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

            {/* Courier note */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Napomena kurirskoj službi
              </label>
              <Textarea
                value={courierNote}
                onChange={(e) => setCourierNote(e.target.value.slice(0, 200))}
                placeholder="Napomena: …"
                className="bg-muted/30 border-border focus:border-primary resize-none min-h-[80px]"
                maxLength={200}
              />
              <p className="text-xs text-primary text-right">{courierNote.length} / 200</p>
            </div>

            {/* Seller's data form */}
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Vaši podaci</h3>
              
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Ime i prezime</label>
                <Input
                  value={sellerData.name}
                  onChange={(e) => setSellerData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Unesite ime i prezime"
                  className="bg-muted/30 border-border focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Adresa</label>
                <Input
                  value={sellerData.address}
                  onChange={(e) => setSellerData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Unesite adresu"
                  className="bg-muted/30 border-border focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Broj telefona</label>
                <Input
                  value={sellerData.phone}
                  onChange={(e) => setSellerData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Unesite broj telefona"
                  className="bg-muted/30 border-border focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Grad</label>
                  <Input
                    value={sellerData.city}
                    onChange={(e) => setSellerData(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="Izaberi grad"
                    className="bg-muted/30 border-border focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Poštanski broj</label>
                  <Input
                    value={sellerData.postalCode}
                    onChange={(e) => setSellerData(prev => ({ ...prev, postalCode: e.target.value }))}
                    placeholder="00000"
                    className="bg-muted/30 border-border focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Buyer's data form */}
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Podaci o kupcu</h3>
              
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Ime i prezime</label>
                <Input
                  value={buyerData.name}
                  onChange={(e) => setBuyerData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Unesite ime i prezime"
                  className="bg-muted/30 border-border focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Adresa</label>
                <Input
                  value={buyerData.address}
                  onChange={(e) => setBuyerData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Unesite adresu"
                  className="bg-muted/30 border-border focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Broj telefona</label>
                <Input
                  value={buyerData.phone}
                  onChange={(e) => setBuyerData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Unesite broj telefona"
                  className="bg-muted/30 border-border focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Grad</label>
                  <Input
                    value={buyerData.city}
                    onChange={(e) => setBuyerData(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="Izaberi grad"
                    className="bg-muted/30 border-border focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Poštanski broj</label>
                  <Input
                    value={buyerData.postalCode}
                    onChange={(e) => setBuyerData(prev => ({ ...prev, postalCode: e.target.value }))}
                    placeholder="00000"
                    className="bg-muted/30 border-border focus:border-primary"
                  />
                </div>
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
                  id="isFragile"
                  checked={isFragile}
                  onCheckedChange={(checked) => setIsFragile(checked as boolean)}
                  className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label htmlFor="isFragile" className="text-sm text-foreground cursor-pointer">
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
                  Omogući pregled pošiljke prilikom preuzimanja
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

            {/* Delivery cost payer */}
            <div className="space-y-3">
              <h3 className="font-medium text-foreground">Dostava</h3>
              <RadioGroup
                value={deliveryPayer}
                onValueChange={(value) => setDeliveryPayer(value as "buyer" | "seller")}
                className="space-y-2"
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="buyer" id="buyer" className="border-primary text-primary" />
                  <label htmlFor="buyer" className="text-sm text-foreground cursor-pointer">
                    Kupac će platiti dostavu
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="seller" id="sellerPay" className="border-primary text-primary" />
                  <label htmlFor="sellerPay" className="text-sm text-foreground cursor-pointer">
                    Ja ću platiti dostavu
                  </label>
                </div>
              </RadioGroup>
            </div>

            {/* Warning if terms not accepted */}
            {!acceptTerms && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 flex items-center gap-3">
                <Info className="w-5 h-5 text-destructive flex-shrink-0" />
                <p className="text-sm text-destructive">
                  Morate se složiti sa uslovima korištenja ove usluge.
                </p>
              </div>
            )}

            {/* Submit button */}
            <Button
              className="w-full h-12 text-base font-medium"
              variant="outline"
              disabled={!acceptTerms}
              onClick={handleContinue}
            >
              Potvrdi slanje oglasa
            </Button>
          </div>
        ) : (
          /* Confirmation modal content */
          <div className="p-6 space-y-6 text-center">
            <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Truck className="w-12 h-12 text-primary" />
            </div>

            <div className="space-y-2">
              <p className="text-muted-foreground">
                Odabirom opcije "Potvrdi" se obavezujete da pošaljete pošiljku oglasa
              </p>
              <p className="text-3xl font-bold text-foreground">{formattedPrice}</p>
              <p className="text-sm text-muted-foreground">
                Potvrđujem slanje ovog oglasa i ispravnost unesenih podataka.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-12"
                onClick={() => setShowConfirmation(false)}
              >
                Poništi
              </Button>
              <Button
                className="flex-1 h-12"
                onClick={handleConfirmSend}
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

export default SendArticle;
