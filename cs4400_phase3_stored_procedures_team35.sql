-- CS4400: Introduction to Database Systems (Fall 2021)
-- Phase III: Stored Procedures & Views [v0] Tuesday, November 9, 2021 @ 12:00am EDT
-- Team 35
-- Team Member Name htan74
-- Team Member Name xhe340
-- Team Member Name xnie40
-- Team Member Name zli938
-- Directions:
-- Please follow all instructions for Phase III as listed on Canvas.
-- Fill in the team number and names and GT usernames for all members above.


-- ID: 1a
-- Name: register_customer
drop procedure if exists register_customer;
delimiter //
create procedure register_customer (
    in i_email varchar(50),
    in i_first_name varchar(100),
    in i_last_name varchar(100),
    in i_password varchar(50),
    in i_phone_number char(12),
    in i_cc_number varchar(19),
    in i_cvv char(3),
    in i_exp_date date,
    in i_location varchar(50)
) 
sp_main: begin
-- TODO: Implement your solution here
-- judge if the new customer is unique in the system
# if customer did not exist in the database
if (i_email in (select Email from Customer)) or (i_email in (select Email from Clients)) or (i_email in (select Email from Accounts) )
    then leave sp_main; end if;
-- judge if the ccv number is unique in customer table
if i_cc_number in (select CcNumber from Customer)
    then leave sp_main; end if;
-- judge if the phone number is unique in customer table
if i_phone_number in (select Phone_Number from Customer c join Clients cl on c.Email=cl.Email)
    then leave sp_main; 
end if;

-- judge if the new added customer already exists as an account and client
-- which means that the new added customer already exists as an owner
if i_email in (select o.Email from Owners o)
then insert into Customer values (i_email,i_cc_number, i_cvv,i_exp_date,i_location);
end if;

-- if the new added customer did not exists in the system
-- we need to add it into account, client, customer
insert into Accounts values (i_email,i_first_name,i_last_name,i_password);
insert into Clients values(i_email,i_phone_number);
insert into Customer values(i_email,i_cc_number, i_cvv,i_exp_date,i_location);

end //
delimiter ;



-- ID: 1b
-- Name: register_owner
drop procedure if exists register_owner;
delimiter //
create procedure register_owner (
    in i_email varchar(50),
    in i_first_name varchar(100),
    in i_last_name varchar(100),
    in i_password varchar(50),
    in i_phone_number char(12)
) 
sp_main: begin
-- TODO: Implement your solution here
-- judge if the new owner is unique in the system
if (i_email in (select Email from Owners)) or (i_email in (select Email from Clients)) or (i_email in (select Email from Accounts) )
    then leave sp_main; end if;
-- judge if the new owner's phone number will be unique
if i_phone_number in (select Phone_Number from Owners o join Clients cl on o.Email=cl.Email)
    then leave sp_main; 
end if;

-- judge if the new added owner already exists as an account and client
-- which means that the new added customer already exists as an customer
if i_email in (select c.Email from Customer c)
    then insert into Owners values (i_email);
end if;

-- if the new added owner did not exists in the system
-- we need to add it into account, client, owner
insert into Accounts values (i_email,i_first_name,i_last_name,i_password);
insert into Clients values(i_email,i_phone_number);
insert into Owners values(i_email);

end //
delimiter ;



-- ID: 1c
-- Name: remove_owner
drop procedure if exists remove_owner;
delimiter //
create procedure remove_owner ( 
    in i_owner_email varchar(50)
)
sp_main: begin
-- TODO: Implement your solution here
-- if the owner has properties, jump out
if i_owner_email in (select Owner_Email from Property)
    then leave sp_main;
end if;

-- remove the customer reviews of the owner(child)
delete from Review where Owner_Email=i_owner_email;

-- remove the owner from owner table(parent)
delete from Owners where Email=i_owner_email;

-- if the owner is not the customer,
-- then also delete the owner information from the client and account tables
if i_owner_email not in (select Email from Customer)
    then 
    delete from Clients where Email=i_owner_email;
    delete from Accounts where Email=i_owner_email; 
end if;

end //
delimiter ;



-- ID: 2a
-- Name: schedule_flight
drop procedure if exists schedule_flight;
delimiter //
create procedure schedule_flight (
    in i_flight_num char(5),
    in i_airline_name varchar(50),
    in i_from_airport char(3),
    in i_to_airport char(3),
    in i_departure_time time,
    in i_arrival_time time,
    in i_flight_date date,
    in i_cost decimal(6, 2),
    in i_capacity int,
    in i_current_date date
)
sp_main: begin
-- TODO: Implement your solution here
-- if the new flight numbers and airlines'name is not unique, jump out
if (i_flight_num,i_airline_name) in (select Flight_Num,Airline_Name from Flight)
    then leave sp_main; 
end if;
-- if to_airport is the same as the from_airport, jump out
if i_from_airport=i_to_airport
    then leave sp_main; 
end if;
-- if the flight date the not in the future, jump out
if (select Flight_Date from Flight where Flight_Num=i_flight_num and Airline_Name=i_airline_name) < i_current_date
    then leave sp_main; 
end if;

-- schedule the flight
insert into Flight values(i_flight_num,i_airline_name,i_from_airport,i_to_airport,i_departure_time,i_arrival_time,i_flight_date,i_cost,i_capacity);


end //
delimiter ;




-- ID: 2b
-- Name: remove_flight
drop procedure if exists remove_flight;
delimiter //
create procedure remove_flight ( 
    in i_flight_num char(5),
    in i_airline_name varchar(50),
    in i_current_date date
) 
sp_main: begin
-- TODO: Implement your solution here
-- if this flight has already departured, jump out
if (select Flight_Date from Flight where Flight_Num=i_flight_num and Airline_Name=i_airline_name) < i_current_date
    then leave sp_main; 
end if;

-- delete the booking related to this flight(child)
delete from Book where Flight_Num=i_flight_num and Airline_Name=i_airline_name;
-- delete the flights from the Flight table(parent)
delete from Flight where Flight_Num=i_flight_num and Airline_Name=i_airline_name;

end //
delimiter ;




-- ID: 3a
-- Name: book_flight
drop procedure if exists book_flight;
delimiter //
create procedure book_flight (
    in i_customer_email varchar(50),
    in i_flight_num char(5),
    in i_airline_name varchar(50),
    in i_num_seats int,
    in i_current_date date
)
sp_main: begin
-- TODO: Implement your solution here
-- if the remaining seats are not enough, jump out
set @capacity = (select Capacity from Flight where Flight_Num=i_flight_num and Airline_Name=i_airline_name);
set @reserved_seats = (select Num_Seats from Book where Customer=i_customer_email and Flight_Num=i_flight_num and Airline_Name= i_airline_name and Was_Cancelled=false);
set @left_seat = @capacity - @reserved_seats;

# if the number of seats left on the flight is less than then i_num_seats, jump out
if @left_seat < i_num_seats
then leave sp_main; end if;

-- if the flight date the not in the future, jump out
if (select Flight_Date from Flight where Flight_Num=i_flight_num and Airline_Name=i_airline_name) < i_current_date
then leave sp_main; end if;

-- if the customer has already booked another non-cancelled flight, jump out
if (select Flight_Num from Book where Customer=i_customer_email and Was_Cancelled=0) is not null and (select Flight_Num from Book where Customer=i_customer_email and Was_Cancelled=0) != i_flight_num
then leave sp_main; end if;

-- if the customer has already booked the same flight
if (select Flight_Num from Book where Customer=i_customer_email and Was_Cancelled=0)=i_flight_num
then 
	update Book b
	set b.Num_Seats = @reserved_seats + i_num_seats
	where b.Customer = i_customer_email and b.Flight_Num=i_flight_num and b.Airline_Name=i_airline_name;
end if;

insert into Book values(i_customer_email,i_flight_num,i_airline_name,i_num_seats,0);

end //
delimiter ;




-- ID: 3b
-- Name: cancel_flight_booking
drop procedure if exists cancel_flight_booking;
delimiter //
create procedure cancel_flight_booking ( 
    in i_customer_email varchar(50),
    in i_flight_num char(5),
    in i_airline_name varchar(50),
    in i_current_date date
)
sp_main: begin
-- TODO: Implement your solution here

-- judge if the booking flight exists
if (select b.Customer from Book b where b.Customer=i_customer_email and b.Flight_Num=i_flight_num and b.Airline_Name=i_airline_name) is null
then leave sp_main; end if;
-- judge if the date is in the future
if (select f.Flight_Date from Flight f where f.Flight_Num = i_flight_num) < i_current_date
then leave sp_main; end if;


-- delete the booking flights
update Book b
set b.Was_Cancelled = true 
where b.Customer = i_customer_email;

end //
delimiter ;



-- ID: 3c
-- Name: view_flight
create or replace view view_flight (
    flight_id,
    flight_date,
    airline,
    destination,
    seat_cost,
    num_empty_seats,
    total_spent
) as
-- TODO: replace this select query with your solution
SELECT 
    Flight.Flight_Num AS flight_id,
    Flight_Date AS flight_date,
    Flight.Airline_Name AS airline,
    To_Airport AS destination,
    Cost AS seat_cost,
    Capacity - IFNULL(booked, 0) AS num_empty_seats,
    Cost * (IFNULL(booked, 0) + 0.2*IFNULL(cancelled, 0) ) AS total_spent
FROM
    Flight
        LEFT JOIN
    (SELECT 
        sum(if(Was_Cancelled,0,Num_Seats)) AS booked,sum(if(Was_Cancelled,Num_Seats,0)) as cancelled, Flight_num, Airline_Name
    FROM
        Book
    GROUP BY Flight_num , Airline_Name) AS temp_book ON Flight.Flight_Num = temp_book.Flight_Num
        AND Flight.Airline_Name = temp_book.Airline_Name;



-- ID: 4a
-- Name: add_property
drop procedure if exists add_property;
delimiter //
create procedure add_property (
    in i_property_name varchar(50),
    in i_owner_email varchar(50),
    in i_description varchar(500),
    in i_capacity int,
    in i_cost decimal(6, 2),
    in i_street varchar(50),
    in i_city varchar(50),
    in i_state char(2),
    in i_zip char(5),
    in i_nearest_airport_id char(3),
    in i_dist_to_airport int
) 
sp_main: begin
-- TODO: Implement your solution here
-- if the property's address is not unique, jump out
if (i_street,i_city,i_state,i_zip) in (select Street,City,State,Zip from Property)
then leave sp_main; end if;

-- if the combination of property's name and owner's email is not unique, jump out
if (i_property_name,i_owner_email) in (select Property_Name,Owner_Email from Property)
then leave sp_main; end if;

-- add the new property into the Property table regardless the nearest_airport_id
insert into Property values(i_property_name,i_owner_email,i_description,i_capacity,i_cost,i_street,i_city,i_state,i_zip);

-- if the nearest_airpoert_id exists in the system, then also create an entry to nearest_airport_id
if i_nearest_airport_id in (select Airport_Id from Airport)
then insert Is_Close_To values(i_property_name,i_owner_email,i_nearest_airport_id,i_dist_to_airport);
end if;

end //
delimiter ;



-- ID: 4b
-- Name: remove_property
drop procedure if exists remove_property;
delimiter //
create procedure remove_property (
    in i_property_name varchar(50),
    in i_owner_email varchar(50),
    in i_current_date date
)
sp_main: begin
-- TODO: Implement your solution here

-- if this property is reserved for the current date, jump out
if (select Start_Date from (select Start_Date,End_Date from Reserve 
where Property_Name=i_property_name and Owner_Email=i_owner_email and Was_Cancelled = false
and i_current_date between Start_Date and End_Date) as reserve_date) is not null
then leave sp_main; end if;

-- delete all the past and future reservation
delete from Reserve where Property_Name=i_property_name and Owner_Email=i_owner_email;

-- delete all the reviews for the property
delete from Review where Property_Name=i_property_name and Owner_Email=i_owner_email;

-- delete all the amenities
delete from Amenity where Property_Name=i_property_name and Property_Owner=i_owner_email;

-- delete all the information for the nearby airports
delete from Is_Close_To where Property_Name=i_property_name and Owner_Email=i_owner_email;

-- delete the property finally
delete from Property where Property_Name=i_property_name and Owner_Email=i_owner_email;

end //
delimiter ;



-- ID: 5a
-- Name: reserve_property
drop procedure if exists reserve_property;
delimiter //
create procedure reserve_property (
    in i_property_name varchar(50),
    in i_owner_email varchar(50),
    in i_customer_email varchar(50),
    in i_start_date date,
    in i_end_date date,
    in i_num_guests int,
    in i_current_date date
)

/*
• The combination of property_name, owner_email, and customer_email should be unique in the system
• The start date of the reservation should be in the future (use current date for comparison)
• The guest has not already reserved a property that overlaps with the dates of this reservation
• The available capacity for the property during the span of dates must be greater than or equal to i_num_guests during the span of dates provided
• Note: for simplicity, the available capacity of a property over a span of time will be defined as the capacity of the property minus the total number of guests staying at that property during that span of time
*/
sp_main: begin
-- TODO: Implement your solution here
-- if the combination of property_name,owner_email, and customer_eamil is not unique, jump out
if (i_property_name,i_owner_email,i_customer_email) in (select Property_Name,Owner_Email,Customer from Reserve)
    then leave sp_main; 
end if;
-- the start date of the reservation is not in the future
if i_start_date <= i_current_date
    then leave sp_main; 
end if;
-- the guest already reserved a property overlaps with the dates of this reservation
set @reserve_start = (select Start_Date from Reserve where Customer=i_customer_email and Was_Cancelled = false);
set @reserve_end = (select End_Date from Reserve where Customer=i_customer_email and Was_Cancelled = false);
if @reserve_start <= i_end_date and i_start_date <= @reserve_end
then leave sp_main; end if;
-- if the capacity is not enough
if i_num_guests >= (select Capacity from Property where i_property_name = Property_Name and i_owner_email = Owner_Email)
 then leave sp_main;
end if;

INSERT INTO Reserve VALUES (i_property_name, i_owner_email, i_customer_email, i_start_date, i_end_date, i_num_guests, 0);

end //
delimiter ;



-- ID: 5b
-- Name: cancel_property_reservation
drop procedure if exists cancel_property_reservation;
delimiter //
create procedure cancel_property_reservation (
    in i_property_name varchar(50),
    in i_owner_email varchar(50),
    in i_customer_email varchar(50),
    in i_current_date date
)
sp_main: begin
-- TODO: Implement your solution here
-- if this customer did not reserve this property, jump out
if (i_property_name,i_owner_email,i_customer_email) not in (select Property_Name,Owner_Email,Customer from Reserve)
then leave sp_main; end if;

-- if this property has been cancel already, jump out
if (select Was_Cancelled from Reserve where Property_Name=i_property_name and Owner_Email=i_owner_email and Customer=i_customer_email)=true
then leave sp_main; end if;

-- the date of the reservation is not in the future, jump out
if (select Start_Date from Reserve where Property_Name=i_property_name and Owner_Email=i_owner_email and Customer=i_customer_email) < i_current_date
then leave sp_main; end if;


-- delete the reservation
update Reserve r
set r.Was_Cancelled = true 
where Property_Name=i_property_name and Owner_Email=i_owner_email and Customer=i_customer_email;

end //
delimiter ;



-- ID: 5c
-- Name: customer_review_property
drop procedure if exists customer_review_property;
delimiter //
create procedure customer_review_property (
    in i_property_name varchar(50),
    in i_owner_email varchar(50),
    in i_customer_email varchar(50),
    in i_content varchar(500),
    in i_score int,
    in i_current_date date
)
sp_main: begin
-- TODO: Implement your solution here
-- if the reservation has been cancelled, jump out
if (select Was_Cancelled from Reserve where Property_Name=i_property_name and Owner_Email=i_owner_email and Customer=i_customer_email)=true
then leave sp_main; end if;
-- if current date is before than the start date of the reservation, jump out
if (select Start_Date from Reserve where Property_Name=i_property_name and Owner_Email=i_owner_email and Customer=i_customer_email) > i_current_date
then leave sp_main; end if;
-- if the combination of property_name, owner_email, and customer_email is not unique
if (i_property_name,i_owner_email,i_customer_email) in (select Property_Name,Owner_Email,Customer from Review)
then leave sp_main; end if;

-- create the review
insert Review values(i_property_name,i_owner_email,i_customer_email,i_content,i_score);

end //
delimiter ;



-- ID: 5d
-- Name: view_properties
create or replace view view_properties (
    property_name,
    average_rating_score, 
    description, 
    address, 
    capacity, 
    cost_per_night
) as
-- TODO: replace this select query with your solution
SELECT 
        Property.Property_Name AS property_name,
        average_rating_score,
        Descr AS 'description',
        CONCAT_WS(', ', Street, City, State, Zip) AS address,
        Capacity AS capacity,
        Cost AS cost_per_nighview_propertiesview_propertiest
    FROM
        Property
            LEFT JOIN
        (SELECT 
            AVG(score) average_rating_score, Property_Name, Owner_Email
        FROM
            Review
        GROUP BY Property_Name , Owner_Email) AS temp_score ON Property.Property_Name = temp_score.Property_Name
            AND Property.Owner_Email = temp_score.Owner_Email;


-- ID: 5e
-- Name: view_individual_property_reservations
drop procedure if exists view_individual_property_reservations;
delimiter //
create procedure view_individual_property_reservations (
    in i_property_name varchar(50),
    in i_owner_email varchar(50)
)
sp_main: begin
    drop table if exists view_individual_property_reservations;
    create table view_individual_property_reservations (
        property_name varchar(50),
        start_date date,
        end_date date,
        customer_email varchar(50),
        customer_phone_num char(12),
        total_booking_cost decimal(6,2),
        rating_score int,
        review varchar(500)
    ) as
    -- TODO: replace this select query with your solution
    -- if i_property_name not in (select Property_Name from Property) or i_owner_email not in (select Email from Owners)
 -- then leave sp_main;
    -- end if;
    -- select Property_Name as name, Start_Date as start_date, End_Date as end_date, Customer as customer_eamil, Phone_Number as customer_phone_num,
    -- from Property join Clients on Reserve.Customer = Clients.Email

    select subset_property.Property_Name as property_name, start_date, end_date, Reserve.Customer as customer_email,Phone_Number as customer_phone_num, (datediff(end_date, start_date) + 1)*cost*if(was_cancelled,0.2,1) as total_booking_cost, Score as rating_score, content as review from
    (select Property_Name, Owner_Email,cost from Property where Property_Name = i_property_name and Owner_Email = i_owner_email) as subset_property
    join Reserve on subset_property.Property_Name = Reserve.Property_Name and subset_property.Owner_Email = Reserve.Owner_Email
    join Clients on Clients.email = Reserve.Customer 
    left join Review on subset_property.Property_Name = Review.Property_Name and subset_property.Owner_Email = Review.Owner_Email and Reserve.Customer = Review.Customer;

    select * from view_individual_property_reservations;

end //
delimiter ;



-- ID: 6a
-- Name: customer_rates_owner
drop procedure if exists customer_rates_owner;
delimiter //
create procedure customer_rates_owner (
    in i_customer_email varchar(50),
    in i_owner_email varchar(50),
    in i_score int,
    in i_current_date date
)
sp_main: begin
-- TODO: Implement your solution here
# if the customer has not stayed at the property owned by the owner or the reserve has been cancelled, jump out
if ((i_customer_email,i_owner_email) not in (select Customer,Owner_Email from Reserve)) or (select Was_Cancelled from Reserve where i_customer_email = Customer and i_owner_email = Owner_Email)= true
    then leave sp_main; end if;
# if the date is not past, jump out
if (select Start_Date from Reserve where i_customer_email = Customer and i_owner_email = Owner_Email) > i_current_date
    then leave sp_main; end if;
# if customer did not exist in the database
if (i_customer_email not in (select Email from Customer)) or (i_customer_email not in (select Email from Clients)) or (i_customer_email not in (select Email from Accounts) )
    then leave sp_main; end if;
# if owner did not exist in the database
if (i_owner_email not in (select Email from Owners)) or (i_owner_email not in (select Email from Clients)) or (i_owner_email not in (select Email from Accounts) )
    then leave sp_main; end if;
# if the combination of the customer_email and owner_email is not unique in customers_rate_owners table
if ((i_customer_email,i_owner_email) in (select Customer,Owner_Email from Customers_Rate_Owners))
    then leave sp_main; end if;
    
# insert the new rate into the customers_rate_owners table
insert into Customers_Rate_Owners values (i_customer_email,i_owner_email,i_score);
end //
delimiter ;



-- ID: 6b
-- Name: owner_rates_customer
drop procedure if exists owner_rates_customer;
delimiter //
create procedure owner_rates_customer (
    in i_owner_email varchar(50),
    in i_customer_email varchar(50),
    in i_score int,
    in i_current_date date
)
sp_main: begin
-- TODO: Implement your solution here
# if the customer has not stayed at the property owned by the owner or the reserve has been cancelled, jump out
if ((i_customer_email,i_owner_email) not in (select Customer,Owner_Email from Reserve)) or (select Was_Cancelled from Reserve where i_customer_email = Customer and i_owner_email = Owner_Email)= true
    then leave sp_main; end if;
# if the date is not past, jump out
if (select Start_Date from Reserve where i_customer_email = Customer and i_owner_email = Owner_Email) > i_current_date
    then leave sp_main; end if;
# if customer did not exist in the database
if (i_customer_email not in (select Email from Customer)) or (i_customer_email not in (select Email from Clients)) or (i_customer_email not in (select Email from Accounts) )
    then leave sp_main; end if;
# if owner did not exist in the database
if (i_owner_email not in (select Email from Owners)) or (i_owner_email not in (select Email from Clients)) or (i_owner_email not in (select Email from Accounts) )
    then leave sp_main; end if;
# if the combination of the customer_email and owner_email is not unique in customers_rate_owners table
if ((i_customer_email,i_owner_email) in (select Customer,Owner_Email from Customers_Rate_Owners))
    then leave sp_main; end if;

# insert the new rate into the customers_rate_owners table
insert into Owners_Rate_Customers values (i_owner_email,i_customer_email,i_score);
end //
delimiter ;



-- ID: 7a
-- Name: view_airports
create or replace view view_airports (
    airport_id, 
    airport_name, 
    time_zone, 
    total_arriving_flights, 
    total_departing_flights, 
    avg_departing_flight_cost
) as
-- TODO: replace this select query with your solution    
SELECT 
        Airport_Id AS airport_id,
        Airport_Name AS airport_name,
        Time_Zone AS time_zone,
        IFNULL(total_ariving_flights, 0) AS total_ariving_flights,
        IFNULL(total_departing_flights, 0) AS total_departing_flights,
        avg_departing_flights_cost
    FROM
        Airport
            LEFT JOIN
        (SELECT 
            COUNT(*) AS total_ariving_flights, To_Airport
        FROM
            Flight
        GROUP BY To_Airport) AS temp_arrive ON temp_arrive.To_Airport = Airport.airport_id
            LEFT JOIN
        (SELECT 
            COUNT(*) AS total_departing_flights,
                AVG(Cost) AS avg_departing_flights_cost,
                From_Airport
        FROM
            Flight
        GROUP BY From_Airport) AS temp_depart ON temp_depart.From_Airport = Airport.airport_id;




-- ID: 7b
-- Name: view_airlines
create or replace view view_airlines (
    airline_name, 
    rating, 
    total_flights, 
    min_flight_cost
) as
-- TODO: replace this select query with your solution
SELECT 
        Airline.Airline_Name AS airline_name,
        Rating AS rating,
        COUNT(*) AS total_flights,
        MIN(Cost) AS min_flight_cost
    FROM
        Airline
            JOIN
        Flight ON Airline.Airline_Name = Flight.Airline_Name
    GROUP BY Airline.Airline_Name;



-- ID: 8a
-- Name: view_customers
create or replace view view_customers (
    customer_name, 
    avg_rating, 
    location, 
    is_owner, 
    total_seats_purchased
) as
-- TODO: replace this select query with your solution
-- view customers
SELECT 
        CONCAT_WS(' ', First_Name, Last_Name) AS customer_name,
        avg_score AS avg_rating,
        Location AS location,
        IF(Customer.Email IN (SELECT 
                    Email
                FROM
                    Owners),
            1,
            0) AS is_owner,
        IFNULL(total, 0) AS total_seats_purchased
    FROM
        Customer
            JOIN
        Accounts ON Customer.Email = Accounts.Email
            LEFT JOIN
        (SELECT 
            AVG(Score) AS avg_score, Customer
        FROM
            Owners_Rate_Customers
        GROUP BY Owners_Rate_Customers.Customer) AS temp_score ON Customer.Email = temp_score.Customer
            LEFT JOIN
        (SELECT 
            SUM(Num_Seats) AS total, Customer
        FROM
            Book
        GROUP BY Book.Customer) AS temp_book ON Customer.Email = temp_book.Customer;



-- ID: 8b
-- Name: view_owners
create or replace view view_owners (
    owner_name, 
    avg_rating, 
    num_properties_owned, 
    avg_property_rating
) as
-- TODO: replace this select query with your solution
SELECT 
    CONCAT_WS(' ', First_Name, Last_Name) AS owner_name,
    avg_score AS avg_rating,
    IFNULL(total, 0) AS num_properties,
    avg_rating AS avg_property_rating
FROM
    Owners
        JOIN
    Accounts ON Owners.Email = Accounts.Email
        LEFT JOIN
    (SELECT 
        AVG(Score) AS avg_score, Owner_Email
    FROM
        Customers_Rate_Owners
    GROUP BY Customers_Rate_Owners.Owner_Email) AS temp_score ON Owners.Email = temp_score.Owner_Email
        LEFT JOIN
    (SELECT 
        COUNT(*) AS total, Owner_Email
    FROM
        Property
    GROUP BY Property.Owner_Email) AS temp_property ON Owners.Email = temp_property.Owner_Email
        LEFT JOIN
    (SELECT 
        AVG(Score) AS avg_rating, Owner_Email
    FROM
        Review
    GROUP BY Review.Owner_Email) AS temp_rating ON Owners.Email = temp_rating.Owner_Email;



-- ID: 9a
-- Name: process_date
drop procedure if exists process_date;
delimiter //
create procedure process_date ( 
    in i_current_date date
)
sp_main: begin
-- TODO: Implement your solution here
-- update the customers'location
update Customer c
set c.Location = (select temp.State from (select b.Customer, a.State, c.Location from Flight f, Book b, Airport a, Customer c where f.Flight_Num=b.Flight_Num and f.To_Airport=a.Airport_Id and c.Email=b.Customer
and Flight_Date = i_current_date and Was_Cancelled = 0) as temp where c.Email=temp.Customer);
    
end //
delimiter ;




