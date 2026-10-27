"""
API routes follow HackSoft Django Styleguide:
APIs only parse/validate requests using Schemas and delegate directly to Selectors & Services.
"""
from typing import List, Optional
from ninja import Router
from django.http import Http404

from shop.selectors import category_list, product_list, product_get_by_slug, order_get_by_number
from shop.services import (
    order_create,
    safaricom_express_stk_push,
    mpesa_query_status,
    mpesa_handle_callback,
)
from shop.schemas import (
    CategoryOut,
    ProductListOut,
    ProductDetailOut,
    OrderCreateIn,
    OrderOut,
    SafaricomExpressIn,
    SafaricomExpressOut,
    MpesaStatusOut,
)

router = Router()


def _get_unique_colors(product) -> list:
    seen = set()
    colors = []
    for v in product.variants.all():
        if v.color_name not in seen:
            seen.add(v.color_name)
            colors.append({
                "name": v.color_name,
                "hex": v.color_hex,
                "image_url": v.image_url,
            })
    return colors


@router.get("/categories", response=List[CategoryOut])
def list_categories(request):
    return category_list()


@router.get("/products", response=List[ProductListOut])
def get_products(
    request,
    category: Optional[str] = None,
    color: Optional[str] = None,
    size: Optional[str] = None,
    price_range: Optional[str] = None,
    in_stock_only: Optional[bool] = False,
    sort: Optional[str] = "featured",
):
    qs = product_list(
        category_slug=category,
        color=color,
        size=size,
        price_range=price_range,
        in_stock_only=bool(in_stock_only),
        sort=sort or "featured",
    )

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
            "supports_custom_print": p.supports_custom_print,
            "rating": float(p.rating),
            "review_count": p.review_count,
            "featured": p.featured,
            "colors": _get_unique_colors(p),
            "primary_image": primary_img,
        })
    return results


@router.get("/products/{slug}", response=ProductDetailOut)
def get_product_detail(request, slug: str):
    p = product_get_by_slug(slug=slug)
    if not p:
        raise Http404("Product not found")

    unique_sizes = list(dict.fromkeys(p.variants.values_list("size", flat=True)))

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
        "supports_custom_print": p.supports_custom_print,
        "rating": float(p.rating),
        "review_count": p.review_count,
        "featured": p.featured,
        "images": [
            {
                "id": img.id,
                "image_url": img.image_url,
                "alt_text": img.alt_text,
                "is_primary": img.is_primary,
                "sort_order": img.sort_order,
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
                "image_url": v.image_url,
            }
            for v in p.variants.all()
        ],
        "colors": _get_unique_colors(p),
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
                "date_str": r.date_str,
            }
            for r in p.reviews.all()
        ],
    }


@router.post("/orders", response=OrderOut)
def create_new_order(request, payload: OrderCreateIn):
    items_data = [item.dict() for item in payload.items]

    order = order_create(
        email=payload.email,
        first_name=payload.first_name,
        last_name=payload.last_name,
        address=payload.address,
        apartment=payload.apartment or "",
        city=payload.city,
        state=payload.state,
        zip_code=payload.zip_code,
        country=payload.country,
        phone=payload.phone,
        shipping_method=payload.shipping_method,
        shipping_cost=payload.shipping_cost,
        subtotal=payload.subtotal,
        tax=payload.tax,
        total=payload.total,
        payment_method=payload.payment_method,
        order_note=payload.order_note or "",
        items_data=items_data,
        mpesa_receipt=payload.mpesa_receipt or "",
    )

    return _format_order_response(order)


@router.get("/orders/{order_number}", response=OrderOut)
def get_order_by_number(request, order_number: str):
    order = order_get_by_number(order_number=order_number)
    if not order:
        raise Http404("Order not found")
    return _format_order_response(order)


@router.post("/payments/safaricom-express", response=SafaricomExpressOut)
@router.post("/payments/mpesa/stk-push", response=SafaricomExpressOut)
def trigger_safaricom_express(request, payload: SafaricomExpressIn):
    """Initiates Safaricom Daraja STK Push directly to customer mobile phone."""
    res = safaricom_express_stk_push(
        phone=payload.phone,
        amount=payload.amount,
        order_number=payload.order_number,
    )
    return res


@router.get("/payments/mpesa/status/{checkout_request_id}", response=MpesaStatusOut)
def check_mpesa_payment_status(request, checkout_request_id: str):
    """Queries M-Pesa STK status from Daraja API / database."""
    res = mpesa_query_status(checkout_request_id=checkout_request_id)
    return {
        "status": res.get("status", "PENDING"),
        "result_desc": res.get("result_desc", ""),
        "checkout_request_id": res.get("checkout_request_id", checkout_request_id),
        "mpesa_receipt": res.get("mpesa_receipt"),
        "amount": res.get("amount"),
        "phone": res.get("phone"),
    }


@router.post("/payments/mpesa/callback")
def receive_mpesa_callback(request):
    """Receives asynchronous callback from Safaricom Daraja Gateway."""
    import json
    try:
        data = json.loads(request.body)
    except Exception:
        data = {}
    return mpesa_handle_callback(data)



def _format_order_response(order) -> dict:
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
        "payment_status": order.payment_status,
        "mpesa_phone": order.mpesa_phone,
        "mpesa_receipt_number": order.mpesa_receipt_number,
        "status": order.status,
        "status_display": dict(order.STATUS_CHOICES).get(order.status, "Order confirmed"),
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
                "image_url": it.image_url,
                "has_custom_print": it.has_custom_print,
                "custom_print_text": it.custom_print_text,
                "custom_print_placement": it.custom_print_placement,
                "custom_print_fee": float(it.custom_print_fee),
            }
            for it in order.items.all()
        ],
    }
