import { ActionButton, AgentType, expensesTypes, formsType, orderProps, orderSourceTypes, orderStatusWithCount, paymentMethodTypes, productPackageType, staffsTypes } from './types';



export const statusColors = {
  // Neutral/Waiting States
  Pending: '#FFA500', // Orange (needs attention)
  Awaiting: '#FFC107', // Amber (waiting)
  Scheduled: '#00BCD4', // Cyan (planned)
  orange: '#FFA500',
  amber: '#FFC107',
  cyan: '#00BCD4',
  green: '#4CAF50',
  lightGreen: '#8BC34A',
  purple:  '#673AB7',
  yellow: '#FFEB3B',
  red: '#FF0000',
  darkRed: '#F44336',
  black: '#000000',
  grayBlue: '#607D8B',
  gray: '#9E9E9E',
  pink: '#E91E63',
  indigo: '#3F51B5',
  teal: '#009688',
  brown: '#795548',







  // Positive/Success States
  Delivered: '#4CAF50', // Green (completed)
  Confirmed: '#4CAF50', // Green (same as Delivered for consistency)
  CashRemitted: '#8BC34A', // Light Green (financial success)

  // In Progress/Active States
  Shipped: '#2196F3', // Blue (in transit)
  AfterSaleCall: '#673AB7', // Purple (follow-up)

  // Warning/Requires Action
  CommitmentFeeRequired: '#FFEB3B', // Yellow (action needed)
  CartAbandonment: '#FF9800', // Orange (abandoned cart)
  NotPickingCalls: '#FF5722', // Deep Orange (urgent)

  // Negative/Error States
  Cancelled: '#FF0000', // Red (cancelled)
  Failed: '#F44336', // Dark Red (error)
  Banned: '#000000', // Black (blocked)
  Deleted: '#607D8B', // Gray-Blue (disabled)

  // Special Cases
  SwitchedOff: '#9E9E9E', // Gray (inactive)
  Returned: '#E91E63', // Pink (return/reversal)
  OptinRecords: '#3F51B5', // Indigo (data-related)
  OrdersAddedByForms: '#009688', // Teal (form submissions)
  ImportedOrders: '#795548', // Brown (external data)
} as const;

export const orderStatus: orderStatusWithCount[] = [
  {
    name: 'Pending',
    count: 12,
  },
  {
    name: 'Confirmed',
    count: 12,
  },
  {
    name: 'Awaiting',
    count: 12,
  },
  {
    name: 'Delivered',
    count: 12,
  },
  {
    name: 'Commitment Fee Requested',
    count: 12,
  },
  {
    name: 'Not Picking Calls',
    count: 12,
  },
  {
    name: 'Switched Off',
    count: 12,
  },
  {
    name: 'Shipped',
    count: 12,
  },
  {
    name: 'Scheduled',
    count: 12,
  },
  {
    name: 'Failed',
    count: 12,
  },
  {
    name: 'Cancelled',
    count: 12,
  },
  {
    name: 'Returned',
    count: 12,
  },
  {
    name: 'Cash Remitted',
    count: 12,
  },
  {
    name: 'After-Sale Call',
    count: 12,
  },
  {
    name: 'Deleted',
    count: 12,
  },
  {
    name: 'Banned',
    count: 12,
  },
  {
    name: 'Optin Records',
    count: 12,
  },
  {
    name: 'Orders Added By Forms',
    count: 12,
  },
  {
    name: 'Imported Orders',
    count: 12,
  },
  {
    name: 'Cart Abandonment',
    count: 12,
  },
];

export const Orders: orderProps[] = [
  // 1-10
  {
    id: "ORD-1001",
    productName: "Iphone 15 Pro Max",
    quantity: "1",
    customerName: "James Adekunle",
    status: "Delivered",
    tag: "New customer",
    whatsappNumber: "+2348012345678",
    phoneNumber: "+2348012345678",
    country: "Nigeria",
    address: "12 Marina Road, Lagos",
    sellingPrice: 1200,
    offerStatus: "Main Offer",
    agent: "Agent_01",
    orderDate: "2024-05-10",
    email: "james.adekunle@example.com"
  },
  {
    id: "ORD-1002",
    productName: "Samsung Galaxy S23 Ultra",
    quantity: "2",
    customerName: "Sarah Johnson",
    status: "Shipped",
    tag: "Repeat customer",
    phoneNumber: "+233244556677",
    country: "Ghana",
    address: "34 Independence Ave, Accra",
    sellingPrice: 1800,
    offerStatus: "OrderBump",
    updatedBy: "Admin_01",
    orderDate: "2024-05-11",
    email: "sarah.j@example.com"
  },
  {
    id: "ORD-1003",
    productName: "MacBook Pro 16-inch",
    quantity: "1",
    customerName: "Michael Brown",
    status: "Pending",
    tag: "New customer",
    phoneNumber: "+12025551234",
    country: "UnitedStates",
    address: "100 Tech Park, Silicon Valley",
    sellingPrice: 2500,
    offerStatus: "Main Offer",
    onHoldby: "Agent_02",
    orderDate: "2024-05-12",
    email: "michael.b@example.com"
  },
  {
    id: "ORD-10010",
    productName: "MacBook Pro 16-inch",
    quantity: "1",
    customerName: "Daniel Brown",
    status: "Pending",
    tag: "New customer",
    phoneNumber: "+12025551234",
    country: "UnitedStates",
    address: "100 Tech Park, Silicon Valley",
    sellingPrice: 2500,
    offerStatus: "Main Offer",
    onHoldby: "Agent_02",
    orderDate: "2024-05-12",
    email: "michael.b@example.com"
  },
  {
    id: "ORD-1004",
    productName: "Dell XPS 13",
    quantity: "3",
    customerName: "Amina Okafor",
    status: "Confirmed",
    tag: "Repeat customer",
    whatsappNumber: "+2348098765432",
    phoneNumber: "+2348098765432",
    country: "Nigeria",
    address: "5 Lekki Phase 1, Lagos",
    sellingPrice: 1500,
    offerStatus: "Upsell",
    agent: "Agent_03",
    orderDate: "2024-05-12",
    email: "amina.o@example.com"
  },
  {
    id: "ORD-1005",
    productName: "Sony WH-1000XM5 Headphones",
    quantity: "5",
    customerName: "David Wilson",
    status: "Cancelled",
    tag: "New customer",
    phoneNumber: "+12035556789",
    country: "UnitedStates",
    address: "200 Music Lane, New York",
    sellingPrice: 400,
    offerStatus: "OrderBump",
    orderDate: "2024-05-13",
    email: "david.w@example.com"
  },
  {
    id: "ORD-1006",
    productName: "Dent Remover",
    quantity: "10",
    customerName: "Grace Mensah",
    status: "Awaiting",
    tag: "VIP Customer",
    phoneNumber: "+233277889900",
    country: "Ghana",
    address: "22 High Street, Kumasi",
    sellingPrice: 50,
    offerStatus: "Main Offer",
    agent: "Agent_04",
    orderDate: "2024-05-14",
    email: "grace.m@example.com"
  },
  {
    id: "ORD-1007",
    productName: "Iphone 15 Pro Max",
    quantity: "2",
    customerName: "Emeka Nwankwo",
    status: "Failed",
    tag: "New customer",
    whatsappNumber: "+2347087654321",
    phoneNumber: "+2347087654321",
    country: "Nigeria",
    address: "8 Enugu Road, Enugu",
    sellingPrice: 2400,
    offerStatus: "Upsell",
    orderDate: "2024-05-15",
    email: "emeka.n@example.com"
  },
  {
    id: "ORD-1008",
    productName: "MacBook Pro 16-inch",
    quantity: "1",
    customerName: "Linda Parker",
    status: "Switched Off",
    tag: "Repeat customer",
    phoneNumber: "+12045551234",
    country: "UnitedStates",
    address: "45 Design Blvd, Austin",
    sellingPrice: 2500,
    offerStatus: "Main Offer",
    onHoldby: "Agent_05",
    orderDate: "2024-05-16",
    email: "linda.p@example.com"
  },
  {
    id: "ORD-1009",
    productName: "Samsung Galaxy S23 Ultra",
    quantity: "1",
    customerName: "Kwame Asante",
    status: "Not Picking Calls",
    tag: "New customer",
    phoneNumber: "+233244556677",
    country: "Ghana",
    address: "17 Heritage Hills, Cape Coast",
    sellingPrice: 900,
    offerStatus: "OrderBump",
    orderDate: "2024-05-17",
    email: "kwame.a@example.com"
  },
  {
    id: "ORD-1010",
    productName: "Dent Remover",
    quantity: "20",
    customerName: "Fatima Bello",
    status: "Cart Abandonment",
    tag: "Repeat customer",
    whatsappNumber: "+2348056789012",
    phoneNumber: "+2348056789012",
    country: "Nigeria",
    address: "3 Kano Close, Abuja",
    sellingPrice: 100,
    offerStatus: "Main Offer",
    orderDate: "2024-05-18",
    email: "fatima.b@example.com"
  },

  // 11-20
  {
    id: "ORD-1011",
    productName: "Dell XPS 13",
    quantity: "1",
    customerName: "John Doe",
    status: "Returned",
    tag: "New customer",
    phoneNumber: "+12015559876",
    country: "UnitedStates",
    address: "123 Main St, Chicago",
    sellingPrice: 1500,
    offerStatus: "Upsell",
    orderDate: "2024-05-19",
    email: "john.d@example.com"
  },
  {
    id: "ORD-1012",
    productName: "Sony WH-1000XM5 Headphones",
    quantity: "2",
    customerName: "Esi Coleman",
    status: "Cash Remitted",
    tag: "Repeat customer",
    phoneNumber: "+233244556677",
    country: "Ghana",
    address: "9 Arts Center, Tamale",
    sellingPrice: 800,
    offerStatus: "Main Offer",
    agent: "Agent_06",
    orderDate: "2024-05-20",
    email: "esi.c@example.com"
  },
  {
    id: "ORD-1013",
    productName: "Iphone 15 Pro Max",
    quantity: "1",
    customerName: "Oluwatobi Adeleke",
    status: "Commitment Fee Required",
    tag: "New customer",
    whatsappNumber: "+2348076543210",
    phoneNumber: "+2348076543210",
    country: "Nigeria",
    address: "14 Ibadan Street, Ibadan",
    sellingPrice: 1200,
    offerStatus: "Main Offer",
    orderDate: "2024-05-21",
    email: "tobi.a@example.com"
  },
  {
    id: "ORD-1014",
    productName: "MacBook Pro 16-inch",
    quantity: "1",
    customerName: "Robert Taylor",
    status: "Deleted",
    tag: "Repeat customer",
    phoneNumber: "+12035551234",
    country: "UnitedStates",
    address: "88 Developer Lane, Seattle",
    sellingPrice: 2500,
    offerStatus: "OrderBump",
    orderDate: "2024-05-22",
    email: "robert.t@example.com"
  },
  {
    id: "ORD-1015",
    productName: "Samsung Galaxy S23 Ultra",
    quantity: "3",
    customerName: "Ngozi Eze",
    status: "After-Sale Call",
    tag: "VIP Customer",
    whatsappNumber: "+2348187654321",
    phoneNumber: "+2348187654321",
    country: "Nigeria",
    address: "25 Port Harcourt Ave, PH",
    sellingPrice: 2700,
    offerStatus: "Upsell",
    agent: "Agent_07",
    orderDate: "2024-05-23",
    email: "ngozi.e@example.com"
  },
  {
    id: "ORD-1016",
    productName: "Dent Remover",
    quantity: "15",
    customerName: "Kofi Ansah",
    status: "Commitment Fee Requested",
    tag: "New customer",
    phoneNumber: "+233277889900",
    country: "Ghana",
    address: "11 Sunrise Blvd, Tema",
    sellingPrice: 75,
    offerStatus: "Main Offer",
    orderDate: "2024-05-24",
    email: "kofi.a@example.com"
  },
  {
    id: "ORD-1017",
    productName: "Dell XPS 13",
    quantity: "2",
    customerName: "Jennifer Lopez",
    status: "Scheduled",
    tag: "Repeat customer",
    phoneNumber: "+12045559876",
    country: "UnitedStates",
    address: "55 Hollywood Blvd, LA",
    sellingPrice: 3000,
    offerStatus: "Upsell",
    onHoldby: "Agent_08",
    orderDate: "2024-05-25",
    email: "jennifer.l@example.com"
  },
  {
    id: "ORD-1018",
    productName: "Sony WH-1000XM5 Headphones",
    quantity: "1",
    customerName: "Yusuf Bello",
    status: "Banned",
    tag: "New customer",
    whatsappNumber: "+2348056789012",
    phoneNumber: "+2348056789012",
    country: "Nigeria",
    address: "7 Kaduna Road, Kaduna",
    sellingPrice: 400,
    offerStatus: "Main Offer",
    orderDate: "2024-05-26",
    email: "yusuf.b@example.com"
  },
  {
    id: "ORD-1019",
    productName: "Iphone 15 Pro Max",
    quantity: "1",
    customerName: "Ama Serwaa",
    status: "Optin Records",
    tag: "Repeat customer",
    phoneNumber: "+233244556677",
    country: "Ghana",
    address: "33 Kumasi Street, Kumasi",
    sellingPrice: 1200,
    offerStatus: "OrderBump",
    agent: "Agent_09",
    orderDate: "2024-05-27",
    email: "ama.s@example.com"
  },
  {
    id: "ORD-1020",
    productName: "MacBook Pro 16-inch",
    quantity: "1",
    customerName: "Daniel Kim",
    status: "Orders Added By Forms",
    tag: "New customer",
    phoneNumber: "+12025559876",
    country: "UnitedStates",
    address: "90 Tech Valley, Boston",
    sellingPrice: 2500,
    offerStatus: "Main Offer",
    orderDate: "2024-05-28",
    email: "daniel.k@example.com"
  },

  // 21-30
  {
    id: "ORD-1021",
    productName: "Samsung Galaxy S23 Ultra",
    quantity: "2",
    customerName: "Chioma Okafor",
    status: "Imported Orders",
    tag: "VIP Customer",
    whatsappNumber: "+2348187654321",
    phoneNumber: "+2348187654321",
    country: "Nigeria",
    address: "42 Onitsha Road, Onitsha",
    sellingPrice: 1800,
    offerStatus: "Upsell",
    agent: "Agent_10",
    orderDate: "2024-05-29",
    email: "chioma.o@example.com"
  },
  {
    id: "ORD-1022",
    productName: "Dent Remover",
    quantity: "8",
    customerName: "Samuel Agyemang",
    status: "Pending",
    tag: "New customer",
    phoneNumber: "+233277889900",
    country: "Ghana",
    address: "6 Accra Mall, Accra",
    sellingPrice: 40,
    offerStatus: "Main Offer",
    orderDate: "2024-05-30",
    email: "samuel.a@example.com"
  },
  {
    id: "ORD-1023",
    productName: "Dell XPS 13",
    quantity: "1",
    customerName: "Emily Davis",
    status: "Confirmed",
    tag: "Repeat customer",
    phoneNumber: "+12035559876",
    country: "UnitedStates",
    address: "22 Creative Lane, Portland",
    sellingPrice: 1500,
    offerStatus: "OrderBump",
    orderDate: "2024-05-31",
    email: "emily.d@example.com"
  },
  {
    id: "ORD-1024",
    productName: "Sony WH-1000XM5 Headphones",
    quantity: "3",
    customerName: "Ibrahim Musa",
    status: "Delivered",
    tag: "New customer",
    whatsappNumber: "+2348056789012",
    phoneNumber: "+2348056789012",
    country: "Nigeria",
    address: "19 Kano Street, Kano",
    sellingPrice: 1200,
    offerStatus: "Main Offer",
    agent: "Agent_11",
    orderDate: "2024-06-01",
    email: "ibrahim.m@example.com"
  },
  {
    id: "ORD-1025",
    productName: "Iphone 15 Pro Max",
    quantity: "1",
    customerName: "Adwoa Mensah",
    status: "Shipped",
    tag: "Repeat customer",
    phoneNumber: "+233244556677",
    country: "Ghana",
    address: "4 Kumasi Road, Kumasi",
    sellingPrice: 1200,
    offerStatus: "Upsell",
    orderDate: "2024-06-02",
    email: "adwoa.m@example.com"
  },
  {
    id: "ORD-1026",
    productName: "MacBook Pro 16-inch",
    quantity: "1",
    customerName: "Paul Smith",
    status: "Cancelled",
    tag: "New customer",
    phoneNumber: "+12045559876",
    country: "UnitedStates",
    address: "77 Innovation Drive, San Diego",
    sellingPrice: 2500,
    offerStatus: "Main Offer",
    orderDate: "2024-06-03",
    email: "paul.s@example.com"
  },
  {
    id: "ORD-1027",
    productName: "Samsung Galaxy S23 Ultra",
    quantity: "2",
    customerName: "Funke Adebayo",
    status: "Failed",
    tag: "VIP Customer",
    whatsappNumber: "+2348187654321",
    phoneNumber: "+2348187654321",
    country: "Nigeria",
    address: "31 Abeokuta Street, Abeokuta",
    sellingPrice: 1800,
    offerStatus: "OrderBump",
    agent: "Agent_12",
    orderDate: "2024-06-04",
    email: "funke.a@example.com"
  },
  {
    id: "ORD-1028",
    productName: "Dent Remover",
    quantity: "12",
    customerName: "Kwabena Osei",
    status: "Awaiting",
    tag: "New customer",
    phoneNumber: "+233277889900",
    country: "Ghana",
    address: "8 Sunyani Road, Sunyani",
    sellingPrice: 60,
    offerStatus: "Main Offer",
    orderDate: "2024-06-05",
    email: "kwabena.o@example.com"
  },
  {
    id: "ORD-1029",
    productName: "Dell XPS 13",
    quantity: "1",
    customerName: "Sophia Martinez",
    status: "Switched Off",
    tag: "Repeat customer",
    phoneNumber: "+12055559876",
    country: "UnitedStates",
    address: "44 Design Street, Miami",
    sellingPrice: 1500,
    offerStatus: "Upsell",
    orderDate: "2024-06-06",
    email: "sophia.m@example.com"
  },
  {
    id: "ORD-1030",
    productName: "Sony WH-1000XM5 Headphones",
    quantity: "1",
    customerName: "Emmanuel Okafor",
    status: "Not Picking Calls",
    tag: "New customer",
    whatsappNumber: "+2348056789012",
    phoneNumber: "+2348056789012",
    country: "Nigeria",
    address: "9 Enugu Road, Enugu",
    sellingPrice: 400,
    offerStatus: "Main Offer",
    agent: "Agent_13",
    orderDate: "2024-06-07",
    email: "emmanuel.o@example.com"
  },

  // 31-40
  {
    id: "ORD-1031",
    productName: "Iphone 15 Pro Max",
    quantity: "1",
    customerName: "Akosua Boateng",
    status: "Cart Abandonment",
    tag: "Repeat customer",
    phoneNumber: "+233244556677",
    country: "Ghana",
    address: "12 Takoradi Street, Takoradi",
    sellingPrice: 1200,
    offerStatus: "OrderBump",
    orderDate: "2024-06-08",
    email: "akosua.b@example.com"
  },
  {
    id: "ORD-1032",
    productName: "MacBook Pro 16-inch",
    quantity: "1",
    customerName: "Ryan Johnson",
    status: "Returned",
    tag: "New customer",
    phoneNumber: "+12065559876",
    country: "UnitedStates",
    address: "33 Tech Lane, Denver",
    sellingPrice: 2500,
    offerStatus: "Main Offer",
    orderDate: "2024-06-09",
    email: "ryan.j@example.com"
  },
  {
    id: "ORD-1033",
    productName: "Samsung Galaxy S23 Ultra",
    quantity: "2",
    customerName: "Aisha Mohammed",
    status: "Cash Remitted",
    tag: "VIP Customer",
    whatsappNumber: "+2348187654321",
    phoneNumber: "+2348187654321",
    country: "Nigeria",
    address: "7 Jos Street, Jos",
    sellingPrice: 1800,
    offerStatus: "Upsell",
    agent: "Agent_14",
    orderDate: "2024-06-10",
    email: "aisha.m@example.com"
  },
  {
    id: "ORD-1034",
    productName: "Dent Remover",
    quantity: "25",
    customerName: "Yaw Boateng",
    status: "Commitment Fee Required",
    tag: "New customer",
    phoneNumber: "+233277889900",
    country: "Ghana",
    address: "15 Kumasi Road, Kumasi",
    sellingPrice: 125,
    offerStatus: "Main Offer",
    orderDate: "2024-06-11",
    email: "yaw.b@example.com"
  },
  {
    id: "ORD-1035",
    productName: "Dell XPS 13",
    quantity: "1",
    customerName: "Olivia Brown",
    status: "Deleted",
    tag: "Repeat customer",
    phoneNumber: "+12075559876",
    country: "UnitedStates",
    address: "88 Creative Ave, Atlanta",
    sellingPrice: 1500,
    offerStatus: "OrderBump",
    orderDate: "2024-06-12",
    email: "olivia.b@example.com"
  },
  {
    id: "ORD-1036",
    productName: "Sony WH-1000XM5 Headphones",
    quantity: "2",
    customerName: "Chinedu Okoro",
    status: "After-Sale Call",
    tag: "New customer",
    whatsappNumber: "+2348056789012",
    phoneNumber: "+2348056789012",
    country: "Nigeria",
    address: "11 Owerri Road, Owerri",
    sellingPrice: 800,
    offerStatus: "Main Offer",
    agent: "Agent_15",
    orderDate: "2024-06-13",
    email: "chinedu.o@example.com"
  },
  {
    id: "ORD-1037",
    productName: "Iphone 15 Pro Max",
    quantity: "1",
    customerName: "Efua Ansah",
    status: "Commitment Fee Requested",
    tag: "Repeat customer",
    phoneNumber: "+233244556677",
    country: "Ghana",
    address: "5 Tema Street, Tema",
    sellingPrice: 1200,
    offerStatus: "Upsell",
    orderDate: "2024-06-14",
    email: "efua.a@example.com"
  },
  {
    id: "ORD-1038",
    productName: "MacBook Pro 16-inch",
    quantity: "1",
    customerName: "Ethan Wilson",
    status: "Scheduled",
    tag: "New customer",
    phoneNumber: "+12085559876",
    country: "UnitedStates",
    address: "22 Tech Park, Dallas",
    sellingPrice: 2500,
    offerStatus: "Main Offer",
    onHoldby: "Agent_16",
    orderDate: "2024-06-15",
    email: "ethan.w@example.com"
  },
  {
    id: "ORD-1039",
    productName: "Samsung Galaxy S23 Ultra",
    quantity: "3",
    customerName: "Nneka Eze",
    status: "Banned",
    tag: "VIP Customer",
    whatsappNumber: "+2348187654321",
    phoneNumber: "+2348187654321",
    country: "Nigeria",
    address: "14 Uyo Street, Uyo",
    sellingPrice: 2700,
    offerStatus: "OrderBump",
    agent: "Agent_17",
    orderDate: "2024-06-16",
    email: "nneka.e@example.com"
  },
  {
    id: "ORD-1040",
    productName: "Dent Remover",
    quantity: "30",
    customerName: "Kweku Mensah",
    status: "Optin Records",
    tag: "New customer",
    phoneNumber: "+233277889900",
    country: "Ghana",
    address: "10 Cape Coast Road, Cape Coast",
    sellingPrice: 150,
    offerStatus: "Main Offer",
    orderDate: "2024-06-17",
    email: "kweku.m@example.com"
  },

  // 41-50
  {
    id: "ORD-1041",
    productName: "Dell XPS 13",
    quantity: "1",
    customerName: "Ava Garcia",
    status: "Orders Added By Forms",
    tag: "Repeat customer",
    phoneNumber: "+12095559876",
    country: "UnitedStates",
    address: "55 Design Blvd, Phoenix",
    sellingPrice: 1500,
    offerStatus: "Upsell",
    orderDate: "2024-06-18",
    email: "ava.g@example.com"
  },
  {
    id: "ORD-1042",
    productName: "Sony WH-1000XM5 Headphones",
    quantity: "1",
    customerName: "Obinna Nwachukwu",
    status: "Imported Orders",
    tag: "New customer",
    whatsappNumber: "+2348056789012",
    phoneNumber: "+2348056789012",
    country: "Nigeria",
    address: "8 Aba Road, Aba",
    sellingPrice: 400,
    offerStatus: "Main Offer",
    agent: "Agent_18",
    orderDate: "2024-06-19",
    email: "obinna.n@example.com"
  },
  {
    id: "ORD-1043",
    productName: "Iphone 15 Pro Max",
    quantity: "2",
    customerName: "Abena Serwaa",
    status: "Pending",
    tag: "Repeat customer",
    phoneNumber: "+233244556677",
    country: "Ghana",
    address: "3 Kumasi Street, Kumasi",
    sellingPrice: 2400,
    offerStatus: "OrderBump",
    orderDate: "2024-06-20",
    email: "abena.s@example.com"
  },
  {
    id: "ORD-1044",
    productName: "MacBook Pro 16-inch",
    quantity: "1",
    customerName: "Noah Anderson",
    status: "Confirmed",
    tag: "New customer",
    phoneNumber: "+12105559876",
    country: "UnitedStates",
    address: "66 Innovation Drive, Austin",
    sellingPrice: 2500,
    offerStatus: "Main Offer",
    orderDate: "2024-06-21",
    email: "noah.a@example.com"
  },
  {
    id: "ORD-1045",
    productName: "Samsung Galaxy S23 Ultra",
    quantity: "1",
    customerName: "Chioma Okeke",
    status: "Delivered",
    tag: "VIP Customer",
    whatsappNumber: "+2348187654321",
    phoneNumber: "+2348187654321",
    country: "Nigeria",
    address: "19 Nnewi Road, Nnewi",
    sellingPrice: 900,
    offerStatus: "Upsell",
    agent: "Agent_19",
    orderDate: "2024-06-22",
    email: "chioma.o@example.com"
  },
  {
    id: "ORD-1046",
    productName: "Dent Remover",
    quantity: "18",
    customerName: "Kwasi Appiah",
    status: "Shipped",
    tag: "New customer",
    phoneNumber: "+233277889900",
    country: "Ghana",
    address: "7 Accra Street, Accra",
    sellingPrice: 90,
    offerStatus: "Main Offer",
    orderDate: "2024-06-23",
    email: "kwasi.a@example.com"
  },
  {
    id: "ORD-1047",
    productName: "Dell XPS 13",
    quantity: "1",
    customerName: "Emma Wilson",
    status: "Cancelled",
    tag: "Repeat customer",
    phoneNumber: "+12115559876",
    country: "UnitedStates",
    address: "33 Tech Lane, San Francisco",
    sellingPrice: 1500,
    offerStatus: "OrderBump",
    orderDate: "2024-06-24",
    email: "emma.w@example.com"
  },
  {
    id: "ORD-1048",
    productName: "Sony WH-1000XM5 Headphones",
    quantity: "2",
    customerName: "Oluwaseun Adebayo",
    status: "Failed",
    tag: "New customer",
    whatsappNumber: "+2348056789012",
    phoneNumber: "+2348056789012",
    country: "Nigeria",
    address: "12 Ikorodu Road, Lagos",
    sellingPrice: 800,
    offerStatus: "Main Offer",
    agent: "Agent_20",
    orderDate: "2024-06-25",
    email: "oluwaseun.a@example.com"
  },
  {
    id: "ORD-1049",
    productName: "Iphone 15 Pro Max",
    quantity: "1",
    customerName: "Ama Twumasi",
    status: "Awaiting",
    tag: "Repeat customer",
    phoneNumber: "+233244556677",
    country: "Ghana",
    address: "9 Sunyani Road, Sunyani",
    sellingPrice: 1200,
    offerStatus: "Upsell",
    orderDate: "2024-06-26",
    email: "ama.t@example.com"
  },
  {
    id: "ORD-1050",
    productName: "MacBook Pro 16-inch",
    quantity: "1",
    customerName: "Liam Johnson",
    status: "Switched Off",
    tag: "New customer",
    phoneNumber: "+12125559876",
    country: "UnitedStates",
    address: "44 Developer Ave, New York",
    sellingPrice: 2500,
    offerStatus: "Main Offer",
    orderDate: "2024-06-27",
    email: "liam.j@example.com"
  }
];

export const actionButton: ActionButton[] = [
  { 
    id: 1,
    title: "Hold",
    icon: '' as const,
    action: "hook"
  },
  {
    id: 2,
    title: "AddTag",
    icon: '' as const,
    component: "AddTag" // Use string identifiers instead of JSX
  },
  {
    id: 3,
    title: "AssignOrder",
    icon: '' as const,
    component: "AssignOrder" // Use string identifiers instead of JSX
  },
  {
    id: 4,
    title: "Send Invoice",
    icon: '' as const,
    action: 'hook'
  },
  {
    id: 5,
    title: "Edit Order",
    icon: '' as const,
    navigation: '/(auth)/(modal)/editOrder',
  },
  {
    id: 20,
    title: "New Order",
    icon: '' as const,
    navigation: '/(auth)/(modal)/createOrder',
  },
  {
    id: 6,
    title: "Delivered",
    icon: '' as const,
    navigation: '/(auth)/(modal)/delivered',
  },
  {
    id: 7,
    title: "Scheduled",
    icon: '' as const,
    navigation: '/(auth)/(modal)/scheduleOrder',
  },
  {
    id: 8,
    title: "Confirmed",
    icon: '' as const,
    action: 'hook'
  },
  {
    id: 9,
    title: "Awaiting",
    icon: '' as const,
    component: "Awaiting",
  },
  {
    id: 10,
    title: "Shipped",
    icon: '' as const,
    component: "Shipped",
  },
  {
    id: 11,
    title: "Not Picking Calls",
    icon: '' as const,
    action: 'hook'
  },
  {
    id: 12,
    title: "Switched Off",
    icon: '' as const,
    action: 'hook'
  },
  {
    id: 13,
    title: "Failed",
    icon: '' as const,
    action: 'hook'
  },
  {
    id: 14,
    title: "Cancel",
    icon: '' as const,
    action: 'hook'
  },
  {
    id: 15,
    title: "Commitment Fee Reminder",
    icon: '' as const,
    action: 'hook'
  },
  {
    id: 16,
    title: "Comment",
    icon: '' as const,
    component: "Comment",
  },
  {
    id: 17,
    title: "Message",
    icon: '' as const,
    component: "Message",
  },
  {
    id: 18,
    title: "Delete",
    icon: '' as const,
    action: 'hook'
  },
  {
    id: 19,
    title: "Ban Customer",
    icon: '' as const,
    action: 'hook'
  },
];

export const agent: AgentType[] = [
  {
    label: "Theophilus",
    id: 200
  },
  {
    label: "Emeka",
    id: 200
  },
  {
    label: "Chibuzor",
    id: 200
  },
  {
    label: "Daniel",
    id: 200
  },
  {
    label: "Tochi",
    id: 0
  }
]

export const productPackage: productPackageType[]  = [
  {
    label: "Buy 1 Denix get 1 Free",
    id: 2,
    amount: 5000
  },
  {
    label: "Buy 1 Denix get 1 Free",
    id: 2,
    amount: 5000
  },
  {
    label: "Buy 1 Detox get 1 Free",
    id: 2,
    amount: 5000
  },
  {
    label: "Buy 1 Nackademus get 1 Denik",
    id: 1,
    amount: 5000
  },
  {
    label: "Buy 1 Mentraul Belt get 1 Free",
    id: 2,
    amount: 5000
  },
  {
    label: "Buy 1 Juicy girl get 1 Free Nackademux",
    id: 1,
    amount: 5000
  }
]



export const staffs: staffsTypes[] = [
  {label: "Jane", id: 1},
  {label: "Christabel", id: 2},
  {label: "Miss Rose", id: 3},
  {label:  "Mr Ola", id: 4}, 
  {label:  "Mr Ola", id: 4}
]
export const expenseTypes: expensesTypes[] = [
  {label: "Airtime", id: 1},
  {label: "Tfare", id: 2},
  {label: "Tfare", id: 3},
  {label: "Tfare", id: 4},
]

export const forms: formsType[] = [
  {label: "Airtime", id: 1},
  {label: "Tfare", id: 2},
  {label: "Tfare", id: 3},
  {label: "Tfare", id: 4},
]

export const orderSource: orderSourceTypes[] = [
  {label: "whatsapp", id: "whatsapp"},
  {label: "whatsapp", id: "whatsapp"},
  {label: "whatsapp", id: "whatsapp"},
  {label: "whatsapp", id: "whatsapp"},
  {label: "whatsapp", id: "whatsapp"},
]

export const paymentMethod: paymentMethodTypes[] = [
  {label: "Bank Transfer", id: "Bank Transfer"},
  {label: "Payment on delivery", id: "Payment on delivery"},
  {label: "Bank Transfer", id: "Bank Transfer"},
  {label: "Payment on delivery", id: "Payment on delivery"},
]