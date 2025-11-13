-- Insert Categories
INSERT INTO categories (name, slug, description, image_url) VALUES
  ('Electronics', 'electronics', 'Latest electronic devices and gadgets', '/placeholder.svg?height=300&width=300'),
  ('Accessories', 'accessories', 'Premium accessories for your devices', '/placeholder.svg?height=300&width=300'),
  ('Wearables', 'wearables', 'Smartwatches and fitness trackers', '/placeholder.svg?height=300&width=300');

-- Insert Products
INSERT INTO products (name, description, price, cost, stock_quantity, category_id, image_url, slug, is_featured) VALUES
  (
    'Pro Wireless Headphones',
    'Premium noise-canceling headphones with 30-hour battery life and superior sound quality',
    199.99,
    80,
    50,
    (SELECT id FROM categories WHERE slug = 'electronics'),
    '/placeholder.svg?height=400&width=400',
    'pro-wireless-headphones',
    TRUE
  ),
  (
    'Smart Watch Pro',
    'Advanced fitness tracking with heart rate monitor, GPS, and 7-day battery life',
    349.99,
    150,
    30,
    (SELECT id FROM categories WHERE slug = 'wearables'),
    '/placeholder.svg?height=400&width=400',
    'smart-watch-pro',
    TRUE
  ),
  (
    'USB-C Fast Charger',
    'Fast charging adapter supporting up to 65W with multiple ports',
    49.99,
    15,
    100,
    (SELECT id FROM categories WHERE slug = 'accessories'),
    '/placeholder.svg?height=400&width=400',
    'usb-c-fast-charger',
    FALSE
  ),
  (
    'Portable SSD 1TB',
    'Ultra-fast external solid state drive with USB 3.1 Gen 2 connectivity',
    129.99,
    50,
    40,
    (SELECT id FROM categories WHERE slug = 'electronics'),
    '/placeholder.svg?height=400&width=400',
    'portable-ssd-1tb',
    TRUE
  ),
  (
    'Wireless Mouse',
    'Ergonomic wireless mouse with precision tracking and 18-month battery',
    39.99,
    12,
    150,
    (SELECT id FROM categories WHERE slug = 'accessories'),
    '/placeholder.svg?height=400&width=400',
    'wireless-mouse',
    FALSE
  );
