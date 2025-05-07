import type { Order } from "@/payload-types";

import { convertToLocale } from "@/app/(frontend)/_util/money";

type OrderSummaryProps = {
  order: Order;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const OrderSummary = ({ order }: OrderSummaryProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getAmount = (amount?: null | number) => {
    if (!amount) {
      return;
    }

    return convertToLocale({
      amount,
      currency_code: "eur",
    });
  };

  return (
    <div>
      <h2 className="text-base-semi">Order Summary</h2>
      <div className="text-small-regular text-ui-fg-base my-2">
        {/* <div className="flex items-center justify-between text-base-regular text-ui-fg-base mb-2">
                    <span>Subtotal</span>
                    <span>{getAmount(order.subtotal)}</span>
                </div>
                <div className="flex flex-col gap-y-1">
                    {order.discount_total > 0 && (
                        <div className="flex items-center justify-between">
                            <span>Discount</span>
                            <span>- {getAmount(order.discount_total)}</span>
                        </div>
                    )}
                    {order.gift_card_total > 0 && (
                        <div className="flex items-center justify-between">
                            <span>Discount</span>
                            <span>- {getAmount(order.gift_card_total)}</span>
                        </div>
                    )}
                    <div className="flex items-center justify-between">
                        <span>Shipping</span>
                        <span>{getAmount(order.shipping_total)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Taxes</span>
                        <span>{getAmount(order.tax_total)}</span>
                    </div>
                </div>
                <div className="h-px w-full border-b border-gray-200 border-dashed my-4" />
                <div className="flex items-center justify-between text-base-regular text-ui-fg-base mb-2">
                    <span>Total</span>
                    <span>{getAmount(order.total)}</span>
                </div> */}
      </div>
    </div>
  );
};

export default OrderSummary;
