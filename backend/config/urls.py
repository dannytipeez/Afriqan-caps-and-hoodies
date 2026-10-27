from django.contrib import admin
from django.urls import path
from django.views.generic import RedirectView
from ninja import NinjaAPI
from shop.api import router as shop_router

api = NinjaAPI(
    title="Afriqan Caps and Hoodies API",
    version="1.0.0",
    description="E-commerce backend built with Django Ninja for Afriqan Caps and Hoodies."
)

api.add_router("/shop/", shop_router)

urlpatterns = [
    # Redirect root '/' directly to admin so navigating to the backend host doesn't 404
    path('', RedirectView.as_view(url='/admin/', permanent=False)),
    # Official Django Admin Dashboard
    path('admin/', admin.site.urls),
    # Support /api/admin/ alias redirecting to /admin/
    path('api/admin/', RedirectView.as_view(url='/admin/', permanent=False)),
    # Django Ninja API
    path('api/', api.urls),
]
