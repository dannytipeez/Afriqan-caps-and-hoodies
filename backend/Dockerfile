FROM python:3.11-slim

# Prevent python from buffering stdout and stderr
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PORT=8000

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install python dependencies
COPY backend/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copy backend code
COPY backend /app/

# Collect static files and execute migrations in entrypoint or startup
RUN python manage.py collectstatic --noinput || true

EXPOSE 8000

# Run gunicorn
CMD ["sh", "-c", "python manage.py migrate && python manage.py seed_shop && gunicorn config.wsgi:application --bind 0.0.0.0:${PORT:-8000} --workers 3"]

