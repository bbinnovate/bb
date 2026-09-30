"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

type OrderNotification = {
  id: number;
  orderId: string;
  brand: string;
  itemsCount: number;
  amount: number;
  amountText: string;
  time: string;
};

const orders: OrderNotification[] = [
  {
    id: 1,
    orderId: "#1082",
    brand: "HoH Fashion",
    itemsCount: 2,
    amount: 25000,
    amountText: "₹25,000",
    time: "Just now",
  },
  {
    id: 2,
    orderId: "#1083",
    brand: "Urban Kicks",
    itemsCount: 1,
    amount: 35000,
    amountText: "₹35,000",
    time: "1m ago",
  },
  {
    id: 3,
    orderId: "#1084",
    brand: "Silk & Stitch",
    itemsCount: 3,
    amount: 75000,
    amountText: "₹75,000",
    time: "2m ago",
  },
  {
    id: 4,
    orderId: "#1085",
    brand: "Glow Essentials",
    itemsCount: 1,
    amount: 50000,
    amountText: "₹50,000",
    time: "Just now",
  },
  {
    id: 5,
    orderId: "#1086",
    brand: "Aura Jewelers",
    itemsCount: 2,
    amount: 40000,
    amountText: "₹40,000",
    time: "3m ago",
  },
  {
    id: 6,
    orderId: "#1087",
    brand: "Apex Performance",
    itemsCount: 4,
    amount: 60000,
    amountText: "₹60,000",
    time: "Just now",
  },
];

export default function ShopifyNotification() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Trigger popup mechanism on scroll
  useEffect(() => {
    if (dismissed) return;

    const handleScroll = () => {
      if (window.scrollY > 80 && !hasScrolled) {
        setHasScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled, dismissed]);

  // Handle periodic order popups once scrolled
  useEffect(() => {
    if (!hasScrolled || dismissed) return;

    // Initial popup after user starts scrolling
    const initialTimer = setTimeout(() => {
      triggerOrderPopup(0);
    }, 800);

    // Trigger next order every 9 seconds
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => {
          const nextIndex = (prev + 1) % orders.length;
          triggerOrderPopup(nextIndex);
          return nextIndex;
        });
      }, 500);
    }, 9000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [hasScrolled, dismissed]);

  // Helper to trigger popup + dispatch navbar event
  const triggerOrderPopup = (index: number) => {
    const order = orders[index];
    setIsVisible(true);

    // Dispatch event to navbar money counter so it jumps immediately!
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("shopify-order-received", {
          detail: {
            amount: order.amount,
            amountText: order.amountText,
            orderId: order.orderId,
          },
        })
      );
    }
  };

  // Auto-hide popup after 5 seconds
  useEffect(() => {
    if (!isVisible) return;
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 5500);
    return () => clearTimeout(hideTimer);
  }, [isVisible, currentIndex]);

  if (dismissed) return null;

  const current = orders[currentIndex];

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 max-w-[340px] sm:max-w-[390px] transition-all duration-500 ease-out transform ${
        isVisible && hasScrolled
          ? "translate-y-0 opacity-100 pointer-events-auto scale-100"
          : "translate-y-10 opacity-0 pointer-events-none scale-95"
      }`}
    >
      {/* iOS Lockscreen Push Notification Styling (matching Shopify iOS popup screenshot exactly) */}
      <div className="relative bg-[#2e2d2b]/85 backdrop-blur-2xl border border-white/10 rounded-[22px] p-3.5 shadow-2xl text-white font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif] flex items-start gap-3 sm:gap-3.5">
        {/* Shopify Official App Icon Squircle */}
        <div className="w-11 h-11 rounded-[12px] bg-white flex items-center justify-center shrink-0 shadow-md p-1.5 overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              fill="#95bf47"
              d="M84.5 24.8c-.1-.7-.7-1.2-1.4-1.2h-11.8v-3.7C71.3 8.9 62.4 0 51.4 0S31.5 8.9 31.5 19.9v3.7H19.7c-.7 0-1.3.5-1.4 1.2L11 88.2c-.1.7.3 1.4.9 1.7.3.1.6.2.9.2h76.8c.3 0 .6-.1.9-.2.6-.3 1-.1.9-1.7L84.5 24.8zM41.5 19.9c0-5.5 4.4-9.9 9.9-9.9s9.9 4.4 9.9 9.9v3.7H41.5v-3.7z"
            />
            <path
              fill="#ffffff"
              d="M51.8 45.2c-5.4 0-8.2 2.7-8.2 6.5 0 8.1 14.8 5.7 14.8 14.4 0 4.5-3.8 7.3-9 7.3-6.2 0-10.4-3.5-10.8-8.8h-5.9c.5 8.6 7.4 13.9 16.7 13.9 8.8 0 14.8-4.7 14.8-12.6 0-8.8-14.7-6.2-14.7-14.2 0-3.8 3.3-5.9 7.7-5.9 5.3 0 8.7 2.7 9.2 7.1h5.8c-.6-7.5-6.5-12.7-14.4-12.7z"
            />
          </svg>
        </div>

        {/* Content Body */}
        <div className="flex-1 min-w-0 pr-3">
          <div className="flex items-center justify-between mb-0.5">
            <span className="font-semibold text-white text-[15px] tracking-tight">
              Shopify
            </span>
            <span className="text-[12px] text-white/60 font-normal">
              {current.time}
            </span>
          </div>

          <p className="text-[13px] sm:text-[13.5px] text-white/90 leading-[1.35] font-normal tracking-tight">
            <span className="font-medium text-white">{current.brand}</span> has a new order for {current.itemsCount} {current.itemsCount === 1 ? "item" : "items"} totaling <span className="font-semibold text-white">{current.amountText}</span> from Online Store.
          </p>
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="text-white/40 hover:text-white p-1 rounded-full transition-colors shrink-0 -mt-1 -mr-1"
          aria-label="Close notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
