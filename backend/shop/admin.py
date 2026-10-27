from django.contrib import admin
from shop.models import Category, Product, ProductImage, ProductVariant, Order, OrderItem, Review

admin.site.site_header = "Afriqan Caps and Hoodies Admin"
admin.site.site_title = "Afriqan Admin Portal"
admin.site.index_title = "Store Inventory, Orders & User Management"


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 1


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ("name",)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "price", "badge", "supports_custom_print", "in_stock", "rating", "featured")
    list_editable = ("price", "in_stock", "featured")
    list_filter = ("category", "in_stock", "supports_custom_print", "featured")
    search_fields = ("name", "description")
    prepopulated_fields = {"slug": ("name",)}
    inlines = [ProductImageInline, ProductVariantInline]


@admin.register(ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):
    list_display = ("product", "color_name", "size", "sku", "stock")
    list_editable = ("stock",)
    list_filter = ("product__category", "size", "color_name")
    search_fields = ("sku", "product__name", "color_name")
    ordering = ("product", "color_name", "size")


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ("has_custom_print", "custom_print_text", "custom_print_placement", "custom_print_fee")


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("order_number", "first_name", "last_name", "phone", "total", "currency", "payment_method", "payment_status", "status", "created_at")
    list_editable = ("payment_status", "status")
    list_filter = ("payment_method", "payment_status", "status", "created_at")
    search_fields = ("order_number", "email", "first_name", "last_name", "phone", "mpesa_receipt_number")
    inlines = [OrderItemInline]


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("author", "product", "rating", "verified_buyer", "date_str")
    list_filter = ("rating", "verified_buyer")
    search_fields = ("author", "product__name", "title", "comment")
