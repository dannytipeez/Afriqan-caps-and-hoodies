from django.contrib import admin
from django.urls import path
from ninja import NinjaAPI
from shop.api import router as shop_router

api = NinjaAPI(
    title="Afriqan Caps and Hoodies API",
    version="1.0.0",
    description="E-commerce backend built with Django Ninja for Afriqan Caps and Hoodies."
)

api.add_router("/shop/", shop_router)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api.urls),
]
