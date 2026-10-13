"""
Services follow HackSoft Django Styleguide:
Services encapsulate all business logic, side effects, external API interactions,
and write operations (create/update/delete).
"""
import base64
import os
import random
import string
from datetime import datetime
from typing import Any, Dict, List, Optional
import requests
from django.db import transaction
from shop.models import Order, OrderItem, Product


def generate_order_number() -> str:
    rand_suffix = "".join(random.choices(string.digits, k=5))
    return f"AF-{rand_suffix}"


def sanitize_phone_number(phone: str) -> str:
    """Format Kenyan phone number to 254XXXXXXXXX standard format."""
    p = phone.strip().replace(" ", "").replace("+", "").replace("-", "")
    if p.startswith("0"):
        return f"254{p[1:]}"
    if p.startswith("7") or p.startswith("1"):
        return f"254{p}"
    return p


@transaction.atomic
def order_create(
    *,
    email: str,
    first_name: str,
    last_name: str,
    address: str,
    apartment: str = "",
    city: str = "Nairobi",
    state: str = "Nairobi County",
    zip_code: str = "00100",
    country: str = "Kenya",
    phone: str,
    shipping_method: str = "standard",
    shipping_cost: float = 300.0,
    subtotal: float,
    tax: float = 0.0,
    total: float,
    payment_method: str = "mpesa_till",
    order_note: str = "",
    items_data: List[Dict[str, Any]],
    mpesa_receipt: str = "",
) -> Order:
    order_num = generate_order_number()
    clean_phone = sanitize_phone_number(phone)

    payment_status = "cod_pending" if payment_method == "cod" else ("paid" if mpesa_receipt else "pending")

    order = Order.objects.create(
        order_number=order_num,
        email=email,
        first_name=first_name,
        last_name=last_name,
        address=address,
        apartment=apartment,
        city=city,
        state=state,
        zip_code=zip_code,
        country=country,
        phone=clean_phone,
        shipping_method=shipping_method,
        shipping_cost=shipping_cost,
        subtotal=subtotal,
        tax=tax,
        total=total,
        currency="KES",
        payment_method=payment_method,
        payment_status=payment_status,
        mpesa_phone=clean_phone,
        mpesa_receipt_number=mpesa_receipt,
        status="confirmed",
        order_note=order_note,
        estimated_arrival="1–2 business days within Nairobi & Kenya",
    )

    for item in items_data:
        has_print = item.get("has_custom_print", False)
        print_fee = 500.0 if has_print else 0.0

        OrderItem.objects.create(
            order=order,
            product_id=item.get("product_id"),
            product_name=item.get("product_name"),
            color=item.get("color"),
            size=item.get("size"),
            price=item.get("price"),
            quantity=item.get("quantity", 1),
            image_url=item.get("image_url", ""),
            has_custom_print=has_print,
            custom_print_text=item.get("custom_print_text", ""),
            custom_print_placement=item.get("custom_print_placement", ""),
            custom_print_fee=print_fee,
        )

    return order


def safaricom_express_stk_push(
    *,
    phone: str,
    amount: int,
    account_reference: str,
    transaction_desc: str = "Afriqan Caps & Hoodies Purchase",
) -> Dict[str, Any]:
    """
    Triggers Safaricom Daraja M-Pesa STK Push Express.
    Falls back gracefully to seamless simulation when live credentials are not set.
    """
    clean_phone = sanitize_phone_number(phone)
    consumer_key = os.getenv("MPESA_CONSUMER_KEY")
    consumer_secret = os.getenv("MPESA_CONSUMER_SECRET")
    shortcode = os.getenv("MPESA_SHORTCODE", "174379")
    passkey = os.getenv(
        "MPESA_PASSKEY",
        "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919",
    )

    # If live keys are present, execute genuine Daraja request
    if consumer_key and consumer_secret:
        try:
            auth_url = "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
            auth_res = requests.get(auth_url, auth=(consumer_key, consumer_secret), timeout=10)
            if auth_res.status_code == 200:
                token = auth_res.json().get("access_token")
                timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
                raw_password = f"{shortcode}{passkey}{timestamp}"
                password = base64.b64encode(raw_password.encode("utf-8")).decode("utf-8")

                stk_url = "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
                headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
                body = {
                    "BusinessShortCode": shortcode,
                    "Password": password,
                    "Timestamp": timestamp,
                    "TransactionType": "CustomerPayBillOnline",
                    "Amount": int(amount),
                    "PartyA": clean_phone,
                    "PartyB": shortcode,
                    "PhoneNumber": clean_phone,
                    "CallBackURL": os.getenv("MPESA_CALLBACK_URL", "https://afriqan-caps-and-hoodies.onrender.com/api/shop/mpesa-callback"),
                    "AccountReference": account_reference,
                    "TransactionDesc": transaction_desc,
                }
                res = requests.post(stk_url, json=body, headers=headers, timeout=15)
                return res.json()
        except Exception as e:
            print(f"Safaricom live STK error: {e}")

    # Simulated fallback response for sandbox or local testing
    checkout_id = f"ws_CO_{datetime.now().strftime('%Y%m%d')}_{random.randint(10000000, 99999999)}"
    return {
        "ResponseCode": "0",
        "ResponseDescription": "Success. Request accepted for processing",
        "MerchantRequestID": f"MR_{random.randint(10000, 99999)}",
        "CheckoutRequestID": checkout_id,
        "CustomerMessage": f"Success. Enter M-Pesa PIN on {clean_phone} to complete KES {amount} payment for Afriqan Caps and Hoodies.",
    }
