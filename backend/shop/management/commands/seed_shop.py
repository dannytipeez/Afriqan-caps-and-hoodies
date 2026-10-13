from django.core.management.base import BaseCommand
from shop.models import Category, Product, ProductImage, ProductVariant, Review, Order, OrderItem

class Command(BaseCommand):
    help = 'Seeds initial shop data with premium African Caps and Hoodies'

    def handle(self, *args, **options):
        self.stdout.write("Seeding data...")

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
            description="Heavyweight luxury organic cotton hoodies crafted with modern African heritage accents."
        )
        cat_caps = Category.objects.create(
            name="Caps",
            slug="caps",
            description="Structured 6-panel streetwear and snapback caps finished with bespoke embroidered insignias."
        )

        # Products
        products_data = [
            {
                "category": cat_hoodies,
                "name": "The Heavyweight Hoodie",
                "slug": "the-heavyweight-hoodie-ash",
                "tagline": "Ash / Relaxed unisex fit",
                "badge": "BESTSELLER",
                "price": 88.00,
                "compare_at_price": 110.00,
                "fabric_weight": "460 GSM, 100% cotton with a soft brushed interior",
                "description": "A substantial feel. An effortless fit. Your favorite layer, built to stay your favorite. Double-layer hood, dropped shoulders and kangaroo pocket with concealed interior stash pocket. No drawstrings. Pre-shrunk for an enduring silhouette.",
                "details_and_care": "460 GSM heavyweight French terry. Pre-shrunk 100% organic cotton. Ribbed cuffs and waistband. Machine wash cold inside out, lay flat to dry. Ethically crafted.",
                "fit_guide": "Relaxed unisex fit. Take your usual size, or size up for an exaggerated drape.",
                "rating": 4.9,
                "review_count": 128,
                "featured": True,
                "images": [
                    ("https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80", "Ash Heavyweight Hoodie Front", True, 1),
                    ("https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=80", "Ash Hoodie Model Wearing Size L", False, 2),
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
                    ("Jordan L.", 5, "Finally, a hoodie with the right weight. It holds its shape, and the fit is exactly what I wanted.", "Ash / Size M", "October 8, 2026"),
                    ("Kwame O.", 5, "The stitch count and density are unmatched. Truly feels premium and timeless.", "Ink / Size L", "October 2, 2026"),
                    ("Sarah M.", 5, "I wear this nearly everyday. Minimalist branding, high comfort, worth every penny.", "Ash / Size S", "September 24, 2026"),
                ]
            },
            {
                "category": cat_hoodies,
                "name": "The Heritage Pullover",
                "slug": "the-heritage-pullover-ink",
                "tagline": "Ink / Relaxed unisex fit",
                "badge": "CORE ESSENTIAL",
                "price": 94.00,
                "compare_at_price": 120.00,
                "fabric_weight": "480 GSM, Custom Looped Cotton",
                "description": "Deep midnight ink tone with subtle tonal embroidery on the sleeve cuff. Features custom metal grommet breathing holes and reinforced double seams.",
                "details_and_care": "100% Combed Ringspun Cotton. Custom garment dyed. Cold wash, hang dry. Made to withstand daily wear.",
                "fit_guide": "Boxy, slightly cropped modern fit. True to size.",
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
                    ("Amina K.", 5, "The ink black is deep and rich. Does not fade after 10 washes.", "Ink / Size M", "October 10, 2026")
                ]
            },
            {
                "category": cat_hoodies,
                "name": "The Savannah Ochre Hoodie",
                "slug": "the-savannah-ochre-hoodie",
                "tagline": "Citron / Relaxed unisex fit",
                "badge": "NEW COLOR",
                "price": 88.00,
                "compare_at_price": 110.00,
                "fabric_weight": "460 GSM, Organic Fleece",
                "description": "Inspired by golden sunrises across the savannah. Warm citron and ochre tones blended in an earthy brushed cotton finish.",
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
                    ("Tariq N.", 5, "Such a vibrant yet calm color. Compliments everywhere I go.", "Citron / Size L", "October 5, 2026")
                ]
            },
            {
                "category": cat_caps,
                "name": "The Afriqan Signature Cap",
                "slug": "the-afriqan-signature-cap",
                "tagline": "Ink / Unstructured 6-panel fit",
                "badge": "BESTSELLER",
                "price": 38.00,
                "compare_at_price": 45.00,
                "fabric_weight": "100% Chino Cotton Twill",
                "description": "Low profile, 6-panel unstructured dad cap with curved peak. Finished with subtle tonal Afriqan insignia embroidery and brass buckle slider.",
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
                    ("David E.", 5, "The crown structure is perfection. Doesn't poke up awkwardly.", "Ink / One Size", "October 11, 2026"),
                    ("Nia Z.", 5, "The antique brass buckle and clean embroidery give it high-end luxury feel.", "Chalk / One Size", "October 4, 2026")
                ]
            },
            {
                "category": cat_caps,
                "name": "The Savannah Safari Cap",
                "slug": "the-savannah-safari-cap",
                "tagline": "Moss / Relaxed unisex fit",
                "badge": "CORE ESSENTIAL",
                "price": 38.00,
                "compare_at_price": 45.00,
                "fabric_weight": "Heavy Brushed Cotton Canvas",
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
                    ("Kofi B.", 5, "Earth tones are unmatched. Pairs nicely with the heavyweight hoodie.", "Moss / One Size", "September 29, 2026")
                ]
            },
            {
                "category": cat_caps,
                "name": "The Minimalist Chalk Cap",
                "slug": "the-minimalist-chalk-cap",
                "tagline": "Chalk / Relaxed unisex fit",
                "badge": "NEW COLOR",
                "price": 38.00,
                "compare_at_price": 45.00,
                "fabric_weight": "100% Organic Raw Cotton",
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
                    ("Elena S.", 5, "Cleanest cap in my wardrobe. Doesn't get dirty easily either.", "Chalk / One Size", "October 7, 2026")
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
                description=pdata["description"],
                details_and_care=pdata["details_and_care"],
                fit_guide=pdata["fit_guide"],
                rating=pdata["rating"],
                review_count=pdata["review_count"],
                featured=pdata["featured"],
                in_stock=True
            )

            for url, alt, is_prim, order in pdata["images"]:
                ProductImage.objects.create(
                    product=prod,
                    image_url=url,
                    alt_text=alt,
                    is_primary=is_prim,
                    sort_order=order
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
                        image_url=pdata["images"][0][0]
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
                    verified_buyer=True
                )

        # Create demo order for Alex Morgan matching the design mock
        order = Order.objects.create(
            order_number="OH-10482",
            email="alex.morgan@email.com",
            first_name="Alex",
            last_name="Morgan",
            address="128 Sunset Avenue",
            apartment="Apartment 4B",
            city="Los Angeles",
            state="California",
            zip_code="90026",
            country="United States",
            phone="+1 (213) 555-0142",
            shipping_method="standard",
            shipping_cost=0.00,
            subtotal=126.00,
            tax=10.08,
            total=136.08,
            currency="USD",
            payment_method="credit_card",
            card_last_four="4242",
            status="confirmed",
            estimated_arrival="October 19–21, 2026"
        )
        
        hoodie_prod = Product.objects.get(slug="the-heavyweight-hoodie-ash")
        cap_prod = Product.objects.get(slug="the-afriqan-signature-cap")

        OrderItem.objects.create(
            order=order,
            product=hoodie_prod,
            product_name="The Heavyweight Hoodie",
            color="Ash",
            size="M",
            price=88.00,
            quantity=1,
            image_url=hoodie_prod.images.first().image_url
        )
        OrderItem.objects.create(
            order=order,
            product=cap_prod,
            product_name="The Afriqan Signature Cap",
            color="Ink",
            size="ONE SIZE",
            price=38.00,
            quantity=1,
            image_url=cap_prod.images.first().image_url
        )

        self.stdout.write(self.style.SUCCESS("Successfully seeded Afriqan Caps and Hoodies store data!"))
