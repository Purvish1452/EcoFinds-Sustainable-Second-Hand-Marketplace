-- Sample eco-friendly products for EcoFinds
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
-- Home & Garden Products
(
  gen_random_uuid(),
  'Bamboo Cutting Board Set',
  'Sustainable bamboo cutting boards that are naturally antimicrobial and biodegradable. Perfect for eco-conscious kitchens.',
  29.99,
  '/placeholder.svg?height=400&width=400',
  'home',
  5,
  ARRAY['Bamboo', 'Biodegradable', 'Antimicrobial', 'Renewable'],
  50,
  gen_random_uuid()
),
(
  gen_random_uuid(),
  'Solar Garden Lights',
  'Beautiful solar-powered LED garden lights that charge during the day and illuminate your garden at night without electricity.',
  45.99,
  '/placeholder.svg?height=400&width=400',
  'home',
  5,
  ARRAY['Solar Powered', 'LED', 'Weather Resistant', 'Zero Emissions'],
  30,
  gen_random_uuid()
),
(
  gen_random_uuid(),
  'Organic Cotton Bed Sheets',
  'Luxuriously soft organic cotton bed sheets made from GOTS certified organic cotton. Hypoallergenic and breathable.',
  89.99,
  '/placeholder.svg?height=400&width=400',
  'home',
  4,
  ARRAY['Organic Cotton', 'GOTS Certified', 'Hypoallergenic', 'Fair Trade'],
  25,
  gen_random_uuid()
),

-- Personal Care Products
(
  gen_random_uuid(),
  'Zero Waste Shampoo Bar',
  'Plastic-free shampoo bar made with natural ingredients. Lasts as long as 2-3 bottles of liquid shampoo.',
  12.99,
  '/placeholder.svg?height=400&width=400',
  'personal-care',
  5,
  ARRAY['Zero Waste', 'Natural Ingredients', 'Plastic Free', 'Vegan'],
  100,
  gen_random_uuid()
),
(
  gen_random_uuid(),
  'Bamboo Toothbrush 4-Pack',
  'Biodegradable bamboo toothbrushes with soft bristles. Replace plastic toothbrushes with this eco-friendly alternative.',
  15.99,
  '/placeholder.svg?height=400&width=400',
  'personal-care',
  5,
  ARRAY['Bamboo Handle', 'Biodegradable', 'Plastic Free', 'Compostable'],
  75,
  gen_random_uuid()
),
(
  gen_random_uuid(),
  'Organic Face Moisturizer',
  'Nourishing face moisturizer made with certified organic ingredients. Suitable for all skin types and cruelty-free.',
  34.99,
  '/placeholder.svg?height=400&width=400',
  'personal-care',
  4,
  ARRAY['Organic', 'Cruelty Free', 'All Natural', 'Recyclable Packaging'],
  60,
  gen_random_uuid()
),

-- Clothing Products
(
  gen_random_uuid(),
  'Organic Cotton T-Shirt',
  'Comfortable and stylish t-shirt made from 100% organic cotton. Fair trade certified and available in multiple colors.',
  24.99,
  '/placeholder.svg?height=400&width=400',
  'clothing',
  4,
  ARRAY['Organic Cotton', 'Fair Trade', 'GOTS Certified', 'Carbon Neutral'],
  40,
  gen_random_uuid()
),
(
  gen_random_uuid(),
  'Recycled Polyester Jacket',
  'Warm and waterproof jacket made from recycled plastic bottles. Perfect for outdoor adventures while helping the environment.',
  79.99,
  '/placeholder.svg?height=400&width=400',
  'clothing',
  4,
  ARRAY['Recycled Materials', 'Waterproof', 'Windproof', 'Plastic Bottle Recycled'],
  20,
  gen_random_uuid()
),

-- Electronics Products
(
  gen_random_uuid(),
  'Solar Power Bank',
  'Portable solar power bank that charges your devices using clean solar energy. Perfect for camping and outdoor activities.',
  39.99,
  '/placeholder.svg?height=400&width=400',
  'electronics',
  5,
  ARRAY['Solar Powered', 'Renewable Energy', 'Portable', 'Weather Resistant'],
  35,
  gen_random_uuid()
),
(
  gen_random_uuid(),
  'Energy Efficient LED Bulbs',
  'Long-lasting LED bulbs that use 80% less energy than traditional incandescent bulbs. Available in warm and cool white.',
  19.99,
  '/placeholder.svg?height=400&width=400',
  'electronics',
  5,
  ARRAY['Energy Efficient', 'Long Lasting', '80% Energy Savings', 'Mercury Free'],
  80,
  gen_random_uuid()
),

-- Food & Beverages
(
  gen_random_uuid(),
  'Organic Fair Trade Coffee',
  'Premium organic coffee beans sourced directly from fair trade farmers. Rich flavor with notes of chocolate and caramel.',
  16.99,
  '/placeholder.svg?height=400&width=400',
  'food',
  5,
  ARRAY['Organic', 'Fair Trade', 'Direct Trade', 'Carbon Neutral Shipping'],
  90,
  gen_random_uuid()
),
(
  gen_random_uuid(),
  'Reusable Glass Water Bottles',
  'Durable borosilicate glass water bottles with silicone sleeves. BPA-free and perfect for staying hydrated sustainably.',
  22.99,
  '/placeholder.svg?height=400&width=400',
  'food',
  4,
  ARRAY['BPA Free', 'Reusable', 'Borosilicate Glass', 'Plastic Free'],
  45,
  gen_random_uuid()
),

-- Cleaning Products
(
  gen_random_uuid(),
  'Plant-Based All-Purpose Cleaner',
  'Effective all-purpose cleaner made from plant-based ingredients. Safe for families, pets, and the environment.',
  8.99,
  '/placeholder.svg?height=400&width=400',
  'cleaning',
  5,
  ARRAY['Plant Based', 'Non Toxic', 'Biodegradable', 'Pet Safe'],
  70,
  gen_random_uuid()
),
(
  gen_random_uuid(),
  'Compostable Cleaning Cloths',
  'Reusable cleaning cloths made from natural fibers. Compostable at end of life and more effective than paper towels.',
  14.99,
  '/placeholder.svg?height=400&width=400',
  'cleaning',
  5,
  ARRAY['Compostable', 'Natural Fibers', 'Reusable', 'Plastic Free'],
  55,
  gen_random_uuid()
);
