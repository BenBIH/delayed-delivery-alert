import { useState } from "react";
import DeliveryTracker from "@/components/DeliveryTracker";
import OrderForm from "@/components/OrderForm";
import OrderApproval from "@/components/OrderApproval";
import SendArticle from "@/components/SendArticle";
import SortFilterModal from "@/components/SortFilterModal";
import ArticleFilterModal from "@/components/ArticleFilterModal";

const Index = () => {
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [isOrderApprovalOpen, setIsOrderApprovalOpen] = useState(false);
  const [isArticleFilterOpen, setIsArticleFilterOpen] = useState(true);
  const [isSendArticleOpen, setIsSendArticleOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(true);
  const [selectedSort, setSelectedSort] = useState('date_desc');

  // Simulacija - datum zadnje izmjene statusa (postavljen na 4 dana unazad za demo)
  const lastStatusUpdate = new Date(Date.now() - 4 * 24 * 60 * 60 * 1000);

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Background content - simulacija OLX stranice */}
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="bg-card rounded-lg p-4 shadow-sm">
          <div className="flex gap-4">
            <div className="w-20 h-20 bg-muted rounded flex items-center justify-center text-muted-foreground text-xs">
              slični opis
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground">Novotel kartice</h3>
              <p className="text-sm text-muted-foreground">Količina:1</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-foreground">BH Post Express</p>
              <p className="text-sm text-muted-foreground">Integrisana dostava putem BH Post</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-4 shadow-sm">
          <div className="flex gap-4">
            <div className="w-20 h-20 bg-muted rounded flex items-center justify-center">
              <div className="w-12 h-16 border-2 border-muted-foreground/30 rounded" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground">Netgear XR1000 Nighthawk WiFi 6</h3>
            </div>
            <div className="text-right">
              <p className="font-medium text-foreground">BH Post Express</p>
              <p className="text-sm text-muted-foreground">Integrisana dostava putem BH Post</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => setIsTrackerOpen(true)}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Otvori praćenje pošiljke
          </button>
          <button
            onClick={() => setIsOrderFormOpen(true)}
            className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
          >
            Naruči artikal
          </button>
          <button
            onClick={() => setIsOrderApprovalOpen(true)}
            className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            Potvrdi narudžbu
          </button>
          <button
            onClick={() => setIsSendArticleOpen(true)}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Pošalji artikal
          </button>
          <button
            onClick={() => setIsSortOpen(true)}
            className="bg-[#002f34] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#002f34]/90 transition-colors"
          >
            Sortiraj
          </button>
          <button
            onClick={() => setIsArticleFilterOpen(true)}
            className="bg-[#002f34] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#002f34]/90 transition-colors"
          >
            Filteri
          </button>
        </div>

        {/* Sort Filter Modal Demo */}
        {isSortOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <SortFilterModal
              isOpen={isSortOpen}
              onClose={() => setIsSortOpen(false)}
              selectedSort={selectedSort}
              onSortChange={setSelectedSort}
            />
          </div>
        )}

        {/* Article Filter Modal Demo */}
        {isArticleFilterOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <ArticleFilterModal
              isOpen={isArticleFilterOpen}
              onClose={() => setIsArticleFilterOpen(false)}
            />
          </div>
        )}
      </div>

      {/* Delivery Tracker Modal */}
      <DeliveryTracker
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        lastStatusUpdate={lastStatusUpdate}
      />

      {/* Order Form Modal */}
      <OrderForm
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
      />

      {/* Order Approval Modal */}
      <OrderApproval
        isOpen={isOrderApprovalOpen}
        onClose={() => setIsOrderApprovalOpen(false)}
      />

      {/* Send Article Modal */}
      <SendArticle
        isOpen={isSendArticleOpen}
        onClose={() => setIsSendArticleOpen(false)}
      />
    </div>
  );
};

export default Index;
