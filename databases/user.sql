CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  email VARCHAR(32) NOT NULL,
  birthday VARCHAR(10),
  CAM BOOLEAN
  created_at 
);

-- const user = {
--   "FirstName": "Danni",
--   "Email": "d123@gmail.com",
--   "Birthday": "April 2",
--   "Cam" : "idle"
-- };