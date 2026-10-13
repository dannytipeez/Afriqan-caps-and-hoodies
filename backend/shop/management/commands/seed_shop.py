from django.core.management.base import BaseCommand
from shop.models import Category, Product, ProductImage, ProductVariant, Review, Order, OrderItem


class Command(BaseCommand):
    help = "Seeds initial shop data with premium Kenyan Caps and Hoodies with KES pricing"

    def handle(self, *args, **options):
        self.stdout.write("Seeding Kenyan market shop data in KES...")

        Review.objects.all().delete()
        OrderItem.objects.all().delete()
        Order.objects.all().delete()
        ProductVariant.objects.all().delete()
        ProductImage.objects.all().delete()
        Product.objects.all().delete()
        Category.objects.all().delete()

        # Categories
        cat_hoodies = Category.objects.create(
            name="Hoodies",
            slug="hoodies",
            description="Heavyweight luxury organic cotton hoodies crafted for cool Nairobi evenings and Kenyan streetwear enthusiasts."
        )
        cat_caps = Category.objects.create(
            name="Caps",
            slug="caps",
            description="Structured 6-panel streetwear caps finished with bespoke embroidered insignias and sun-shielding curved peaks."
        )

        products_data = [
            {
                "category": cat_hoodies,
                "name": "The Heavyweight Hoodie",
                "slug": "the-heavyweight-hoodie-ash",
                "tagline": "Ash / Relaxed unisex fit",
                "badge": "BESTSELLER",
                "price": 3500.00,  # KES 3,500
                "compare_at_price": 4200.00,
                "fabric_weight": "460 GSM, 100% Kenyan combed cotton with a soft brushed fleece interior",
                "supports_custom_print": True,
                "description": "A substantial feel. An effortless fit. Built from 460 GSM heavyweight looped cotton, double-layer hood, dropped shoulders, and a spacious kangaroo pocket. Optional custom front or back branding available for KES 500.",
                "details_and_care": "460 GSM heavyweight Kenyan cotton terry. Pre-shrunk for an enduring silhouette. Cold wash inside out, lay flat to dry. Crafted locally with ethical precision.",
                "fit_guide": "Relaxed unisex fit. True to size. Size up for an oversized Nairobi streetwear drape.",
                "rating": 4.9,
                "review_count": 128,
                "featured": True,
                "images": [
                    ("https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80", "Ash Heavyweight Hoodie Front", True, 1),
                    ("https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=80", "Model in Nairobi wearing Ash Hoodie", False, 2),
                    ("https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=80", "Ash Hoodie Fabric Detail Close Up", False, 3),
                ],
                "colors": [
                    ("Ash", "#9A9E99"),
                    ("Ink", "#1E1F21"),
                    ("Citron", "#CED587"),
                    ("Moss", "#5F6A51"),
                ],
                "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
                "reviews": [
                    ("Jordan Mwangi", 5, "Best hoodie in Kenya hands down. Thick 460 GSM material keeps me warm in Limuru and Nairobi mornings.", "Ash / Size M", "October 8, 2026"),
                    ("Amina Otieno", 5, "Added the custom back print for KES 500. Print quality is crisp and does not peel after washing.", "Ink / Size L", "October 2, 2026"),
                    ("Kevin Kipchumba", 5, "Paid via Lipa na M-Pesa Till 4466556 and delivery in Westlands arrived next morning!", "Ash / Size XL", "September 24, 2026"),
                ]
            },
            {
                "category": cat_hoodies,
                "name": "The Heritage Pullover",
                "slug": "the-heritage-pullover-ink",
                "tagline": "Ink / Relaxed unisex fit",
                "badge": "CORE ESSENTIAL",
                "price": 3800.00,  # KES 3,800
                "compare_at_price": 4500.00,
                "fabric_weight": "480 GSM, Custom Heavy Cotton",
                "supports_custom_print": True,
                "description": "Deep midnight ink tone with subtle tonal embroidery on the cuff. Features reinforced double seams and custom metal grommets. Custom printing add-on supported (+KES 500).",
                "details_and_care": "100% Combed Ringspun Kenyan Cotton. Cold wash, hang dry. Made to withstand daily wear.",
                "fit_guide": "Boxy, modern street fit. True to size.",
                "rating": 4.9,
                "review_count": 94,
                "featured": True,
                "images": [
                    ("https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=80", "Ink Heritage Pullover Front", True, 1),
                    ("https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80", "Ink Pullover Detail", False, 2),
                ],
                "colors": [
                    ("Ink", "#1E1F21"),
                    ("Ash", "#9A9E99"),
                    ("Chalk", "#E5E1D8"),
                ],
                "sizes": ["S", "M", "L", "XL", "XXL"],
                "reviews": [
                    ("Faith Ndinda", 5, "The deep black color is luxurious. Custom print on the chest looks awesome.", "Ink / Size M", "October 10, 2026")
                ]
            },
            {
                "category": cat_hoodies,
                "name": "The Savannah Ochre Hoodie",
                "slug": "the-savannah-ochre-hoodie",
                "tagline": "Citron / Relaxed unisex fit",
                "badge": "NEW COLOR",
                "price": 3500.00,  # KES 3,500
                "compare_at_price": 4200.00,
                "fabric_weight": "460 GSM, Organic Fleece",
                "supports_custom_print": True,
                "description": "Inspired by golden sunrises across the Great Rift Valley and Maasai Mara. Warm citron and ochre tones blended in an earthy brushed cotton finish.",
                "details_and_care": "Garment-washed for ultra-soft tactile finish. Wash cold inside out.",
                "fit_guide": "Relaxed fit. Take your standard size.",
                "rating": 4.8,
                "review_count": 67,
                "featured": True,
                "images": [
                    ("https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=80", "Citron Ochre Hoodie", True, 1),
                    ("https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80", "Citron Ochre Hoodie Flat", False, 2),
                ],
                "colors": [
                    ("Citron", "#CED587"),
                    ("Moss", "#5F6A51"),
                ],
                "sizes": ["XS", "S", "M", "L", "XL"],
                "reviews": [
                    ("Brian Kilonzo", 5, "Such a vibrant color, gets attention everywhere in Nairobi CBD.", "Citron / Size L", "October 5, 2026")
                ]
            },
            {
                "category": cat_caps,
                "name": "The Afriqan Signature Cap",
                "slug": "the-afriqan-signature-cap",
                "tagline": "Ink / Unstructured 6-panel fit",
                "badge": "BESTSELLER",
                "price": 1500.00,  # KES 1,500
                "compare_at_price": 1800.00,
                "fabric_weight": "100% Chino Cotton Twill",
                "supports_custom_print": False,
                "description": "Low profile, 6-panel unstructured dad cap with curved peak. Finished with subtle tonal Afriqan insignia embroidery and antique brass buckle slider.",
                "details_and_care": "100% washed cotton twill. Adjustable antique brass buckle closure with grommet tuck-in. Spot clean only.",
                "fit_guide": "One size fits all (54cm - 62cm circumference). Fully adjustable strap.",
                "rating": 4.9,
                "review_count": 142,
                "featured": True,
                "images": [
                    ("https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=80", "Ink Signature Cap", True, 1),
                    ("https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=1200&q=80", "Ink Cap Angle", False, 2),
                ],
                "colors": [
                    ("Ink", "#1E1F21"),
                    ("Chalk", "#E5E1D8"),
                    ("Moss", "#5F6A51"),
                    ("Citron", "#CED587"),
                ],
                "sizes": ["ONE SIZE"],
                "reviews": [
                    ("Dennis Wanyama", 5, "Fits perfectly, quality brass buckle in the back.", "Ink / One Size", "October 11, 2026"),
                ]
            },
            {
                "category": cat_caps,
                "name": "The Savannah Safari Cap",
                "slug": "the-savannah-safari-cap",
                "tagline": "Moss / Relaxed unisex fit",
                "badge": "CORE ESSENTIAL",
                "price": 1500.00,  # KES 1,500
                "compare_at_price": 1800.00,
                "fabric_weight": "Heavy Brushed Cotton Canvas",
                "supports_custom_print": False,
                "description": "Rugged yet clean moss olive canvas cap with ventilated embroidered eyelets and sweat-wicking interior band.",
                "details_and_care": "Heavyweight canvas cotton. Brass slider. Hand wash cold.",
                "fit_guide": "One size fits all. Adjustable strap.",
                "rating": 4.9,
                "review_count": 88,
                "featured": True,
                "images": [
                    ("https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=1200&q=80", "Moss Safari Cap", True, 1),
                    ("https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=80", "Moss Safari Cap Detail", False, 2),
                ],
                "colors": [
                    ("Moss", "#5F6A51"),
                    ("Chalk", "#E5E1D8"),
                    ("Ash", "#9A9E99"),
                ],
                "sizes": ["ONE SIZE"],
                "reviews": [
                    ("Victor Mutua", 5, "Earth colors are authentic. Fast delivery in Kilimani.", "Moss / One Size", "September 29, 2026")
                ]
            },
            {
                "category": cat_caps,
                "name": "The Minimalist Chalk Cap",
                "slug": "the-minimalist-chalk-cap",
                "tagline": "Chalk / Relaxed unisex fit",
                "badge": "NEW COLOR",
                "price": 1500.00,  # KES 1,500
                "compare_at_price": 1800.00,
                "fabric_weight": "100% Organic Raw Cotton",
                "supports_custom_print": False,
                "description": "Unbleached natural chalk hue with minimalist tonal monogram. Clean aesthetic that complements any monochrome rotation.",
                "details_and_care": "100% Organic cotton. Gentle spot clean.",
                "fit_guide": "One size fits all. Rear fabric strap with matte silver clasp.",
                "rating": 4.8,
                "review_count": 52,
                "featured": True,
                "images": [
                    ("https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=1200&q=80", "Chalk Cap", True, 1),
                    ("https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=80", "Chalk Cap Back", False, 2),
                ],
                "colors": [
                    ("Chalk", "#E5E1D8"),
                    ("Ash", "#9A9E99"),
                    ("Ink", "#1E1F21"),
                ],
                "sizes": ["ONE SIZE"],
                "reviews": [
                    ("Brenda Wanjiku", 5, "Matches all my casual fits. Great quality.", "Chalk / One Size", "October 7, 2026")
                ]
            }
        ]

        for pdata in products_data:
            prod = Product.objects.create(
                category=pdata["category"],
                name=pdata["name"],
                slug=pdata["slug"],
                tagline=pdata["tagline"],
                badge=pdata["badge"],
                price=pdata["price"],
                compare_at_price=pdata["compare_at_price"],
                fabric_weight=pdata["fabric_weight"],
                supports_custom_print=pdata["supports_custom_print"],
                description=pdata["description"],
                details_and_care=pdata["details_and_care"],
                fit_guide=pdata["fit_guide"],
                rating=pdata["rating"],
                review_count=pdata["review_count"],
                featured=pdata["featured"],
                in_stock=True,
            )

            for url, alt, is_prim, order in pdata["images"]:
                ProductImage.objects.create(
                    product=prod,
                    image_url=url,
                    alt_text=alt,
                    is_primary=is_prim,
                    sort_order=order,
                )

            for c_name, c_hex in pdata["colors"]:
                for sz in pdata["sizes"]:
                    ProductVariant.objects.create(
                        product=prod,
                        color_name=c_name,
                        color_hex=c_hex,
                        size=sz,
                        sku=f"{prod.slug[:10].upper()}-{c_name[:3].upper()}-{sz}-{prod.id}",
                        stock=45,
                        image_url=pdata["images"][0][0],
                    )

            for author, rat, comment, var_info, d_str in pdata["reviews"]:
                Review.objects.create(
                    product=prod,
                    author=author,
                    rating=rat,
                    title="Verified Customer Feedback",
                    comment=comment,
                    variant_info=var_info,
                    date_str=d_str,
                    verified_buyer=True,
                )

        # Demo order in KES
        order = Order.objects.create(
            order_number="OH-10482",
            email="alex.mwangi@gmail.com",
            first_name="Alex",
            last_name="Mwangi",
            address="Wood Avenue, Kilimani",
            apartment="Suite 4B, Silver Crest",
            city="Nairobi",
            state="Nairobi County",
            zip_code="00100",
            country="Kenya",
            phone="254712345678",
            shipping_method="standard",
            shipping_cost=0.00,  # Free over KES 5,000
            subtotal=5500.00,  # (3,500 hoodie + 500 print + 1,500 cap)
            tax=0.00,
            total=5500.00,
            currency="KES",
            payment_method="mpesa_till",
            payment_status="paid",
            mpesa_phone="254712345678",
            mpesa_receipt_number="SGK8291KL0",
            status="confirmed",
            estimated_arrival="October 14–15, 2026",
        )

        hoodie_prod = Product.objects.get(slug="the-heavyweight-hoodie-ash")
        cap_prod = Product.objects.get(slug="the-afriqan-signature-cap")

        OrderItem.objects.create(
            order=order,
            product=hoodie_prod,
            product_name="The Heavyweight Hoodie",
            color="Ash",
            size="M",
            price=3500.00,
            quantity=1,
            image_url=hoodie_prod.images.first().image_url,
            has_custom_print=True,
            custom_print_text="NAIROBI ROTATION 254",
            custom_print_placement="Upper Back (+KES 500)",
            custom_print_fee=500.00,
        )
        OrderItem.objects.create(
            order=order,
            product=cap_prod,
            product_name="The Afriqan Signature Cap",
            color="Ink",
            size="ONE SIZE",
            price=1500.00,
            quantity=1,
            image_url=cap_prod.images.first().image_url,
            has_custom_print=False,
            custom_print_text="",
            custom_print_placement="",
            custom_print_fee=0.00,
        )

        self.stdout.write(self.style.SUCCESS("Successfully seeded Kenyan shop catalog in KES!"))
