export type CountryProps = {
  countryId: number;
  countryName: string;
  countrySymbol?: string;
  countryCurrency: string;
  countryPhonecode?: string;
};

export type Status =
  | "Pending"
  | "Cancelled"
  | "Delivered"
  | "Shipped"
  | "Awaiting"
  | "Confirmed"
  | "Switched Off"
  | "Failed"
  | "Not Picking Calls"
  | "Cart Abandonment"
  | "Returned"
  | "Cash Remitted"
  | "Commitment Fee Required"
  | "Deleted"
  | "After-Sale Call"
  | "Commitment Fee Requested"
  | "Scheduled"
  | "Banned"
  | "Optin Records"
  | "Orders Added By Forms"
  | "Imported Orders"
  | "Cart Abandonment";

export type orderProps = {
  id: string;
  productName:
    | "Iphone 15 Pro Max"
    | "Samsung Galaxy S23 Ultra"
    | "MacBook Pro 16-inch"
    | "Dell XPS 13"
    | "Sony WH-1000XM5 Headphones"
    | "Dent Remover";
  quantity: string;
  customerName: string;
  status: Status;
  tag: "New customer" | "Repeat customer" | string;
  whatsappNumber?: string;
  phoneNumber: string;
  country: "Nigeria" | "Ghana" | "UnitedStates";
  address: string;
  sellingPrice: number;
  onHoldby?: string;
  offerStatus: "Main Offer" | "OrderBump" | "Upsell";
  agent?: string;
  updatedBy?: string;
  timeUpdated?: string;
  orderDate: string;
  email: string;
};

export type orderStatusWithCount = {
  name: Status;
  count: number;
};

export type ActionButton = {
  id: number;
  title: string;
  key?: string;
  icon: string;
  action?: string;
  component?: string;
  navigation?: string;
};

export type productPackageType = { label: string; id: number, amount?: number };
export type AgentType = { label: string; id: number };
export type formsType = { label: string; id: number };
export type expensesTypes = { label: string; id: number };
export type staffsTypes = { label: string; id: number };
export type orderSourceTypes = {label: string, id: string}
export type paymentMethodTypes = {label: string, id: string}
export type timeReminderTypes = {label: string, id: string}