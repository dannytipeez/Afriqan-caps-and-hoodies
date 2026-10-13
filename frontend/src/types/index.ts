export interface ColorOption {
  name: string;
  hex: string;
  image_url?: string;
}

export interface ProductImage {
  id: number;
  image_url: string;
  alt_text: string;
  is_primary: boolean;
  sort_order: number;
}

export interface ProductVariant {
  id: number;
  color_name: string;
  color_hex: string;
  size: string;
  sku: string;
  stock: number;
  image_url: string;
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  title: string;
  comment: string;
  verified_buyer: boolean;
  variant_info: string;
  date_str: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface ProductListItem {
  id: number;
  category_id: number;
  category_name: string;
  name: string;
  slug: string;
  tagline: string;
  badge: string;
  price: number;
  compare_at_price: number | null;
  in_stock: boolean;
  rating: number;
  review_count: number;
  featured: boolean;
  colors: ColorOption[];
  primary_image: string;
}

export interface ProductDetail {
  id: number;
  category: Category;
  name: string;
  slug: string;
  tagline: string;
  badge: string;
  price: number;
  compare_at_price: number | null;
  description: string;
  details_and_care: string;
  fabric_weight: string;
  fit_guide: string;
  in_stock: boolean;
  rating: number;
  review_count: number;
  featured: boolean;
  images: ProductImage[];
  variants: ProductVariant[];
  colors: ColorOption[];
  sizes: string[];
  reviews: Review[];
}

export interface CartItem {
  id: string; // unique combo of slug-color-size
  productId: number;
  slug: string;
  name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
  inStock: boolean;
}

export interface OrderItem {
  id: number;
  product_name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  image_url: string;
}

export interface Order {
  id: number;
  order_number: string;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  phone: string;
  shipping_method: string;
  shipping_cost: number;
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  payment_method: string;
  card_last_four: string;
  status: string;
  status_display: string;
  order_note: string;
  estimated_arrival: string;
  created_at: string;
  items: OrderItem[];
}
