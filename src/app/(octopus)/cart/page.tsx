'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import OctopusLayout from '@/components/layout/OctopusLayout';
import { useCartStore } from '@/store/cartStore';

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, getTotalPrice, getItemCount } = useCartStore();

  const totalPrice = getTotalPrice();
  const itemCount = getItemCount();

  const handleCheckout = () => {
    if (itemCount > 0) {
      router.push('/checkout');
    }
  };

  return (
    <OctopusLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <Link
            href="/marketplace"
            className="px-3.5 py-2 bg-gray-100 text-gray-900 rounded-md font-semibold hover:bg-gray-200:bg-gray-600 transition-all"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Continue Shopping
          </Link>
        </div>

        {itemCount > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-md p-5 border border-gray-200"
                >
                  <div className="flex gap-4">
                    {/* Thumbnail */}
                    <Link href={`/marketplace/${item.id}`} className="shrink-0">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-32 h-32 rounded-lg object-cover hover:opacity-75 transition-opacity"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/marketplace/${item.id}`}
                        className="block hover:text-purple-600:text-purple-400 transition-colors"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                          {item.title}
                        </h3>
                      </Link>

                      <div className="flex items-center gap-2 mb-4">
                        <img
                          src={item.creatorAvatar}
                          alt={item.creatorName}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-sm text-gray-600">
                          {item.creatorName}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium capitalize">
                          {item.type}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-base font-semibold text-gray-900">
                          ${item.price.toFixed(2)}
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="px-4 py-2 text-red-600 hover:bg-red-50:bg-red-900/20 rounded-lg transition-all flex items-center gap-2"
                        >
                          <i className="fas fa-trash"></i>
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-md p-5 border border-gray-200 sticky top-5 space-y-4">
                <h2 className="text-base font-semibold text-gray-900">Order Summary</h2>

                <div className="space-y-3 py-4 border-y border-gray-200">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Tax</span>
                    <span className="font-semibold">$0.00</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-base font-semibold text-gray-900">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full px-6 py-4 bg-purple-600 text-white rounded-md font-semibold hover:shadow-sm transition-all"
                >
                  Proceed to Checkout
                </button>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <i className="fas fa-shield-alt text-green-500"></i>
                    <span>Secure checkout powered by Stripe</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-check-circle text-green-500"></i>
                    <span>30-day money-back guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-check-circle text-green-500"></i>
                    <span>Instant access to all content</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Empty Cart
          <div className="bg-white rounded-md p-12 border border-gray-200 text-center">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-shopping-cart text-4xl text-gray-400"></i>
            </div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet. Browse our marketplace to find amazing digital products!
            </p>
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-md font-semibold hover:shadow-sm transition-all"
            >
              <i className="fas fa-store"></i>
              <span>Browse Marketplace</span>
            </Link>
          </div>
        )}
      </div>
    </OctopusLayout>
  );
}
