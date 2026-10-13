import random
import string
from typing import List, Optional
from ninja import Router
from django.shortcuts import get_object_or_404
from .models import Category, Product, ProductVariant, Order, OrderItem, Review
from .schemas import (
    CategoryOut, ProductListOut, ProductDetailOut, 
    OrderCreateIn, OrderOut, ReviewOut
)

router = Router()

def get_unique_colors(product):
    seen = set()
    colors = []
    for v in product.variants.all():
        if v.color_name not in seen:
            seen.add(v.color_name)
            colors.append({
                'name': v.color_name,
                'hex': v.color_hex,
                'image_url': v.image_url
            })
    return colors

@router.get("/categories", response=List[CategoryOut])
def list_categories(request):
    return Category.objects.all()

@router.get("/products", response=List[ProductListOut])
def list_products(
    request, 
    category: Optional[str] = None, 
    color: Optional[str] = None,
    size: Optional[str] = None,
    price_range: Optional[str] = None,
    in_stock_only: Optional[bool] = False,
    sort: Optional[str] = "featured"
):
    qs = Product.objects.all().prefetch_related('variants', 'images')
    
    if category and category.lower() != 'all':
        qs = qs.filter(category__slug=category.lower())
        
    if color:
        qs = qs.filter(variants__color_name__iexact=color).distinct()
        
    if size:
        qs = qs.filter(variants__size__iexact=size).distinct()
        
    if in_stock_only:
        qs = qs.filter(in_stock=True)
        
    if price_range == "under_50":
        qs = qs.filter(price__lt=50.0)
    elif price_range == "50_100":
        qs = qs.filter(price__gte=50.0, price__lte=100.0)
    elif price_range == "over_100":
        qs = qs.filter(price__gt=100.0)

    if sort == "price_asc":
        qs = qs.order_by("price")
    elif sort == "price_desc":
        qs = qs.order_by("-price")
    elif sort == "rating":
        qs = qs.order_by("-rating")
    elif sort == "newest":
        qs = qs.order_by("-created_at")
    else:
        qs = qs.order_by("-featured", "-created_at")

    results = []
    for p in qs:
        primary = p.images.filter(is_primary=True).first()
        primary_img = primary.image_url if primary else (p.images.first().image_url if p.images.exists() else "")
        results.append({
            "id": p.id,
            "category_id": p.category.id,
            "category_name": p.category.name,
            "name": p.name,
            "slug": p.slug,
            "tagline": p.tagline,
            "badge": p.badge,
            "price": float(p.price),
            "compare_at_price": float(p.compare_at_price) if p.compare_at_price else None,
            "in_stock": p.in_stock,
            "rating": float(p.rating),
            "review_count": p.review_count,
            "featured": p.featured,
            "colors": get_unique_colors(p),
            "primary_image": primary_img
        })
    return results

@router.get("/products/{slug}", response=ProductDetailOut)
def get_product(request, slug: str):
    p = get_object_or_404(Product.objects.prefetch_related('images', 'variants', 'reviews'), slug=slug)
    
    unique_sizes = list(dict.fromkeys(p.variants.values_list('size', flat=True)))
    
    return {
        "id": p.id,
        "category": {
            "id": p.category.id,
            "name": p.category.name,
            "slug": p.category.slug,
            "description": p.category.description,
        },
        "name": p.name,
        "slug": p.slug,
        "tagline": p.tagline,
        "badge": p.badge,
        "price": float(p.price),
        "compare_at_price": float(p.compare_at_price) if p.compare_at_price else None,
        "description": p.description,
        "details_and_care": p.details_and_care,
        "fabric_weight": p.fabric_weight,
        "fit_guide": p.fit_guide,
        "in_stock": p.in_stock,
        "rating": float(p.rating),
        "review_count": p.review_count,
        "featured": p.featured,
        "images": [
            {
                "id": img.id,
                "image_url": img.image_url,
                "alt_text": img.alt_text,
                "is_primary": img.is_primary,
                "sort_order": img.sort_order
            }
            for img in p.images.all()
        ],
        "variants": [
            {
                "id": v.id,
                "color_name": v.color_name,
                "color_hex": v.color_hex,
                "size": v.size,
                "sku": v.sku,
                "stock": v.stock,
                "image_url": v.image_url
            }
            for v in p.variants.all()
        ],
        "colors": get_unique_colors(p),
        "sizes": unique_sizes,
        "reviews": [
            {
                "id": r.id,
                "author": r.author,
                "rating": r.rating,
                "title": r.title,
                "comment": r.comment,
                "verified_buyer": r.verified_buyer,
                "variant_info": r.variant_info,
                "date_str": r.date_str
            }
            for r in p.reviews.all()
        ]
    }

@router.post("/orders", response=OrderOut)
def create_order(request, payload: OrderCreateIn):
    rand_num = "".join(random.choices(string.digits, k=5))
    order_number = f"AF-{rand_num}"
    
    order = Order.objects.create(
        order_number=order_number,
        email=payload.email,
        first_name=payload.first_name,
        last_name=payload.last_name,
        address=payload.address,
        apartment=payload.apartment or "",
        city=payload.city,
        state=payload.state,
        zip_code=payload.zip_code,
        country=payload.country,
        phone=payload.phone or "",
        shipping_method=payload.shipping_method,
        shipping_cost=payload.shipping_cost,
        subtotal=payload.subtotal,
        tax=payload.tax,
        total=payload.total,
        currency="USD",
        payment_method=payload.payment_method,
        card_last_four=payload.card_last_four or "4242",
        status='confirmed',
        order_note=payload.order_note or "",
        estimated_arrival="October 19–21, 2026"
    )

    for item in payload.items:
        OrderItem.objects.create(
            order=order,
            product_id=item.product_id,
            product_name=item.product_name,
            color=item.color,
            size=item.size,
            price=item.price,
            quantity=item.quantity,
            image_url=item.image_url
        )

    return {
        "id": order.id,
        "order_number": order.order_number,
        "email": order.email,
        "first_name": order.first_name,
        "last_name": order.last_name,
        "address": order.address,
        "apartment": order.apartment,
        "city": order.city,
        "state": order.state,
        "zip_code": order.zip_code,
        "country": order.country,
        "phone": order.phone,
        "shipping_method": order.shipping_method,
        "shipping_cost": float(order.shipping_cost),
        "subtotal": float(order.subtotal),
        "tax": float(order.tax),
        "total": float(order.total),
        "currency": order.currency,
        "payment_method": order.payment_method,
        "card_last_four": order.card_last_four,
        "status": order.status,
        "status_display": dict(Order.STATUS_CHOICES).get(order.status, "Order confirmed"),
        "order_note": order.order_note,
        "estimated_arrival": order.estimated_arrival,
        "created_at": order.created_at,
        "items": [
            {
                "id": it.id,
                "product_name": it.product_name,
                "color": it.color,
                "size": it.size,
                "price": float(it.price),
                "quantity": it.quantity,
                "image_url": it.image_url
            }
            for it in order.items.all()
        ]
    }

@router.get("/orders/{order_number}", response=OrderOut)
def get_order(request, order_number: str):
    order = get_object_or_404(Order.objects.prefetch_related('items'), order_number=order_number)
    return {
        "id": order.id,
        "order_number": order.order_number,
        "email": order.email,
        "first_name": order.first_name,
        "last_name": order.last_name,
        "address": order.address,
        "apartment": order.apartment,
        "city": order.city,
        "state": order.state,
        "zip_code": order.zip_code,
        "country": order.country,
        "phone": order.phone,
        "shipping_method": order.shipping_method,
        "shipping_cost": float(order.shipping_cost),
        "subtotal": float(order.subtotal),
        "tax": float(order.tax),
        "total": float(order.total),
        "currency": order.currency,
        "payment_method": order.payment_method,
        "card_last_four": order.card_last_four,
        "status": order.status,
        "status_display": dict(Order.STATUS_CHOICES).get(order.status, "Order confirmed"),
        "order_note": order.order_note,
        "estimated_arrival": order.estimated_arrival,
        "created_at": order.created_at,
        "items": [
            {
                "id": it.id,
                "product_name": it.product_name,
                "color": it.color,
                "size": it.size,
                "price": float(it.price),
                "quantity": it.quantity,
                "image_url": it.image_url
            }
            for it in order.items.all()
        ]
    }

