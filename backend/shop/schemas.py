from typing import List, Optional
from datetime import datetime
from ninja import Schema


class ImageOut(Schema):
    id: int
    image_url: str
    alt_text: str
    is_primary: bool
    sort_order: int


class VariantOut(Schema):
    id: int
    color_name: str
    color_hex: str
    size: str
    sku: str
    stock: int
    image_url: str


class CategoryOut(Schema):
    id: int
    name: str
    slug: str
    description: str


class ReviewOut(Schema):
    id: int
    author: str
    rating: int
    title: str
    comment: str
    verified_buyer: bool
    variant_info: str
    date_str: str


class ProductListOut(Schema):
    id: int
    category_id: int
    category_name: str
    name: str
    slug: str
    tagline: str
    badge: str
    price: float
    compare_at_price: Optional[float] = None
    in_stock: bool
    supports_custom_print: bool
    rating: float
    review_count: int
    featured: bool
    colors: List[dict]
    primary_image: str


class ProductDetailOut(Schema):
    id: int
    category: CategoryOut
    name: str
    slug: str
    tagline: str
    badge: str
    price: float
    compare_at_price: Optional[float] = None
    description: str
    details_and_care: str
    fabric_weight: str
    fit_guide: str
    in_stock: bool
    supports_custom_print: bool
    rating: float
    review_count: int
    featured: bool
    images: List[ImageOut]
    variants: List[VariantOut]
    colors: List[dict]
    sizes: List[str]
    reviews: List[ReviewOut]


class OrderItemIn(Schema):
    product_id: Optional[int] = None
    product_name: str
    color: str
    size: str
    price: float
    quantity: int = 1
    image_url: str = ""
    has_custom_print: bool = False
    custom_print_text: Optional[str] = ""
    custom_print_placement: Optional[str] = ""


class OrderCreateIn(Schema):
    email: str
    first_name: str
    last_name: str
    address: str
    apartment: Optional[str] = ""
    city: str = "Nairobi"
    state: str = "Nairobi County"
    zip_code: str = "00100"
    country: str = "Kenya"
    phone: str
    shipping_method: str = "standard"
    shipping_cost: float = 300.0
    subtotal: float
    tax: float = 0.0
    total: float
    payment_method: str = "mpesa_till"  # 'mpesa_till', 'mpesa_express', 'cod'
    mpesa_receipt: Optional[str] = ""
    order_note: Optional[str] = ""
    items: List[OrderItemIn]


class OrderItemOut(Schema):
    id: int
    product_name: str
    color: str
    size: str
    price: float
    quantity: int
    image_url: str
    has_custom_print: bool
    custom_print_text: str
    custom_print_placement: str
    custom_print_fee: float


class OrderOut(Schema):
    id: int
    order_number: str
    email: str
    first_name: str
    last_name: str
    address: str
    apartment: str
    city: str
    state: str
    zip_code: str
    country: str
    phone: str
    shipping_method: str
    shipping_cost: float
    subtotal: float
    tax: float
    total: float
    currency: str
    payment_method: str
    payment_status: str
    mpesa_phone: str
    mpesa_receipt_number: str
    status: str
    status_display: str
    order_note: str
    estimated_arrival: str
    created_at: datetime
    items: List[OrderItemOut]


class SafaricomExpressIn(Schema):
    phone: str
    amount: int
    order_number: str


class SafaricomExpressOut(Schema):
    ResponseCode: str
    ResponseDescription: str
    MerchantRequestID: str
    CheckoutRequestID: str
    CustomerMessage: str
