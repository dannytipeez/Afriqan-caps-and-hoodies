# Afriqan Caps and Hoodies®

A modern luxury streetwear e-commerce platform engineered with a **Django Ninja** REST API backend and a **Next.js** (App Router) frontend, styled according to the aesthetic language of Offhours Studio.

---

## 🎨 Brand Identity & Design System
- **Brand**: Afriqan Caps and Hoodies®
- **Philosophy**: *Less noise. Better essentials. Made for the hours that are yours.*
- **Palette**:
  - Background: Neutral White `#FBFBF9`
  - High-Contrast Text: Onyx `#121212`
  - Accent / CTA: Vibrant Citron `#D2DB6B` / `#C2CB5E`
  - Borders: Crisp Off-White `#E6E6E2`
  - Earthy Essentials: Ink `#1E1F21`, Chalk `#E5E1D8`, Ash `#9A9E99`, Moss `#5F6A51`, Citron `#CED587`
- **Key Features**:
  - **Shop Catalog**: Multi-attribute filtering (Category, Unisex Size, Color swatches, Price under \$50 / \$50-\$100, In-stock toggle, Sorting).
  - **Product Detail (PDP)**: Multi-angle image gallery, live swatch & size selectors, GSM and garment specs, CM/IN size measurement chart, verified customer reviews, and "Good together" recommendations.
  - **Shopping Bag**: Free US shipping status bar (\$100+), quantity steppers, order notes, coupon code input, and "Room for one more?" cross-sells.
  - **Checkout Flow**: Express checkout (Apple Pay / PayPal), 3-step structured contact/delivery/payment forms with encrypted security badges.
  - **Order Confirmation**: Matches the reference receipt design with order number, estimated arrival timeline (Order confirmed → Getting it ready → On the way → At your door), breakdown of items, and care guide.
  - **SEO & GEO**: Complete Next.js metadata, OpenGraph cards, Twitter cards, JSON-LD ClothingStore structured schema, `sitemap.ts`, `robots.ts`, and geographic metadata tags (`geo.region`, `geo.placename`, `geo.position`).

---

## 🛠 Tech Stack
- **Backend**: Python 3.11, Django 5.2, Django Ninja, WhiteNoise, PostgreSQL/SQLite.
- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Lucide Icons.
- **Infrastructure**: Dockerfiles, `render.yaml` Blueprint, and GitHub Actions CI/CD.

---

## 🚀 Local Development Setup

### 1. Backend (Django Ninja)
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py seed_shop
python manage.py runserver 8000
```
- API Docs: `http://localhost:8000/api/docs`
- Django Admin: `http://localhost:8000/admin`

### 2. Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
- Frontend application: `http://localhost:3000`

---

## 🚢 Deployment on Render

This repository includes a native `render.yaml` blueprint:
1. Connect your GitHub repository `dannytipeez/Afriqan-caps-and-hoodies` to **Render.com**.
2. Go to **Blueprints** → **New Blueprint Instance**.
3. Select this repository. Render will automatically provision:
   - `afriqan-postgres`: Managed PostgreSQL instance.
   - `afriqan-backend`: Containerized Django Ninja web service.
   - `afriqan-frontend`: Containerized Next.js web service.

---

## 🔄 CI/CD Pipeline
Continuous Integration and automated checks are configured in `.github/workflows/ci-cd.yml`:
- Runs Python system check, migrations, and database seed verification.
- Runs Next.js TypeScript check, linting, and production compilation (`next build`).
