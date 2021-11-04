-- CS4400: Introduction to Database Systems (Fall 2021)
-- Phase II: Create Table & Insert Statements [v0] Thursday, October 14, 2021 @ 2:00pm EDT

-- Team 035
-- Zongen Li (zli938)
-- Xianyi Nie(xnie40)
-- Haodan Tan (htan74)
-- Xiaobo He (xhe340)

-- Directions:
-- Please follow all instructions for Phase II as listed on Canvas.
-- Fill in the team number and names and GT usernames for all members above.
-- Create Table statements must be manually written, not taken from an SQL Dump file.
-- This file must run without error for credit.

-- ------------------------------------------------------
-- CREATE TABLE STATEMENTS AND INSERT STATEMENTS BELOW
-- ------------------------------------------------------

DROP DATABASE IF EXISTS reserve_system;
CREATE DATABASE IF NOT EXISTS reserve_system;
USE reserve_system;

-- Table structure for table Account

DROP TABLE IF EXISTS account_table;
CREATE TABLE account_table (
  email char(50) NOT NULL, 
  fname char(100) NOT NULL,
  lname char(100) NOT NULL,
  _password char(50) NOT NULL,
  phone_number char(50) NUll,
  is_admin bool NOT NULL,
  is_client bool NOT NULL,
  PRIMARY KEY (email)
) ENGINE=InnoDB;

INSERT INTO account_table VALUES
('mmoss1@travelagency.com', 'Mark', 'Moss', 'password1', NULL, TRUE, FALSE),
('asmith@travelagency.com', 'Aviva', 'Smith', 'password2', NULL, TRUE, FALSE),
('mscott22@gmail.com', 'Michael', 'Scott', 'password3', '555-123-4567', FALSE, TRUE),
('arthurread@gmail.com', 'Arthur', 'Read', 'password4', '555-234-5678', FALSE, TRUE),
('jwayne@gmail.com', 'John', 'Wayne', 'password5', '555-345-6789', FALSE, TRUE),
('gburdell3@gmail.com', 'George', 'Burdell', 'password6', '555-456-7890', FALSE, TRUE),
('mj23@gmail.com', 'Michael', 'Jordan', 'password7', '555-567-8901', FALSE, TRUE),
('lebron6@gmail.com', 'Lebron', 'James', 'password8', '555-678-9012', FALSE, TRUE),
('msmith5@gmail.com', 'Michael', 'Smith', 'password9', '555-789-0123', FALSE, TRUE),
('ellie2@gmail.com', 'Ellie', 'Johnson', 'password10', '555-890-1234', FALSE, TRUE),
('scooper3@gmail.com', 'Sheldon', 'Cooper', 'password11', '678-123-4567', FALSE, TRUE),
('mgeller5@gmail.com', 'Monica', 'Geller', 'password12', '678-234-5678', FALSE, TRUE),
('cbing10@gmail.com', 'Chandler', 'Bing', 'password13', '678-345-6789', FALSE, TRUE),
('hwmit@gmail.com', 'Howard', 'Wolowitz', 'password14', '678-456-7890', FALSE, TRUE),
('swilson@gmail.com', 'Samantha', 'Wilson', 'password16', '770-123-4567', FALSE, TRUE),
('aray@tiktok.com', 'Addison', 'Ray', 'password17', '770-234-5678', FALSE, TRUE),
('cdemilio@tiktok.com', 'Charlie', 'Demilio', 'password18', '770-345-6789', FALSE, TRUE),
('bshelton@gmail.com', 'Blake', 'Shelton', 'password19', '770-456-7890', FALSE, TRUE),
('lbryan@gmail.com', 'Luke', 'Bryan', 'password20', '770-567-8901', FALSE, TRUE),
('tswift@gmail.com', 'Taylor', 'Swift', 'password21', '770-678-9012', FALSE, TRUE),
('jseinfeld@gmail.com', 'Jerry', 'Seinfeld', 'password22', '770-789-0123', FALSE, TRUE),
('maddiesmith@gmail.com', 'Madison', 'Smith', 'password23', '770-890-1234', FALSE, TRUE),
('johnthomas@gmail.com', 'John', 'Thomas', 'password24', '404-770-5555', FALSE, TRUE),
('boblee15@gmail.com', 'Bob', 'Lee', 'password25', '404-678-5555', FALSE, TRUE);


DROP TABLE IF EXISTS owner_table;
CREATE TABLE owner_table (
  email char(50) NOT NULL,
  PRIMARY KEY (email),
  CONSTRAINT owner_idfk_1 FOREIGN KEY (email) REFERENCES account_table (email)
) ENGINE=InnoDB;

INSERT INTO owner_table VALUES
('mscott22@gmail.com'),
('arthurread@gmail.com'),
('jwayne@gmail.com'),
('gburdell3@gmail.com'),
('mj23@gmail.com'),
('lebron6@gmail.com'),
('msmith5@gmail.com'),
('ellie2@gmail.com'),
('scooper3@gmail.com'),
('mgeller5@gmail.com'),
('cbing10@gmail.com'),
('hwmit@gmail.com');

DROP TABLE IF EXISTS customer;
CREATE TABLE customer (
  email char(50) NOT NULL,
  cc_number decimal(16,0) NOT NULL,
  cvv decimal(3,0) NOT NULL,
  exp_date date NOT NULL,
  current_location char(50) NULL,
  PRIMARY KEY (email),
  CONSTRAINT customer_idfk_1 FOREIGN KEY (email) REFERENCES account_table (email)
) ENGINE=InnoDB;

INSERT INTO customer VALUES
('scooper3@gmail.com', 6518555974461663, 551, '2024-02-28', NULL),			
('mgeller5@gmail.com', 2328567043101965, 644, '2024-03-31', NULL),			
('cbing10@gmail.com', 8387952398279291, 201, '2023-2-28', NULL),			
('hwmit@gmail.com', 6558859698525299, 102, '2023-04-30', NULL),			
('swilson@gmail.com', 9383321241981836, 455, '2022-08-31', NULL),			
('aray@tiktok.com', 3110266979495605, 744, '2022-08-31', NULL),			
('cdemilio@tiktok.com', 2272355540784744, 606, '2025-02-28', NULL),			
('bshelton@gmail.com', 9276763978834273, 862, '2023-09-30', NULL),			
('lbryan@gmail.com', 4652372688643798, 258, '2023-05-31', NULL),			
('tswift@gmail.com', 5478842044367471, 857, '2024-12-31', NULL),			
('jseinfeld@gmail.com', 3616897712963372, 295, '2022-06-30', NULL),			
('maddiesmith@gmail.com', 9954569863556952, 794, '2022-07-31', NULL),			
('johnthomas@gmail.com', 7580327437245356, 269, '2025-10-31', NULL),			
('boblee15@gmail.com', 7907351371614248, 858, '2025-11-30', NULL);		


DROP TABLE IF EXISTS property;
CREATE TABLE property (
  ownerID char(50) NOT NULL,
  property_name char(50) NOT NULL,
  owner_description text(500) NOT NULL,
  street char(50) NOT NULL,
  city char(50) NOT NULL,
  state char(2) NOT NULL, 
  zip char(5) NOT NULL,
  cost_per_night_per_person int NOT NULL,
  capacity int NOT NULL,
  PRIMARY KEY (ownerID, property_name),
  CONSTRAINT property_ibfk_1 FOREIGN KEY (ownerID) REFERENCES owner_table (email)
) ENGINE=InnoDB;

INSERT INTO property VALUES
('scooper3@gmail.com', 'Atlanta Great Property', 'This is right in the middle of Atlanta near many attractions!', '2nd St', 'ATL', 'GA', 30008, 600, 4),
('gburdell3@gmail.com', 'House near Georgia Tech', 'Super close to bobby dodde stadium!', 'North Ave', 'ATL', 'GA', 30008, 275, 3),
('cbing10@gmail.com', 'New York City Property', 'A view of the whole city. Great property!', '123 Main St', 'NYC', 'NY', 10008, 750, 2),
('mgeller5@gmail.com', 'Statue of Libery Property', 'You can see the statue of liberty from the porch', '1st St', 'NYC', 'NY', 10009, 1000, 5),
('arthurread@gmail.com', 'Los Angeles Property', '', '10th St', 'LA', 'CA', 90008, 700, 3),
('arthurread@gmail.com', 'LA Kings House', 'This house is super close to the LA kinds stadium!', 'Kings St', 'La', 'CA', 90011, 750, 4),
('arthurread@gmail.com', 'Beautiful San Jose Mansion', 'Huge house that can sleep 12 people. Totally worth it!', 'Golden Bridge Pkwt', 'San Jose', 'CA', 90001, 900, 12),
('lebron6@gmail.com', 'LA Lakers Property', 'This house is right near the LA lakers stadium. You might even meet Lebron James!', 'Lebron Ave', 'LA', 'CA', 90011, 850, 4),
('hwmit@gmail.com', 'Chicago Blackhawks House', 'This is a great property!', 'Blackhawks St', 'Chicago', 'IL', 60176, 775, 3),
('mj23@gmail.com', 'Chicago Romantic Getaway', 'This is a great property!', '23rd Main St', 'Chicago', 'IL', 60176, 1050, 2),
('msmith5@gmail.com', 'Beautiful Beach Property', 'You can walk out of the house and be on the beach!', '456 Beach Ave', 'Miami', 'FL', 33101, 975, 2),
('ellie2@gmail.com', 'Family Beach House', 'You can literally walk onto the beach and see it from the patio!', '1132 Beach Ave', 'Miami', 'FL', 33101, 850, 6),
('mscott22@gmail.com', 'Texas Roadhouse', 'This property is right in the center of Dallas, Texas!', '17th Street', 'Dallas', 'TX', 75043, 450, 3),
('mscott22@gmail.com', 'Texas Longhorns House', 'You can walk to the longhorns stadium from here!', '1125 Longhorns Way', 'Dallas', 'TX', 75001, 600, 10);

DROP TABLE IF EXISTS amentites;
CREATE TABLE amentites (
  ownerID char(50) NOT NULL,
  property_name char(50) NOT NULL,
  amentity char(50) NOT NULL,
  PRIMARY KEY (ownerID, property_name, amentity),
  CONSTRAINT amentites_ibfk_1 FOREIGN KEY (ownerID, property_name) REFERENCES property (ownerID, property_name)
) ENGINE=InnoDB;

INSERT INTO amentites VALUES
('scooper3@gmail.com', 'Atlanta Great Property', 'A/C & Heating'),
('scooper3@gmail.com', 'Atlanta Great Property', 'Pets allowed'),
('scooper3@gmail.com', 'Atlanta Great Property', 'Wifi & TV'),
('scooper3@gmail.com', 'Atlanta Great Property', 'Washer and Dryer'),
('gburdell3@gmail.com', 'House near Georgia Tech', 'Wifi & TV'),
('gburdell3@gmail.com', 'House near Georgia Tech', 'Washer and Dryer'),
('gburdell3@gmail.com', 'House near Georgia Tech', 'Full Kitchen'),
('cbing10@gmail.com', 'New York City Property', 'A/C & Heating'),
('cbing10@gmail.com', 'New York City Property', 'Wifi & TV'),
('mgeller5@gmail.com', 'Statue of Libery Property', 'A/C & Heating'),
('mgeller5@gmail.com', 'Statue of Libery Property', 'Wifi & TV'),
('arthurread@gmail.com', 'Los Angeles Property', 'A/C & Heating'),
('arthurread@gmail.com', 'Los Angeles Property', 'Pets allowed'),
('arthurread@gmail.com', 'Los Angeles Property', 'Wifi & TV'),
('arthurread@gmail.com', 'LA Kings House', 'A/C & Heating'),
('arthurread@gmail.com', 'LA Kings House', 'Wifi & TV'),
('arthurread@gmail.com', 'LA Kings House', 'Washer and Dryer'),
('arthurread@gmail.com', 'LA Kings House', 'Full Kitchen'),
('arthurread@gmail.com', 'Beautiful San Jose Mansion', 'A/C & Heating'),
('arthurread@gmail.com', 'Beautiful San Jose Mansion', 'Pets allowed'),
('arthurread@gmail.com', 'Beautiful San Jose Mansion', 'Wifi & TV'),
('arthurread@gmail.com', 'Beautiful San Jose Mansion', 'Washer and Dryer'),
('arthurread@gmail.com', 'Beautiful San Jose Mansion', 'Full Kitchen'),
('lebron6@gmail.com', 'LA Lakers Property', 'A/C & Heating'),
('lebron6@gmail.com', 'LA Lakers Property', 'Wifi & TV'),
('lebron6@gmail.com', 'LA Lakers Property', 'Washer and Dryer'),
('lebron6@gmail.com', 'LA Lakers Property', 'Full Kitchen'),
('hwmit@gmail.com', 'Chicago Blackhawks House', 'A/C & Heating'),
('hwmit@gmail.com', 'Chicago Blackhawks House', 'Wifi & TV'),
('hwmit@gmail.com', 'Chicago Blackhawks House', 'Washer and Dryer'),
('hwmit@gmail.com', 'Chicago Blackhawks House', 'Full Kitchen'),
('mj23@gmail.com', 'Chicago Romantic Getaway', 'A/C & Heating'),
('mj23@gmail.com', 'Chicago Romantic Getaway', 'Wifi & TV'),
('msmith5@gmail.com', 'Beautiful Beach Property', 'A/C & Heating'),
('msmith5@gmail.com', 'Beautiful Beach Property', 'Wifi & TV'),
('msmith5@gmail.com', 'Beautiful Beach Property', 'Washer and Dryer'),
('ellie2@gmail.com', 'Family Beach House', 'A/C & Heating'),
('ellie2@gmail.com', 'Family Beach House', 'Pets allowed'),
('ellie2@gmail.com', 'Family Beach House', 'Wifi & TV'),
('ellie2@gmail.com', 'Family Beach House', 'Washer and Dryer'),
('ellie2@gmail.com', 'Family Beach House', 'Full Kitchen'),
('mscott22@gmail.com', 'Texas Roadhouse', 'A/C & Heating'),
('mscott22@gmail.com', 'Texas Roadhouse', 'Pets allowed'),
('mscott22@gmail.com', 'Texas Roadhouse', 'Wifi & TV'),
('mscott22@gmail.com', 'Texas Roadhouse', 'Washer and Dryer'),
('mscott22@gmail.com', 'Texas Longhorns House', 'A/C & Heating'),
('mscott22@gmail.com', 'Texas Longhorns House', 'Pets allowed'),
('mscott22@gmail.com', 'Texas Longhorns House', 'Wifi & TV'),
('mscott22@gmail.com', 'Texas Longhorns House', 'Washer and Dryer'),
('mscott22@gmail.com', 'Texas Longhorns House', 'Full Kitchen');


DROP TABLE IF EXISTS airline;
CREATE TABLE airline (
  airline_name char(50) NOT NULL,
  rating decimal(2,1) NOT NULL,
  PRIMARY KEY (airline_name)
) ENGINE=InnoDB;

INSERT INTO airline VALUES
('Delta Airlines', 4.7),
('Southwest Airlines', 4.4),
('American Airlines', 4.6),
('United Airlines', 4.2),
('JetBlue Airways', 3.6),
('Spirit Airlines', 3.3),
('WestJet', 3.9),
('Interjet', 3.7);

DROP TABLE IF EXISTS airport;
CREATE TABLE airport (
  airportID char(3) NOT NULL,
  airport_name char(50) NOT NULL,
  street char(50) NOT NULL,
  city char(50) NOT NULL,
  state char(2) NOT NULL, 
  zip char(5) NOT NULL,
  time_zone char(3) NOT NULL,
  PRIMARY KEY (airportID)
) ENGINE=InnoDB;

INSERT INTO airport VALUES
('ATL', 'Atlanta Hartsfield Jackson Airport', '6000 N Terminal Pkwy', 'Atlanta', 'GA', '30320', 'EST'),
('JFK', 'John F Kennedy International Airport', '455 Airport Ave', 'Queens', 'NY', '11430', 'EST'),
('LGA', 'Laguardia Airport', '790 Airport St', 'Queens', 'NY', '11371', 'EST'),
('LAX', 'Lost Angeles International Airport', '1 World Way', 'Los Angeles', 'CA', '90045', 'PST'),
('SJC', 'Norman Y. Mineta San Jose International Airport', '1702 Airport Blvd', 'San Jose', 'CA', '95110', 'PST'),
('ORD', "O' Hare International Airport", "10000 W O'Hare Ave", 'Chicago', 'IL', '60666', 'CST'),
('MIA', 'Miami International Airport', '2100 NW 42nd Ave', 'Miami', 'FL', '33126', 'EST'),
('DFW', 'Dallas International Airport', '2400 Aviation DR', 'Dallas', 'TX', '75261', 'CST');

DROP TABLE IF EXISTS attractions;
CREATE TABLE attractions (
	airportID char(3) NOT NULL,
	attraction_name char(50) NOT NULL,
	PRIMARY KEY (airportID, attraction_name),
	CONSTRAINT attractions_ibfk_1 FOREIGN KEY (airportID) REFERENCES airport (airportID)
) ENGINE=InnoDB;

INSERT INTO attractions VALUES
('ATL','The Coke Factory'),
('ATL','The Georgia Aquarium'),
('JFK','The Statue of Liberty'),
('JFK','The Empire State Building'),
('LGA','The Statue of Liberty'),
('LGA','The Empire State Building'),
('LAX','Lost Angeles Lakers Stadium'),
('LAX','Los Angeles Kings Stadium'),
('SJC','Winchester Mystery House'),
('SJC','San Jose Earthquakes Soccer Team'),
('ORD','Chicago Blackhawks Stadium'),
('ORD','Chicago Bulls Stadium'),
('MIA','Crandon Park Beach'),
('MIA','Miami Heat Basketball Stadium'),
('DFW','Texas Longhorns Stadium'),
('DFW','The Original Texas Roadhouse');


DROP TABLE IF EXISTS flight;
CREATE TABLE flight(
  airline_name char(50) NOT NULL,
  flight_number char(5) NOT NULL,  
  departure_time char(50) NOT NULL, 
  arrival_time char(50) NOT NULL, 
  flight_date date NOT NULL,
  cost_per_seat int NOT NULL,
  capacity int NOT NULL,
  departure_from char(3) NOT NULL,
  arrive_to char(3) NOT NULL,
  PRIMARY KEY (airline_name, flight_number),
  CONSTRAINT flight_idfk_1 FOREIGN KEY (airline_name) REFERENCES airline (airline_name),
  CONSTRAINT flight_idfk_2 FOREIGN KEY (departure_from) REFERENCES airport (airportID),
  CONSTRAINT flight_idfk_3 FOREIGN KEY (arrive_to) REFERENCES airport (airportID)
) ENGINE=InnoDB;

INSERT INTO flight VALUES
('Delta Airlines','1', '10:00 AM','12:00 PM', '2021-10-18', 400, 150, 'ATL', 'JFK'),
('Southwest Airlines', '2', '10:30 AM', '2:30 PM', '2021-10-18', 350, 125, 'ORD', 'MIA'),
('American Airlines', '3',  '1:00 PM', '4:00 PM', '2021-10-18', 350, 125, 'MIA', 'DFW'),
('United Airlines', '4', '4:30 PM', '6:30 PM', '2021-10-18', 400, 100, 'ATL', 'LGA'),
('JetBlue Airways', '5', '11:00 AM', '1:00 PM', '2021-10-19', 400, 130, 'LGA', 'ATL'),
('Spirit Airlines', '6', '12:30 PM', '9:30 PM', '2021-10-19', 650, 140, 'SJC', 'ATL'),
('WestJet', '7', '1:00 PM', '4:00 PM', '2021-10-19', 700, 100, 'LGA', 'SJC'),
('Interjet', '8', '7:30 PM', '9:30 PM', '2021-10-19', 350, 125, 'MIA', 'ORD'),
('Delta Airlines', '9', '8:00 AM', '10:00 AM', '2021-10-20', 375, 150, 'JFK', 'ATL'),
('Delta Airlines', '10', '9:15 AM', '6:15 PM', '2021-10-20', 700, 110, 'LAX', 'ATL'),
('Southwest Airlines', '11', '12:07 PM', '7:07 PM', '2021-10-20', 600, 95, 'LAX', 'ORD'),
('United Airlines', '12', '3:35 PM', '5:35 PM', '2021-10-20', 275, 115, 'MIA', 'ATL');



DROP TABLE IF EXISTS book;
CREATE TABLE book (
  customerID char(50) NOT NULL,
  airport_name char(50) NOT NULL,
  flight_number char(5) NOT NULL,
  number_of_seats int NOT NULL,
  PRIMARY KEY (customerID, airport_name, flight_number),
  CONSTRAINT book_idfk_1 FOREIGN KEY (customerID) REFERENCES customer (email),
  CONSTRAINT book_idfk_2 FOREIGN KEY (airport_name, flight_number) REFERENCES flight (airline_name, flight_number)
) ENGINE=InnoDB;

INSERT INTO book VALUES
('swilson@gmail.com', 'JetBlue Airways', '5', 3),
('aray@tiktok.com', 'Delta Airlines', '1', 2),
('bshelton@gmail.com', 'United Airlines', '4', 4),
('lbryan@gmail.com', 'WestJet', '7', 2),
('tswift@gmail.com', 'WestJet', '7', 2),
('jseinfeld@gmail.com', 'WestJet', '7', 4),
('maddiesmith@gmail.com', 'Interjet', '8', 2),
('cbing10@gmail.com', 'Southwest Airlines', '2', 2),
('hwmit@gmail.com', 'Southwest Airlines', '2', 5);


DROP TABLE IF EXISTS rates;
CREATE TABLE rates (
  ownerID char(50) NOT NULL,
  customerID char(50) NOT NULL,
  score decimal(1,0) NOT NULL,
  owner_rates_customer bool NOT NULL,
  PRIMARY KEY (ownerID, customerID, owner_rates_customer),
  CONSTRAINT rates_ibfk_1 FOREIGN KEY (ownerID) REFERENCES owner_table (email),
  CONSTRAINT rates_ibfk_2 FOREIGN KEY (customerID) REFERENCES customer (email)
) ENGINE=InnoDB;

INSERT INTO rates VALUES
('gburdell3@gmail.com', 'swilson@gmail.com', 5, TRUE),
('cbing10@gmail.com', 'aray@tiktok.com', 5, TRUE),
('mgeller5@gmail.com', 'bshelton@gmail.com', 3, TRUE),
('arthurread@gmail.com', 'lbryan@gmail.com', 4, TRUE),
('arthurread@gmail.com', 'tswift@gmail.com', 4, TRUE),
('lebron6@gmail.com', 'jseinfeld@gmail.com', 1, TRUE),
('hwmit@gmail.com', 'maddiesmith@gmail.com', 2, TRUE),

('gburdell3@gmail.com', 'swilson@gmail.com', 5, FALSE),
('cbing10@gmail.com', 'aray@tiktok.com', 5, FALSE),
('mgeller5@gmail.com', 'bshelton@gmail.com', 4, FALSE),
('arthurread@gmail.com', 'lbryan@gmail.com', 4, FALSE),
('arthurread@gmail.com', 'tswift@gmail.com', 3, FALSE),
('lebron6@gmail.com', 'jseinfeld@gmail.com', 2, FALSE),
('hwmit@gmail.com', 'maddiesmith@gmail.com', 5, FALSE);





DROP TABLE IF EXISTS review;
CREATE TABLE review (
  ownerID char(50) NOT NULL,
  property_name char(50) NOT NULL,
  customerID char(50) NOT NULL,
  score decimal(1,0) NOT NULL, 
  content text(500) NOT NULL,
  PRIMARY KEY (ownerID, property_name,customerID),
  CONSTRAINT review_ibfk_1 FOREIGN KEY (ownerID, property_name) REFERENCES property (ownerID, property_name),
  CONSTRAINT review_ibfk_2 FOREIGN KEY (customerID) REFERENCES customer (email)
) ENGINE=InnoDB;

INSERT INTO review VALUES
('gburdell3@gmail.com', 'House near Georgia Tech', 'swilson@gmail.com', 5, 'This was so much fun. I went and saw the coke factory, the falcons play, GT play, and the Georgia aquarium. Great time! Would highly recommend!'),
('cbing10@gmail.com', 'New York City Property', 'aray@tiktok.com', 5, 'This was the best 5 days ever! I saw so much of NYC!'),
('mgeller5@gmail.com', 'Statue of Libery Property', 'bshelton@gmail.com', 4, 'This was truly an excellent experience. I really could see the Statue of Liberty from the property!'),
('arthurread@gmail.com', 'Los Angeles Property', 'lbryan@gmail.com', 4, 'I had an excellent time!'),
('arthurread@gmail.com', 'Beautiful San Jose Mansion', 'tswift@gmail.com', 3, 'We had a great time, but the house wasn\'t fully cleaned when we arrived'),
('lebron6@gmail.com', 'LA Lakers Property', 'jseinfeld@gmail.com', 2, 'I was disappointed that I did not meet lebron james'),
('hwmit@gmail.com', 'Chicago Blackhawks House', 'maddiesmith@gmail.com', 5, 'This was awesome! I met one player on the chicago blackhawks!');


DROP TABLE IF EXISTS reserve;
CREATE TABLE reserve (
	ownerID char(50) NOT NULL,
  	property_name char(50) NOT NULL,
  	customerID char(50) NOT NULL,
  	start_date date NOT NULL,
  	end_date date NOT NULL,
  	guests_number int NOT NULL,
  PRIMARY KEY (ownerID, property_name, customerID),
  CONSTRAINT reserve_ibfk_1 FOREIGN KEY (ownerID, property_name) REFERENCES property (ownerID, property_name),
  CONSTRAINT reserve_ibfk_2 FOREIGN KEY (customerID) REFERENCES customer (email)
) ENGINE=InnoDB;

INSERT INTO reserve VALUES
('gburdell3@gmail.com', 'House near Georgia Tech', 'swilson@gmail.com', '2021-10-19', '2021-10-25', 3),
('cbing10@gmail.com', 'New York City Property', 'aray@tiktok.com', '2021-10-18', '2021-10-23', 2),
('cbing10@gmail.com', 'New York City Property', 'cdemilio@tiktok.com', '2021-10-24', '2021-10-30', 2),
('mgeller5@gmail.com', 'Statue of Libery Property', 'bshelton@gmail.com', '2021-10-18', '2021-10-22', 4),
('arthurread@gmail.com', 'Los Angeles Property', 'lbryan@gmail.com', '2021-10-19', '2021-10-25', 2),
('arthurread@gmail.com', 'Beautiful San Jose Mansion', 'tswift@gmail.com', '2021-10-19', '2021-10-22', 10),
('lebron6@gmail.com', 'LA Lakers Property', 'jseinfeld@gmail.com', '2021-10-19', '2021-10-24', 4),
('hwmit@gmail.com', 'Chicago Blackhawks House', 'maddiesmith@gmail.com', '2021-10-19', '2021-10-23', 2),
('mj23@gmail.com', 'Chicago Romantic Getaway', 'aray@tiktok.com', '2021-11-01', '2021-11-07', 2),
('msmith5@gmail.com', 'Beautiful Beach Property', 'cbing10@gmail.com', '2021-10-18', '2021-10-25', 2),
('ellie2@gmail.com', 'Family Beach House', 'hwmit@gmail.com', '2021-10-18', '2021-10-28', 5);


DROP TABLE IF EXISTS isCloseTo;
CREATE TABLE isCloseTo (
  ownerID char(50) NOT NULL,
  property_name char(50) NOT NULL,
  airport char(3) NOT NULL,
  distance int NOT NULL,
  PRIMARY KEY (ownerID, property_name, airport),
  CONSTRAINT isCloseTo_ibfk_1 FOREIGN KEY (ownerID, property_name) REFERENCES property (ownerID, property_name),
  CONSTRAINT isCloseTo_ibfk_2 FOREIGN KEY (airport) REFERENCES airport (airportID)
) ENGINE=InnoDB;

INSERT INTO isCloseTo VALUES
('scooper3@gmail.com', 'Atlanta Great Property', 'ATL', 12),
('gburdell3@gmail.com', 'House near Georgia Tech', 'ATL', 7),
('cbing10@gmail.com', 'New York City Property', 'JFK', 10),
('mgeller5@gmail.com', 'Statue of Libery Property', 'JFK', 8),
('cbing10@gmail.com', 'New York City Property', 'LGA', 25),
('mgeller5@gmail.com', 'Statue of Libery Property', 'LGA', 19),
('arthurread@gmail.com', 'Los Angeles Property', 'LAX', 9),
('arthurread@gmail.com', 'LA Kings House', 'LAX', 12),
('arthurread@gmail.com', 'Beautiful San Jose Mansion', 'SJC', 8),
('arthurread@gmail.com', 'Beautiful San Jose Mansion', 'LAX', 30),
('lebron6@gmail.com', 'LA Lakers Property', 'LAX', 6),
('hwmit@gmail.com', 'Chicago Blackhawks House', 'ORD', 11),
('mj23@gmail.com', 'Chicago Romantic Getaway', 'ORD', 13),
('msmith5@gmail.com', 'Beautiful Beach Property', 'MIA', 21),
('ellie2@gmail.com', 'Family Beach House', 'MIA', 19),
('mscott22@gmail.com', 'Texas Roadhouse', 'DFW', 8),
('mscott22@gmail.com', 'Texas Longhorns House', 'DFW', 17);


