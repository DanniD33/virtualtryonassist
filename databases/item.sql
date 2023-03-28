CREATE TABLE Item (
  id SERIAL PRIMARY KEY,
  item_type VARCHAR(100) NOT NULL,
  details VARCHAR(32) NOT NULL,
);

--Details will act as foreign key and will have another table introduced (this time with size and color)