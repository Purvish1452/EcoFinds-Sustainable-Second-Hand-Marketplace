-- Complete product update with images and Indian market pricing
-- First, update existing products with proper images and Indian pricing

UPDATE products SET 
  image_url = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
  price = 1299.00
WHERE name = 'Bamboo Cutting Board Set';

UPDATE products SET 
  image_url = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
  price = 2499.00
WHERE name = 'Solar Garden Lights';

UPDATE products SET 
  image_url = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
  price = 3999.00
WHERE name = 'Organic Cotton Bed Sheets';

UPDATE products SET 
  image_url = 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
  price = 599.00
WHERE name = 'Zero Waste Shampoo Bar';

UPDATE products SET 
  image_url = 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop',
  price = 799.00
WHERE name = 'Bamboo Toothbrush 4-Pack';

UPDATE products SET 
  image_url = 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop',
  price = 1599.00
WHERE name = 'Organic Face Moisturizer';

UPDATE products SET 
  image_url = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
  price = 1199.00
WHERE name = 'Organic Cotton T-Shirt';

UPDATE products SET 
  image_url = 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop',
  price = 3999.00
WHERE name = 'Recycled Polyester Jacket';

UPDATE products SET 
  image_url = 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop',
  price = 1999.00
WHERE name = 'Solar Power Bank';

UPDATE products SET 
  image_url = 'https://images.unsplash.com/photo-1550985543-49bee3167284?w=400&h=400&fit=crop',
  price = 899.00
WHERE name = 'Energy Efficient LED Bulbs';

UPDATE products SET 
  image_url = 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop',
  price = 799.00
WHERE name = 'Organic Fair Trade Coffee';

UPDATE products SET 
  image_url = 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
  price = 1099.00
WHERE name = 'Reusable Glass Water Bottles';

UPDATE products SET 
  image_url = 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop',
  price = 449.00
WHERE name = 'Plant-Based All-Purpose Cleaner';

UPDATE products SET 
  image_url = 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop',
  price = 699.00
WHERE name = 'Compostable Cleaning Cloths';

-- Add missing products mentioned by user
INSERT INTO products (
  id,
  name,
  description,
  price,
  image_url,
  category,
  eco_rating,
  sustainability_features,
  stock_quantity,
  seller_id
) VALUES
(
  gen_random_uuid(),
  'Beeswax Food Wraps',
  'Reusable beeswax wraps that replace plastic wrap. Made with organic cotton, beeswax, and natural oils.',
  899.00,
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
  'food',
  5,
  ARRAY['Plastic Free', 'Reusable', 'Organic Cotton', 'Natural Beeswax'],
  65,
  gen_random_uuid()
),
(
  gen_random_uuid(),
  'Recycled Plastic Water Bottle',
  'Durable water bottle made from 100% recycled plastic. BPA-free with leak-proof design.',
  649.00,
  'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
  'accessories',
  4,
  ARRAY['Recycled Plastic', 'BPA Free', 'Leak Proof', 'Lightweight'],
  80,
  gen_random_uuid()
),
(
  gen_random_uuid(),
  'Eco-Friendly Yoga Mat',
  'Non-toxic yoga mat made from natural rubber and cork. Provides excellent grip and cushioning.',
  2499.00,
  'https://images.unsplash.com/photo-1506629905607-d405d7d3b880?w=400&h=400&fit=crop',
  'accessories',
  5,
  ARRAY['Natural Rubber', 'Cork Surface', 'Non Toxic', 'Biodegradable'],
  40,
  gen_random_uuid()
),
(
  gen_random_uuid(),
  'Organic Skincare Set',
  'Complete skincare set with cleanser, toner, and moisturizer. Made with certified organic ingredients.',
  2999.00,
  'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
  'personal-care',
  5,
  ARRAY['Organic', 'Cruelty Free', 'Natural Ingredients', 'Recyclable Packaging'],
  35,
  gen_random_uuid()
),
(
  gen_random_uuid(),
  'Sustainable Phone Case',
  'Biodegradable phone case made from plant-based materials. Provides excellent protection while being eco-friendly.',
  1299.00,
  'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop',
  'electronics',
  4,
  ARRAY['Biodegradable', 'Plant Based', 'Compostable', 'Drop Protection'],
  90,
  gen_random_uuid()
),
(
  gen_random_uuid(),
  'Organic Cotton Tote Bag',
  'Reusable organic cotton shopping bag with reinforced handles. Perfect replacement for plastic bags.',
  599.00,
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
  'accessories',
  5,
  ARRAY['Organic Cotton', 'Reusable', 'Fair Trade', 'Plastic Free'],
  100,
  gen_random_uuid()
),
(
  gen_random_uuid(),
  'Bamboo Fiber Dinnerware Set',
  'Complete dinnerware set made from bamboo fiber. Lightweight, durable, and dishwasher safe.',
  1899.00,
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
  'home',
  5,
  ARRAY['Bamboo Fiber', 'Dishwasher Safe', 'Lightweight', 'BPA Free'],
  45,
  gen_random_uuid()
),
(
  gen_random_uuid(),
  'Natural Loofah Sponges',
  'Set of natural loofah sponges for body and kitchen use. Biodegradable alternative to synthetic sponges.',
  399.00,
  'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop',
  'personal-care',
  5,
  ARRAY['Natural Loofah', 'Biodegradable', 'Plastic Free', 'Compostable'],
  120,
  gen_random_uuid()
),
(
  gen_random_uuid(),
  'Recycled Paper Notebooks',
  'Set of notebooks made from 100% recycled paper. Perfect for students and professionals.',
  799.00,
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop',
  'accessories',
  4,
  ARRAY['Recycled Paper', 'FSC Certified', 'Plastic Free', 'Eco Ink'],
  75,
  gen_random_uuid()
),
(
  gen_random_uuid(),
  'Hemp Seed Oil',
  'Pure cold-pressed hemp seed oil rich in omega fatty acids. Perfect for cooking and skincare.',
  1199.00,
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
  'food',
  5,
  ARRAY['Cold Pressed', 'Omega Rich', 'Organic', 'Glass Bottle'],
  60,
  gen_random_uuid()
);
