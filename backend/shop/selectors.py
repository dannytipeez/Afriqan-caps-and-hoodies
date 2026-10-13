"""
Selectors follow HackSoft Django Styleguide:
Selectors only fetch and filter data and return querysets or model instances.
No write operations are allowed in selectors.
"""
from typing import Optional
from django.db.models import QuerySet
from shop.models import Category, Product, Order


def category_list() -> QuerySet[Category]:
    return Category.objects.all()


def product_list(
    *,
    category_slug: Optional[str] = None,
    color: Optional[str] = None,
    size: Optional[str] = None,
    price_range: Optional[str] = None,
    in_stock_only: bool = False,
    sort: str = "featured",
) -> QuerySet[Product]:
    qs = Product.objects.all().prefetch_related("variants", "images")

    if category_slug and category_slug.lower() != "all":
        qs = qs.filter(category__slug=category_slug.lower())

    if color:
        qs = qs.filter(variants__color_name__iexact=color).distinct()

    if size:
        qs = qs.filter(variants__size__iexact=size).distinct()

    if in_stock_only:
        qs = qs.filter(in_stock=True)

    # KES price filters: Under KES 2,500 | KES 2,500 - 4,000 | Over KES 4,000
    if price_range == "under_2500":
        qs = qs.filter(price__lt=2500.0)
    elif price_range == "2500_4000":
        qs = qs.filter(price__gte=2500.0, price__lte=4000.0)
    elif price_range == "over_4000":
        qs = qs.filter(price__gt=4000.0)

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

    return qs


def product_get_by_slug(*, slug: str) -> Optional[Product]:
    try:
        return Product.objects.prefetch_related("images", "variants", "reviews").get(slug=slug)
    except Product.DoesNotExist:
        return None


def order_get_by_number(*, order_number: str) -> Optional[Order]:
    try:
        return Order.objects.prefetch_related("items").get(order_number=order_number)
    except Order.DoesNotExist:
        return None
