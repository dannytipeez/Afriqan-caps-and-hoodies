from django.contrib import admin
from .models import Category, Product, ProductImage, ProductVariant, Order, OrderItem, Review

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 1

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'badge', 'in_stock', 'rating', 'featured')
    list_filter = ('category', 'in_stock', 'featured')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductImageInline, ProductVariantInline]

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'first_name', 'last_name', 'email', 'total', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('order_number', 'email', 'first_name', 'last_name')
    inlines = [OrderItemInline]

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('author', 'product', 'rating', 'verified_buyer', 'date_str')
    list_filter = ('rating', 'verified_buyer')
