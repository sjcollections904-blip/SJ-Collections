import React, { useState } from 'react';
import { Package, Printer, MessageCircle, ArrowRight, Truck, MapPin, Copy, Check, Clock, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface OrderConfirmationPageProps {
  orderId: string;
  onNavigateToCatalog: () => void;
  onNavigateToOrders: () => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({
  orderId,
  onNavigateToCatalog,
  onNavigateToOrders
}) => {
  const { getOrderById } = useAuth();
  const order = getOrderById(orderId);
  const [copied, setCopied] = useState(false);

  const formatPKR = (amt: number) =>
    new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0
    }).format(amt).replace('PKR', 'PKR ');

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif-luxury text-2xl text-[#1A1A1A]">Order Receipt Not Found</h2>
        <p className="text-xs text-[#8A8882]">
          We could not locate this order in the active session. If you placed an order, please review your account history or contact our atelier.
        </p>
        <button
          onClick={onNavigateToCatalog}
          className="px-6 py-2.5 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-wider"
        >
          Return to Collections
        </button>
      </div>
    );
  }

  // Generate dynamic WhatsApp message from order details
  const itemsFormatted = order.items
    .map((i) => {
      const variantStr = i.size ? `${i.size} / ${i.color}` : i.color;
      return `${i.productName} — [${variantStr}] — Qty: ${i.quantity} — PKR ${i.unitPrice * i.quantity}`;
    })
    .join('\n');

  const waOrderMessage = `Hello SJ Collections! I would like to confirm my Cash on Delivery order.

Order Number: ${order.id}

Items:
${itemsFormatted}

Subtotal: PKR ${order.subtotal}
Shipping: PKR ${order.shippingFee}
Total Payable: PKR ${order.total}

Customer Name: ${order.customerName}
Phone: ${order.customerPhone}
Delivery City: ${order.shippingAddress.city}

Please confirm my order. Thank you!`;

  const waOrderUrl = `https://wa.me/923333368420?text=${encodeURIComponent(waOrderMessage)}`;

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(waOrderMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const isPendingWhatsApp = order.status === 'pending_whatsapp_confirmation';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="bg-white border border-[#E8E5DE] shadow-sm p-6 sm:p-12 space-y-8">
        
        {/* Top Logo & Status Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-8 border-b border-[#E8E5DE] gap-6 text-center sm:text-left">
          <div>
            <img src="/sj-logo.svg" alt="SJ Collections" className="h-10 w-auto mx-auto sm:mx-0 object-contain" />
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#8A8882] mt-2">
              Official Purchase Receipt & COD Bill
            </p>
          </div>

          <div className="sm:text-right">
            <span
              className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 border ${
                isPendingWhatsApp
                  ? 'text-amber-900 bg-amber-50 border-amber-300'
                  : 'text-emerald-800 bg-emerald-50 border-emerald-200'
              }`}
            >
              {isPendingWhatsApp ? 'Pending WhatsApp Confirmation' : `Status: ${order.status}`}
            </span>
            <p className="text-sm font-semibold text-[#1A1A1A] mt-2 tabular-nums">
              Order ID: {order.id}
            </p>
            <p className="text-xs text-[#8A8882] tabular-nums">
              {new Date(order.createdAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>

        {/* Action Banner for WhatsApp Confirmation */}
        {isPendingWhatsApp ? (
          <div className="bg-[#FAF7F2] p-6 border-2 border-[#1A1A1A] space-y-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h2 className="font-serif-luxury text-xl text-[#1A1A1A]">
                  Final Step: Send WhatsApp Message to Confirm
                </h2>
                <p className="text-xs text-[#555] leading-relaxed mt-1">
                  Your order <strong className="text-[#1A1A1A]">{order.id}</strong> has been logged in our system. Opening WhatsApp initiates contact, but you must press <strong>Send</strong> in WhatsApp to transmit your order details to our atelier. The order remains in pending verification until our team confirms your message.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={waOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#1A1A1A] text-[#F9F8F4] text-xs font-semibold uppercase tracking-[0.16em] flex items-center gap-2 hover:bg-black transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Open WhatsApp to Complete Confirmation</span>
              </a>

              <button
                type="button"
                onClick={handleCopyMessage}
                className="px-4 py-3 border border-[#D8D4CC] bg-white text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 hover:border-[#1A1A1A] transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Message Copied!' : 'Copy Order Summary'}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-[#F9F8F4] p-6 border border-[#E8E5DE] space-y-2">
            <h2 className="font-serif-luxury text-xl text-[#1A1A1A]">
              Thank you, {order.customerName}.
            </h2>
            <p className="text-xs text-[#555] leading-relaxed">
              We have received your order confirmation. A courier representative will contact you on <strong className="text-[#1A1A1A]">{order.customerPhone}</strong> prior to delivery.
            </p>
          </div>
        )}

        {/* Order Details & Delivery Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
          {/* Recipient & Delivery Destination */}
          <div className="border border-[#E8E5DE] p-5 space-y-3 bg-[#FDFCFA]">
            <div className="flex items-center gap-2 font-semibold uppercase tracking-wider text-[#1A1A1A] pb-2 border-b border-[#E8E5DE]">
              <MapPin className="w-4 h-4 text-[#8A8882]" />
              <span>Delivery Destination</span>
            </div>
            <p className="font-semibold text-sm text-[#1A1A1A]">{order.customerName}</p>
            <p className="text-[#555]">{order.shippingAddress.streetAddress}</p>
            <p className="text-[#555]">
              {order.shippingAddress.area}, {order.shippingAddress.city}
            </p>
            <p className="text-[#555] font-medium">{order.shippingAddress.province}, Pakistan</p>
            <p className="text-[#1A1A1A] pt-1 font-medium">Contact: {order.customerPhone}</p>
            {order.shippingAddress.deliveryInstructions && (
              <p className="text-[#8A8882] italic pt-1">
                Instructions: "{order.shippingAddress.deliveryInstructions}"
              </p>
            )}
          </div>

          {/* Payment & Shipping Summary */}
          <div className="border border-[#E8E5DE] p-5 space-y-3 bg-[#FDFCFA]">
            <div className="flex items-center gap-2 font-semibold uppercase tracking-wider text-[#1A1A1A] pb-2 border-b border-[#E8E5DE]">
              <Truck className="w-4 h-4 text-[#8A8882]" />
              <span>Payment &amp; Delivery Terms</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#8A8882]">Payment Mode:</span>
                <span className="font-semibold text-[#1A1A1A]">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8A8882]">Delivery Timeframe:</span>
                <span className="text-[#1A1A1A]">3–5 Business Days Nationwide</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8A8882]">Subtotal:</span>
                <span className="tabular-nums">{formatPKR(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <span>Privilege Discount:</span>
                  <span className="tabular-nums">-{formatPKR(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#8A8882]">Shipping Fee:</span>
                <span className="tabular-nums">
                  {order.shippingFee === 0 ? 'Complimentary' : formatPKR(order.shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#1A1A1A] pt-2 border-t border-[#E8E5DE]">
                <span>Total Payable (COD):</span>
                <span className="tabular-nums text-base font-bold">{formatPKR(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Itemized Ordered Creations */}
        <div className="space-y-4">
          <h3 className="font-serif-luxury text-lg text-[#1A1A1A]">Ordered Creations</h3>
          <div className="border border-[#E8E5DE] divide-y divide-[#E8E5DE]">
            {order.items.map((item, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-14 h-16 object-cover bg-[#F0ECE1] shrink-0 border border-[#E8E5DE]"
                  />
                  <div>
                    <h4 className="font-serif-luxury text-sm font-medium text-[#1A1A1A]">
                      {item.productName}
                    </h4>
                    <p className="text-[#8A8882] text-[11px]">
                      {item.size ? `Size: ${item.size} · ` : ''}Shade: {item.color} · SKU: {item.sku}
                    </p>
                    <p className="text-[#555] text-[11px] mt-0.5">
                      Quantity: {item.quantity} × {formatPKR(item.unitPrice)}
                    </p>
                  </div>
                </div>

                <div className="font-semibold tabular-nums text-sm text-[#1A1A1A]">
                  {formatPKR(item.subtotal)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions Footer */}
        <div className="pt-6 border-t border-[#E8E5DE] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 border border-[#D8D4CC] bg-white text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:border-[#1A1A1A] w-full sm:w-auto"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>

            <a
              href={waOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-[#2C2C2C] text-[#F9F8F4] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-black w-full sm:w-auto"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Reopen WhatsApp Chat</span>
            </a>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onNavigateToOrders}
              className="text-xs uppercase tracking-wider font-semibold text-[#8A8882] hover:text-[#1A1A1A] underline underline-offset-4"
            >
              View Order History
            </button>
            <button
              onClick={onNavigateToCatalog}
              className="px-6 py-2.5 bg-[#1A1A1A] text-[#F9F8F4] text-xs font-semibold uppercase tracking-wider hover:bg-black w-full sm:w-auto"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
