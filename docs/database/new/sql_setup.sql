-- DATABASE FOR DIS

CREATE TABLE Companies
   (name VARCHAR(50),
    PRIMARY KEY (name));

CREATE TABLE Product_Templates
   (id VARCHAR(50),
    name VARCHAR(50),
    journal VARCHAR(5000),
	owned_by VARCHAR(50),
    PRIMARY KEY (id),
    FOREIGN KEY (owned_by) REFERENCES Companies);

CREATE TABLE Users
   (username VARCHAR(50),
	name VARCHAR(50),
	password VARCHAR(50),
	privilege INTEGER,
	works_for VARCHAR(50) NOT NULL,
    PRIMARY KEY (username),
    FOREIGN KEY (works_for) REFERENCES Companies
   		ON DELETE NO ACTION);

CREATE TABLE Parameters
   (name VARCHAR(50),
	related_to VARCHAR(50) NOT NULL,
    PRIMARY KEY (name, related_to),
    FOREIGN KEY (related_to) REFERENCES Product_Templates
   		ON DELETE NO ACTION);

CREATE TABLE Produced_Products
   (serial_number VARCHAR(50),
	of_type VARCHAR(50) NOT NULL,
	date DATE,
	produced_by VARCHAR(50),
    PRIMARY KEY (serial_number, of_type),
    FOREIGN KEY (of_type) REFERENCES Product_Templates
   		ON DELETE NO ACTION,
    FOREIGN KEY (produced_by) REFERENCES Users
   		ON DELETE NO ACTION);

CREATE TABLE Uses
   (produced_product_sn VARCHAR(50),
	produced_product_ot INTEGER,
	uses_component_sn VARCHAR(50),
	uses_component_ot INTEGER,
    PRIMARY KEY (produced_product_sn, produced_product_ot, uses_component_sn, uses_component_ot),
    FOREIGN KEY (produced_product_sn, produced_product_ot) REFERENCES Produced_Products,
   	FOREIGN KEY (uses_component_sn, uses_component_ot) REFERENCES Produced_Products);

CREATE TABLE Compatible
   (component VARCHAR(50),
	compatible_to VARCHAR(50),
    PRIMARY KEY (component, compatible_to),
    FOREIGN KEY (component) REFERENCES Product_Templates,
   	FOREIGN KEY (compatible_to) REFERENCES Product_Templates);

CREATE TABLE Set_To
   (produced_product_sn VARCHAR(50),
	produced_product_ot INTEGER,
	parameter_name VARCHAR(50),
	value VARCHAR(50),
    PRIMARY KEY (produced_product_sn, produced_product_ot, parameter_name),
    FOREIGN KEY (produced_product_sn, produced_product_ot) REFERENCES Produced_Products,
   	FOREIGN KEY (parameter_name, produced_product_ot) REFERENCES Parameters);

	
	
	
	
