export interface Address {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
  phone: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  birthDate: string;
  country: { label: string; value: string };
}

export interface AddressCardProps {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
}

export interface OrderDetailsCardProps {
  orderId: string;
}

export interface ReviewFormData {
  reviewText: string;
  file: File | null;
  rating: number;
}

export interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ReviewFormData) => void;
}

export interface Tab {
  key: string;
  label: string;
  route?: string; // Optional route for navigation
}

export interface TabsNavProps {
  searchQuery?: string; // Optional search query prop
  setSearchQuery?: (query: string) => void; // Optional setter for search query
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: Tab[];
  searchPlaceholder?: string; // Optional search placeholder
  showSearch?: boolean; // New prop to control search visibility
}

export interface ExploreProductsProps {
  category: string;
  products: {
    imageSrc: string;
    ratings: number;
    numberSold: number;
    price: number;
    discountPrice?: number;
    storeName: string;
    productName: string;
  }[];
  className?: string;
}

export interface ProductCardProps {
  id: number;
  imageSrc: string;
  productName: string;
  ratings: number;
  numberSold: number;
  price: number;
  discountPrice?: number;
  storeName: string;
}

export interface ShopCardProps {
  id: number;
  coverImage: string;
  profileImage: string;
  name: string;
  bio: string;
  reviews: string;
  followers: string;
  productsSold: string;
  categories: string[];
}

export interface Message {
  id: number;
  storeName: string;
  storeProfile: string;
  storeLocation: string;
  messageHistory: MessageHistory[];
  lastMessageTime: string;
  snippet: string;
  unreadCount: number;
}

export interface MessageHistory {
  id: number;
  sender: string;
  content: string;
  time: string;
  isStore: boolean;
}

export interface Product {
  id: string;
  name: string;
  thumbnail: string;
  total_sold: number;
  price: string;
  discount: string;
  ratings: string;
  reviews: number;
  shop_name: string;
}

// Define the product detail data type// Define the product detail data type
export interface ProductDetail {
  id: string;
  name: string;
  category: string;
  media: {
    id: string;
    file: string;
    is_thumbnail: boolean;
    timestamp: string;
  }[];
  weight: string;
  description: string;
  specifications: {
    id: string;
    option_type: string;
    option_value: string;
  }[];
  reviews: {
    id: string;
    buyer_first_name: string;
    buyer_last_name: string;
    product_name: string;
    rating: number;
    comment: string;
  }[];
  average_rating: number;
  variations: any[];
  quantity: number;
  price: string;
  shop: {
    id: string; // Ensure this field is present
    name: string;
    logo: string;
    main_category: string;
    address: {
      address_1: string | null;
      address_2: string | null;
      city: string | null;
      state: string | null;
      country: string | null;
      zip_code: string | null;
    };
    tagline: string;
    featured_products: {
      id: string;
      name: string;
      thumbnail: string;
      total_sold: number;
      price: string;
      discount: string;
      ratings: string;
      reviews: number;
      shop_name: string;
    }[];
  };
  total_sold: number;
  discount: string;
  others: string | null;
  is_featured: boolean;
}

export interface RecentlyViewedProductCardProps {
  product: {
    id: string;
    name: string;
    thumbnail: string; // Use thumbnail instead of image
    price: string;
    discount: string;
  };
}

// Order item structure
export interface BuyerOrderItem {
  id: string;
  product: {
    id: string;
    name: string;
    thumbnail: string;
    total_sold: number;
    price: string;
    discount: string;
    ratings: string;
    reviews: number;
    shop_name: string;
  };
  variation: string | null;
  quantity: number;
  price: string;
  sub_total: string;
}

// Order structure
export interface BuyerOrder {
  id: string;
  booking_id: string;
  ordered_at: string;
  total_price: string;
  status: 'pending' | 'completed' | 'failed';
  items: BuyerOrderItem[];
}

// Define Product Type
export interface Category {
  id: string;
  name: string;
  image: string | null;
  product_count: string;
}

export interface SubCategory {
  id: string;
  name: string;
}

export interface Media {
  id: string;
  file: string;
  is_thumbnail: boolean;
  timestamp: string;
}

export interface Address {
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
}

export interface FeaturedProduct {
  id: string;
  name: string;
  thumbnail: string;
  total_sold: number;
  price: string;
  discount: string;
  ratings: string;
  reviews: number;
  shop_name: string;
}

export interface Shop {
  id: string;
  name: string;
  logo: string;
  main_category: string;
  address: Address;
  tagline: string;
  featured_products: FeaturedProduct[];
}

export interface Specification {
  option_type: string;
  option_value: string;
}

export interface Variation {
  id: string;
  variation_type: string;
  variation_value: string;
  variation_price?: string;
  variation_quantity?: number;
  variation_discount?: string;
}

export interface SellerProduct {
  id: string;
  name: string;
  category: string;
  subcategory: SubCategory[];
  media: Media[];
  weight: string;
  tag: { id: string; name: string }[];
  description: string;
  specifications: Specification[];
  reviews: any[];
  average_rating: string | null;
  variations: Variation[];
  quantity: number;
  price: string;
  shop: Shop;
  unit: string;
  total_sold: number;
  thumbnail: string;
  discount: string | null;
  others: string | null;
  is_featured: boolean;
  is_published: boolean;
}

export interface SellerProductState {
  products: SellerProduct[];
  loading: boolean;
  error: string | null;
  count: number; // Total product count
  next: string | null;
  previous: string | null;
}
