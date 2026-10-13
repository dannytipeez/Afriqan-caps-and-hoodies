from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "Categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(Category, related_name="products", on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    tagline = models.CharField(max_length=250, blank=True, help_text="e.g. Ash / Relaxed unisex fit")
    badge = models.CharField(max_length=50, blank=True, help_text="e.g. BESTSELLER, CORE ESSENTIAL, NEW COLOR")
    price = models.DecimalField(max_digits=10, decimal_places=2, help_text="Price in KES")
    compare_at_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    description = models.TextField()
    details_and_care = models.TextField(blank=True)
    fabric_weight = models.CharField(max_length=100, blank=True, help_text="e.g. 460 GSM, 100% Kenyan combed cotton")
    fit_guide = models.CharField(max_length=200, default="Relaxed unisex fit. Take your usual size.")
    in_stock = models.BooleanField(default=True)
    supports_custom_print = models.BooleanField(
        default=False, 
        help_text="Whether customer can add custom printing (KES 500 per placement)"
    )
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=4.9)
    review_count = models.IntegerField(default=128)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name="images", on_delete=models.CASCADE)
    image_url = models.URLField(max_length=600)
    alt_text = models.CharField(max_length=200, blank=True)
    is_primary = models.BooleanField(default=False)
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "id"]

    def __str__(self):
        return f"{self.product.name} - Image {self.id}"


class ProductVariant(models.Model):
    product = models.ForeignKey(Product, related_name="variants", on_delete=models.CASCADE)
    color_name = models.CharField(max_length=50)
    color_hex = models.CharField(max_length=20)
    size = models.CharField(max_length=10)
    sku = models.CharField(max_length=80, unique=True)
    stock = models.IntegerField(default=50)
    image_url = models.URLField(max_length=600, blank=True)

    def __str__(self):
        return f"{self.product.name} ({self.color_name} - {self.size})"


class Order(models.Model):
    STATUS_CHOICES = [
        ("confirmed", "Order confirmed"),
        ("getting_ready", "Getting it ready"),
        ("on_the_way", "On the way"),
        ("delivered", "At your door"),
    ]

    PAYMENT_METHOD_CHOICES = [
        ("mpesa_till", "Lipa na M-Pesa Buy Goods (Till 4466556)"),
        ("mpesa_express", "M-Pesa STK Push Express"),
        ("cod", "Cash on Delivery"),
    ]

    PAYMENT_STATUS_CHOICES = [
        ("pending", "Payment Pending"),
        ("paid", "Paid via M-Pesa"),
        ("cod_pending", "Cash On Delivery (Due on Delivery)"),
        ("failed", "Failed"),
    ]

    order_number = models.CharField(max_length=50, unique=True)
    email = models.EmailField()
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=255, help_text="e.g. Westlands, Chiromo Road")
    apartment = models.CharField(max_length=100, blank=True, help_text="House/Office, Floor/Unit")
    city = models.CharField(max_length=100, default="Nairobi")
    state = models.CharField(max_length=100, default="Nairobi County", help_text="County / Region in Kenya")
    zip_code = models.CharField(max_length=30, blank=True, default="00100")
    country = models.CharField(max_length=100, default="Kenya")
    phone = models.CharField(max_length=30, help_text="e.g. 0712345678 or 254712345678")

    shipping_method = models.CharField(max_length=50, default="standard")
    shipping_cost = models.DecimalField(max_digits=10, decimal_places=2, default=300.00)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    tax = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10, default="KES")

    payment_method = models.CharField(max_length=50, choices=PAYMENT_METHOD_CHOICES, default="mpesa_till")
    payment_status = models.CharField(max_length=30, choices=PAYMENT_STATUS_CHOICES, default="pending")
    mpesa_checkout_request_id = models.CharField(max_length=100, blank=True)
    mpesa_receipt_number = models.CharField(max_length=100, blank=True)
    mpesa_phone = models.CharField(max_length=30, blank=True)

    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default="confirmed")
    order_note = models.TextField(blank=True)
    estimated_arrival = models.CharField(max_length=100, default="1–2 business days within Nairobi & Kenya")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.order_number} - {self.first_name} {self.last_name} (KES {self.total})"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, null=True, on_delete=models.SET_NULL)
    product_name = models.CharField(max_length=200)
    color = models.CharField(max_length=50)
    size = models.CharField(max_length=20)
    price = models.DecimalField(max_digits=10, decimal_places=2, help_text="Unit price in KES")
    quantity = models.PositiveIntegerField(default=1)
    image_url = models.URLField(max_length=600, blank=True)

    # Custom Printing Add-on (KES 500 per design)
    has_custom_print = models.BooleanField(default=False)
    custom_print_text = models.CharField(max_length=200, blank=True)
    custom_print_placement = models.CharField(
        max_length=100, 
        blank=True, 
        help_text="Chest Front, Upper Back, or Left Sleeve (+KES 500)"
    )
    custom_print_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        addon = " [Custom Print]" if self.has_custom_print else ""
        return f"{self.quantity}x {self.product_name}{addon} ({self.order.order_number})"


class Review(models.Model):
    product = models.ForeignKey(Product, related_name="reviews", on_delete=models.CASCADE)
    author = models.CharField(max_length=100)
    rating = models.IntegerField(default=5)
    title = models.CharField(max_length=200, blank=True)
    comment = models.TextField()
    verified_buyer = models.BooleanField(default=True)
    variant_info = models.CharField(max_length=100, blank=True, help_text="e.g. Ash / Size M")
    date_str = models.CharField(max_length=100, default="October 8, 2026")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.author} - {self.rating}★ on {self.product.name}"
