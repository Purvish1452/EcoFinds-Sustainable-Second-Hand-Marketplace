-- Final comprehensive fix for all product images and additional products
-- Clear existing products and insert with working image URLs

DELETE FROM products;

-- Insert all products with working image URLs and Indian market pricing
INSERT INTO products (name, description, price, category, image_url, eco_rating, sustainability_features, stock_quantity, created_at) VALUES

-- Kitchen & Home Products
('Beeswax Food Wraps', 'Reusable food wraps made from organic cotton and beeswax. Set of 3 different sizes.', 899.00, 'Kitchen', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center', 5, '["Plastic-free", "Reusable", "Biodegradable", "Organic materials"]', 50, NOW()),

('Bamboo Cutting Board', 'Sustainable bamboo cutting board with natural antimicrobial properties.', 1299.00, 'Kitchen', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center', 5, '["Renewable bamboo", "Antimicrobial", "Durable", "Plastic-free"]', 30, NOW()),

('Stainless Steel Lunch Box', 'Durable stainless steel lunch container with compartments. BPA-free.', 1599.00, 'Kitchen', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center', 4, '["BPA-free", "Reusable", "Durable", "Plastic-free"]', 40, NOW()),

('Organic Cotton Kitchen Towels', 'Set of 3 organic cotton kitchen towels. Machine washable and highly absorbent.', 699.00, 'Kitchen', 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop&crop=center', 5, '["Organic cotton", "Reusable", "Machine washable", "Plastic-free packaging"]', 60, NOW()),

-- Personal Care Products
('Bamboo Toothbrush Set', 'Biodegradable bamboo toothbrushes with soft bristles. Pack of 4.', 499.00, 'Personal Care', 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop&crop=center', 5, '["Biodegradable", "Plastic-free", "Sustainable bamboo", "Compostable"]', 100, NOW()),

('Natural Shampoo Bar', 'Plastic-free shampoo bar with organic ingredients. Suitable for all hair types.', 399.00, 'Personal Care', 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center', 5, '["Plastic-free", "Organic ingredients", "Zero waste", "Sulfate-free"]', 80, NOW()),

('Organic Skincare Set', 'Complete skincare routine with organic, cruelty-free products. Face wash, moisturizer, and serum.', 2999.00, 'Personal Care', 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop&crop=center', 5, '["Organic ingredients", "Cruelty-free", "Plastic-free packaging", "Natural preservatives"]', 25, NOW()),

('Reusable Cotton Pads', 'Set of 10 organic cotton reusable makeup remover pads with wash bag.', 599.00, 'Personal Care', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop&crop=center', 5, '["Reusable", "Organic cotton", "Machine washable", "Zero waste"]', 70, NOW()),

-- Accessories & Bags
('Recycled Plastic Water Bottle', 'Insulated water bottle made from 100% recycled plastic. 750ml capacity.', 649.00, 'Accessories', 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop&crop=center', 4, '["Recycled materials", "BPA-free", "Insulated", "Reusable"]', 90, NOW()),

('Organic Cotton Tote Bag', 'Reusable organic cotton shopping bag with reinforced handles. Large capacity.', 799.00, 'Accessories', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center', 5, '["Organic cotton", "Reusable", "Durable", "Plastic-free"]', 120, NOW()),

('Hemp Backpack', 'Durable backpack made from sustainable hemp fiber. Water-resistant and spacious.', 2499.00, 'Accessories', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center', 4, '["Hemp fiber", "Water-resistant", "Durable", "Sustainable"]', 35, NOW()),

('Cork Wallet', 'Stylish wallet made from sustainable cork leather. RFID blocking technology.', 1299.00, 'Accessories', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center', 5, '["Cork leather", "RFID blocking", "Vegan", "Sustainable"]', 45, NOW()),

-- Electronics & Tech
('Sustainable Phone Case', 'Biodegradable phone case made from plant-based materials. Available for multiple phone models.', 1299.00, 'Electronics', 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop&crop=center', 4, '["Biodegradable", "Plant-based materials", "Protective", "Compostable"]', 75, NOW()),

('Solar Power Bank', 'Portable solar-powered charger for phones and small devices. 10000mAh capacity.', 2999.00, 'Electronics', 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=400&h=400&fit=crop&crop=center', 4, '["Solar powered", "Renewable energy", "Portable", "High capacity"]', 40, NOW()),

('Bamboo Wireless Charger', 'Eco-friendly wireless charging pad made from sustainable bamboo.', 1899.00, 'Electronics', 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop&crop=center', 4, '["Bamboo construction", "Wireless charging", "Sustainable", "Fast charging"]', 50, NOW()),

-- Fitness & Wellness
('Eco-Friendly Yoga Mat', 'Natural rubber yoga mat with cork surface. Non-slip and biodegradable.', 2499.00, 'Fitness', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop&crop=center', 5, '["Natural rubber", "Cork surface", "Biodegradable", "Non-slip"]', 30, NOW()),

('Organic Cotton Yoga Blocks', 'Set of 2 yoga blocks made from organic cotton and natural cork.', 1599.00, 'Fitness', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop&crop=center', 5, '["Organic cotton", "Natural cork", "Lightweight", "Sustainable"]', 40, NOW()),

('Stainless Steel Water Bottle', 'Double-walled stainless steel water bottle. Keeps drinks cold for 24hrs, hot for 12hrs.', 1299.00, 'Fitness', 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop&crop=center', 4, '["Stainless steel", "Double-walled", "BPA-free", "Reusable"]', 85, NOW()),

-- Clothing & Textiles
('Organic Cotton T-Shirt', 'Comfortable t-shirt made from 100% organic cotton. Available in multiple colors.', 899.00, 'Clothing', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center', 5, '["Organic cotton", "Fair trade", "Soft fabric", "Sustainable dyes"]', 100, NOW()),

('Recycled Polyester Jacket', 'Warm jacket made from recycled plastic bottles. Water-resistant and breathable.', 3999.00, 'Clothing', 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center', 4, '["Recycled materials", "Water-resistant", "Breathable", "Warm insulation"]', 25, NOW()),

('Organic Cotton Bed Sheets', 'Luxurious bed sheet set made from organic cotton. Hypoallergenic and breathable.', 2999.00, 'Home', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center', 5, '["Organic cotton", "Hypoallergenic", "Breathable", "Soft texture"]', 20, NOW()),

-- Garden & Outdoor
('Solar Garden Lights', 'Set of 6 solar-powered LED garden lights. Automatic on/off with dusk sensor.', 1999.00, 'Garden', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center', 4, '["Solar powered", "LED lights", "Weather resistant", "Automatic sensor"]', 35, NOW()),

('Compost Bin', 'Large capacity compost bin made from recycled plastic. Perfect for home composting.', 3499.00, 'Garden', 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop&crop=center', 5, '["Recycled plastic", "Large capacity", "Easy assembly", "Ventilation system"]', 15, NOW()),

('Bamboo Planters Set', 'Set of 3 bamboo planters in different sizes. Perfect for herbs and small plants.', 1799.00, 'Garden', 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop&crop=center', 5, '["Sustainable bamboo", "Natural finish", "Drainage holes", "Various sizes"]', 30, NOW());
