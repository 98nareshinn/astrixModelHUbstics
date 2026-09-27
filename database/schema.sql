-- Bhoomi Saathi — Database Schema
-- Beawar, Rajasthan property + home services marketplace

CREATE DATABASE IF NOT EXISTS bhoomi_saathi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bhoomi_saathi;

-- ===================== LOCATION =====================

CREATE TABLE cities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL DEFAULT 'Rajasthan',
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE areas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  city_id INT NOT NULL,
  name VARCHAR(150) NOT NULL,
  pincode VARCHAR(10),
  latitude DECIMAL(10, 7),
  longitude DECIMAL(10, 7),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE
);

-- ===================== USERS =====================

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  mobile VARCHAR(15) UNIQUE,
  email VARCHAR(150) UNIQUE,
  password_hash VARCHAR(255),
  role ENUM('public', 'admin', 'agent', 'service_provider') NOT NULL DEFAULT 'public',
  city_id INT,
  area_id INT,
  latitude DECIMAL(10, 7),
  longitude DECIMAL(10, 7),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE SET NULL,
  FOREIGN KEY (area_id) REFERENCES areas(id) ON DELETE SET NULL
);

-- Shared admin workspace team profiles (internal, distinct from `users`)
CREATE TABLE admin_team_members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'Admin',
  phone VARCHAR(15),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===================== PROPERTIES =====================

CREATE TABLE properties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  city_id INT,
  area_id INT,
  title VARCHAR(255) NOT NULL,
  title_hi VARCHAR(255),
  property_type ENUM('apartment','house','villa','plot','land','office','shop','warehouse','industrial','agricultural') NOT NULL,
  listing_type ENUM('sale','rent','lease','pg') NOT NULL,
  price DECIMAL(14, 2) NOT NULL,
  khasra_number VARCHAR(50),
  property_number VARCHAR(50),
  area_sqft INT,
  bedrooms TINYINT,
  bathrooms TINYINT,
  property_age TINYINT,
  facing VARCHAR(50),
  road_width_ft INT,
  land_type VARCHAR(100),
  address TEXT,
  description TEXT,
  description_hi TEXT,
  latitude DECIMAL(10, 7),
  longitude DECIMAL(10, 7),
  status ENUM('PENDING','PUBLISHED','REJECTED') NOT NULL DEFAULT 'PENDING',
  verified BOOLEAN DEFAULT FALSE,
  likes_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE SET NULL,
  FOREIGN KEY (area_id) REFERENCES areas(id) ON DELETE SET NULL,
  INDEX idx_status (status),
  INDEX idx_type (property_type, listing_type),
  INDEX idx_khasra (khasra_number)
);

CREATE TABLE property_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  property_id INT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

CREATE TABLE property_likes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  property_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_like (property_id, user_id),
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE property_comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  property_id INT NOT NULL,
  user_id INT,
  author_name VARCHAR(150),
  comment TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE property_enquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  property_id INT NOT NULL,
  name VARCHAR(150) NOT NULL,
  mobile VARCHAR(15) NOT NULL,
  email VARCHAR(150),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

CREATE TABLE property_approvals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  property_id INT NOT NULL,
  reviewer_id INT,
  action ENUM('APPROVED','REJECTED') NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
  FOREIGN KEY (reviewer_id) REFERENCES admin_team_members(id) ON DELETE SET NULL
);

-- ===================== MAPS =====================

CREATE TABLE map_products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  title_hi VARCHAR(255),
  area_id INT,
  category VARCHAR(100),
  format ENUM('PDF','JPG','PNG') NOT NULL DEFAULT 'PDF',
  pages INT DEFAULT 1,
  print_size VARCHAR(20),
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  file_url VARCHAR(500),
  thumbnail_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (area_id) REFERENCES areas(id) ON DELETE SET NULL
);

CREATE TABLE map_orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  map_product_id INT NOT NULL,
  user_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_status ENUM('PENDING','PAID','FAILED') DEFAULT 'PENDING',
  payment_ref VARCHAR(150),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (map_product_id) REFERENCES map_products(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE map_downloads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  map_order_id INT NOT NULL,
  downloaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (map_order_id) REFERENCES map_orders(id) ON DELETE CASCADE
);

-- ===================== SERVICES =====================

CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  name_hi VARCHAR(150),
  category VARCHAR(100),
  description TEXT,
  description_hi TEXT,
  icon VARCHAR(50),
  price_from DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE service_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  service_id INT NOT NULL,
  user_id INT NOT NULL,
  address TEXT,
  preferred_date DATE,
  preferred_time TIME,
  notes TEXT,
  status ENUM('REQUESTED','CONFIRMED','COMPLETED','CANCELLED') DEFAULT 'REQUESTED',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ===================== NEWS =====================

CREATE TABLE news_cache (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  title_hi VARCHAR(255),
  summary TEXT,
  summary_hi TEXT,
  source VARCHAR(150),
  source_url VARCHAR(500),
  category VARCHAR(100),
  published_at DATETIME,
  fetched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===================== SEED DATA =====================

INSERT INTO cities (name, state) VALUES ('Beawar', 'Rajasthan');

INSERT INTO areas (city_id, name, pincode, latitude, longitude) VALUES
  (1, 'Ajmer Road', '305901', 26.1131, 74.2997),
  (1, 'Vaishali Nagar', '305901', 26.0931, 74.3347),
  (1, 'Station Road', '305901', 26.1041, 74.3257),
  (1, 'Jawaja Road', '305901', 26.0811, 74.3097),
  (1, 'Chandra Nagar', '305901', 26.1061, 74.3077),
  (1, 'Surajpole', '305901', 26.1191, 74.3397);

INSERT INTO admin_team_members (name, role, phone) VALUES
  ('Naresh Singh', 'Head Admin', '+919000000001'),
  ('Mahavir Singh', 'Admin', '+919000000002'),
  ('Ramesh Kumar', 'Admin', '+919000000003');

INSERT INTO services (name, name_hi, category, description, description_hi, icon, price_from) VALUES
  ('Plumbing Service', 'प्लंबिंग सेवा', 'Repair', 'Leakage, fitting and pipeline work.', 'लीकेज, फिटिंग और पाइपलाइन का काम।', 'wrench', 150),
  ('Electrician Service', 'इलेक्ट्रीशियन सेवा', 'Repair', 'Wiring, switches, fans and installation.', 'वायरिंग, स्विच, पंखे और इंस्टॉलेशन।', 'zap', 150),
  ('Cleaning Service', 'सफाई सेवा', 'Home Care', 'Home, office and deep cleaning.', 'घर, ऑफिस और डीप क्लीनिंग।', 'sparkles', 400),
  ('Home Staffing', 'घरेलू स्टाफ सेवा', 'Staffing', 'Local helpers, cooks and support staff.', 'लोकल हेल्पर, रसोइया और सहायक स्टाफ।', 'users', 3000),
  ('Property Document Help', 'प्रॉपर्टी दस्तावेज़ सहायता', 'Legal', 'Assistance with registry and land documents.', 'रजिस्ट्री और भूमि दस्तावेज़ों में सहायता।', 'file-text', 500),
  ('Site Visit', 'साइट विज़िट', 'Property', 'Accompanied property or land site visits.', 'प्रॉपर्टी या ज़मीन के लिए साथ में विज़िट।', 'map-pin', 300),
  ('Land Survey', 'भूमि सर्वेक्षण', 'Property', 'Land measurement and boundary survey.', 'भूमि माप और सीमा सर्वेक्षण।', 'ruler', 800),
  ('Property Photography', 'प्रॉपर्टी फोटोग्राफी', 'Property', 'Listing photos to help your property sell faster.', 'प्रॉपर्टी जल्दी बिकने में मदद के लिए लिस्टिंग फोटो।', 'camera', 600);
