import {
  fetchMedusa,
  getDefaultRegionId,
  MedusaStoreProduct,
} from "./client";

export type MedusaAddress = {
  first_name: string;
  last_name: string;
  phone: string;
  address_1: string;
  address_2?: string;
  city: string;
  province?: string;
  postal_code: string;
  country_code: string;
};

export type MedusaCart = {
  id: string;
  currency_code: string;
  email?: string | null;
  total: number;
  subtotal: number;
  shipping_total: number;
  items: Array<{
    id: string;
    title: string;
    product_title?: string;
    variant_title?: string;
    variant_sku?: string;
    variant_id: string;
    product_id: string;
    thumbnail: string | null;
    quantity: number;
    unit_price: number;
    total: number;
  }>;
  shipping_methods?: Array<{
    id: string;
    name: string;
    amount: number;
  }>;
  shipping_address?: MedusaAddress | null;
  payment_collection?: {
    id: string;
    amount: number;
    payment_sessions?: Array<{
      id: string;
      provider_id: string;
      status: string;
      data: Record<string, unknown>;
    }>;
  };
};

export type MedusaShippingOption = {
  id: string;
  name: string;
  amount: number;
  price_type: string;
  calculated_price?: {
    calculated_amount: number;
  };
};

const MEDUSA_CART_STORAGE_KEY = "sukoon_medusa_cart_id";

/**
 * Retrieves the stored cart ID from localStorage.
 */
export function getStoredCartId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(MEDUSA_CART_STORAGE_KEY);
}

/**
 * Sets the stored cart ID in localStorage.
 */
export function setStoredCartId(cartId: string | null): void {
  if (typeof window === "undefined") return;
  if (!cartId) {
    localStorage.removeItem(MEDUSA_CART_STORAGE_KEY);
  } else {
    localStorage.setItem(MEDUSA_CART_STORAGE_KEY, cartId);
  }
}

/**
 * Creates a new Medusa cart for the India Region.
 */
export async function createMedusaCart(): Promise<MedusaCart> {
  const regionId = await getDefaultRegionId();
  const res = await fetchMedusa<{ cart: MedusaCart }>("/store/carts", {
    method: "POST",
    body: JSON.stringify({
      region_id: regionId,
    }),
  });

  setStoredCartId(res.cart.id);
  return res.cart;
}

/**
 * Retrieves an existing Medusa cart with full items, variants and shipping.
 */
export async function getMedusaCart(cartId: string): Promise<MedusaCart | null> {
  try {
    const res = await fetchMedusa<{ cart: MedusaCart }>(
      `/store/carts/${cartId}?fields=*items,*items.variant,*shipping_methods`
    );
    return res.cart;
  } catch {
    // If cart is invalid/expired/completed, clear storage
    setStoredCartId(null);
    return null;
  }
}

/**
 * Gets the current cart or creates a fresh one.
 */
export async function getOrCreateMedusaCart(): Promise<MedusaCart> {
  const storedId = getStoredCartId();
  if (storedId) {
    const existing = await getMedusaCart(storedId);
    if (existing) return existing;
  }
  return createMedusaCart();
}

/**
 * Adds an item with variant ID to the cart.
 */
export async function addLineItemToMedusaCart(
  cartId: string,
  variantId: string,
  quantity = 1
): Promise<MedusaCart> {
  const res = await fetchMedusa<{ cart: MedusaCart }>(
    `/store/carts/${cartId}/line-items`,
    {
      method: "POST",
      body: JSON.stringify({
        variant_id: variantId,
        quantity,
      }),
    }
  );
  return res.cart;
}

/**
 * Updates a line item's quantity in the cart.
 */
export async function updateMedusaLineItem(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<MedusaCart> {
  const res = await fetchMedusa<{ cart: MedusaCart }>(
    `/store/carts/${cartId}/line-items/${lineId}`,
    {
      method: "POST",
      body: JSON.stringify({
        quantity,
      }),
    }
  );
  return res.cart;
}

/**
 * Removes a line item from the cart.
 */
export async function removeMedusaLineItem(
  cartId: string,
  lineId: string
): Promise<MedusaCart> {
  const res = await fetchMedusa<{ cart: MedusaCart }>(
    `/store/carts/${cartId}/line-items/${lineId}`,
    {
      method: "DELETE",
    }
  );
  return res.cart;
}

/**
 * Updates email and shipping address on the cart.
 */
export async function updateMedusaCartDetails(
  cartId: string,
  details: {
    email: string;
    shipping_address: MedusaAddress;
  }
): Promise<MedusaCart> {
  const res = await fetchMedusa<{ cart: MedusaCart }>(`/store/carts/${cartId}`, {
    method: "POST",
    body: JSON.stringify({
      email: details.email,
      shipping_address: details.shipping_address,
    }),
  });
  return res.cart;
}

/**
 * Fetches available shipping options for a cart.
 */
export async function getMedusaShippingOptions(
  cartId: string
): Promise<MedusaShippingOption[]> {
  const res = await fetchMedusa<{ shipping_options: MedusaShippingOption[] }>(
    `/store/shipping-options?cart_id=${cartId}`
  );
  return res.shipping_options || [];
}

/**
 * Selects a shipping method for the cart.
 */
export async function addMedusaShippingMethod(
  cartId: string,
  optionId: string
): Promise<MedusaCart> {
  const res = await fetchMedusa<{ cart: MedusaCart }>(
    `/store/carts/${cartId}/shipping-methods`,
    {
      method: "POST",
      body: JSON.stringify({
        option_id: optionId,
      }),
    }
  );
  return res.cart;
}

/**
 * Creates or gets the payment collection for the cart.
 */
export async function getOrCreatePaymentCollection(cartId: string): Promise<string> {
  const res = await fetchMedusa<{ payment_collection: { id: string } }>(
    "/store/payment-collections",
    {
      method: "POST",
      body: JSON.stringify({
        cart_id: cartId,
      }),
    }
  );
  return res.payment_collection.id;
}

/**
 * Initiates a payment session with a provider (e.g. 'pp_razorpay_razorpay').
 */
export async function initiatePaymentSession(
  paymentCollectionId: string,
  providerId = "pp_razorpay_razorpay"
): Promise<{
  payment_session: {
    id: string;
    provider_id: string;
    data: Record<string, any>;
  };
}> {
  const res = await fetchMedusa<{
    payment_collection: {
      payment_sessions: Array<{
        id: string;
        provider_id: string;
        data: Record<string, any>;
      }>;
    };
  }>(`/store/payment-collections/${paymentCollectionId}/payment-sessions`, {
    method: "POST",
    body: JSON.stringify({
      provider_id: providerId,
    }),
  });

  const session = res.payment_collection.payment_sessions?.find(
    (s) => s.provider_id === providerId
  ) || res.payment_collection.payment_sessions?.[0];

  return { payment_session: session! };
}

/**
 * Completes the cart to generate a Medusa Order.
 */
export async function completeMedusaCart(cartId: string): Promise<{
  type: string;
  order?: {
    id: string;
    display_id: number;
    total: number;
    currency_code: string;
    shipping_address?: MedusaAddress;
    items?: Array<{
      title: string;
      quantity: number;
      unit_price: number;
      thumbnail?: string;
    }>;
  };
  error?: string;
}> {
  const res = await fetchMedusa<any>(`/store/carts/${cartId}/complete`, {
    method: "POST",
  });

  if (res.type === "order" && res.order) {
    setStoredCartId(null); // Clear cart on successful order
  }

  return res;
}

export type MedusaOrder = {
  id: string;
  display_id: number;
  email: string;
  created_at: string;
  total: number;
  subtotal: number;
  shipping_total: number;
  currency_code: string;
  payment_status: string;
  fulfillment_status?: string;
  items: Array<{
    id: string;
    title: string;
    subtitle?: string;
    thumbnail?: string;
    quantity: number;
    unit_price: number;
    total: number;
    variant_sku?: string;
  }>;
  shipping_address?: MedusaAddress;
  shipping_methods?: Array<{
    id: string;
    name: string;
    amount: number;
  }>;
};

/**
 * Fetches order details by order ID from Medusa Store API.
 */
export async function getMedusaOrder(orderId: string): Promise<MedusaOrder | null> {
  try {
    const res = await fetchMedusa<{ order: MedusaOrder }>(`/store/orders/${orderId}`);
    return res.order;
  } catch (err) {
    console.error("Failed to fetch Medusa order:", err);
    return null;
  }
}

export type CustomerOrderLookupResult = {
  id: string;
  display_id: number;
  created_at: string;
  total: number;
  subtotal: number;
  shipping_total: number;
  status: string;
  payment_status: string;
  fulfillment_status: string;
  items: Array<{
    id: string;
    title: string;
    subtitle?: string;
    variant_id: string;
    variant_sku: string;
    quantity: number;
    unit_price: number;
    total: number;
    thumbnail?: string;
  }>;
  shipping_address?: MedusaAddress;
  shipping_status?: string;
  awb?: string;
  courier?: string;
  tracking_url?: string;
  tracking_timeline?: {
    awb: string;
    courier: string;
    current_status: string;
    tracking_url: string;
    expected_delivery?: string;
    scans?: Array<{
      date: string;
      activity: string;
      location: string;
    }>;
  };
  return_eligible: boolean;
  days_remaining_for_return: number;
  existing_return?: {
    id: string;
    type: "RETURN" | "EXCHANGE";
    status: string;
    reverse_awb?: string;
    replacement_awb?: string;
  } | null;
};

/**
 * Performs secure guest order lookup with Order ID and customer email/phone.
 */
export async function lookupOrder(
  orderId: string,
  email: string
): Promise<CustomerOrderLookupResult | null> {
  try {
    const res = await fetchMedusa<{ order: CustomerOrderLookupResult }>(
      "/store/orders/lookup",
      {
        method: "POST",
        body: JSON.stringify({ order_id: orderId, email }),
      }
    );
    return res.order;
  } catch (err) {
    console.error("Failed to lookup order:", err);
    return null;
  }
}

/**
 * Submits customer return or exchange request.
 */
export async function submitReturnRequest(data: {
  order_id: string;
  email: string;
  phone?: string;
  type: "RETURN" | "EXCHANGE";
  items: Array<{
    order_item_id: string;
    variant_id: string;
    variant_sku: string;
    quantity: number;
    reason: string;
    exchange_variant_id?: string;
    exchange_variant_sku?: string;
  }>;
  customer_notes?: string;
}): Promise<any> {
  return await fetchMedusa<{ return_request: any }>(
    "/store/return-requests/request",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}
