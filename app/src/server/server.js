const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2245918*thd",
  database: "travel_reservation_service",
});

db.connect((err) => {
  if (err) {
    return console.error("error" + err.message);
  }
  console.log("connected to 4400 database");
});

app.post("/register-owner", (req, res) => {
  const email = req.body.email;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const password = req.body.password;
  const phone = req.body.phone;

  db.query(
    "call register_owner(?,?,?,?,?)",
    [email, fname, lname, password, phone],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("call success");
      }
    }
  );
});

app.post("/register-customer", (req, res) => {
  const email = req.body.email;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const password = req.body.password;
  const phone = req.body.phone;
  const ccnum = req.body.ccnum;
  const cvv = req.body.cvv;
  const exp = req.body.exp;
  const location = req.body.location;
  db.query(
    "call register_customer(?,?,?,?,?,?,?,?,?)",
    [email, fname, lname, password, phone, ccnum, cvv, exp, location],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("call success");
      }
    }
  );
});

app.post("/schedule-flight", (req, res) => {
  const fnum = req.body.fnum;
  const airline = req.body.airline;
  const fairport = req.body.fairport;
  const tairport = req.body.tairport;
  const dtime = req.body.dtime;
  const atime = req.body.atime;
  const fdate = req.body.fdate;
  const cost = req.body.cost;
  const cap = req.body.cap;
  const cdate = req.body.cdate;
  db.query(
    "call schedule_flight(?,?,?,?,?,?,?,?,?,?)",
    [fnum, airline, fairport, tairport, dtime, atime, fdate, cost, cap, cdate],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("call success");
      }
    }
  );
});

app.get("/get-flight", (req, res) => {
  db.query(
    "SELECT Airline_Name, Flight_num, Flight_Date from Flight",
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.send(results);
      }
    }
  );
});


app.get("/view-customers", (req, res) => {
  db.query("SELECT * from view_customers", (error, results) => {
    if (error) {
      throw error;
    } else {
      res.send(results);
    }
  });
});

app.get("/view-owners", (req, res) => {
  db.query("SELECT * from view_owners", (error, results) => {
    if (error) {
      throw error;
    } else {
      res.send(results);
    }
  });
});

app.get("/view-airlines", (req, res) => {
  db.query("SELECT * from view_airlines", (error, results) => {
    if (error) {
      throw error;
    } else {
      res.send(results);
    }
  });
});

app.get("/view-airports", (req, res) => {
  db.query(
    "SELECT Airport_Id, Airport_Name, Time_Zone, CONCAT_WS(', ', Street, City, State, Zip) AS Address from Airport",
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.send(results);
      }
    }
  );
});

app.post("/remove-flight", (req, res) => {
  const fnum = req.body.fnum;
  const airline = req.body.airline;
  const fdate = req.body.fdate;

  db.query(
    "call remove_flight(?,?,?)",
    [fnum, airline, fdate],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("call success");
      }
    }
  );
});

app.post("/delete-account", (req, res) => {
  const oemail = req.body.oemail;

  console.log(req.body);
  db.query("call remove_owner(?)", [oemail], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("call success");
    }
  });
});

app.post("/remove-property", (req, res) => {
  const cdate = req.body.cdate;
  const oemail = req.body.oemail;
  const propertyName = req.body.propertyName;
  console.log(req.body);
  db.query(
    "call remove_property(?,?,?)",
    [propertyName, oemail, cdate],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("call success");
      }
    }
  );
});

app.post("/cancelPropertyReservation", (req, res) => {
  const propertyName = req.body.propertyName;
  const oemail = req.body.oemail;
  const cemail = req.body.cemail;
  const cdate = req.body.cdate;
  console.log(req.body);
  db.query(
    "call cancel_property_reservation(?,?,?,?)",
    [propertyName, oemail, cemail, cdate],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("call success");
      }
    }
  );
});

app.get("/get-book-flight", (req, res) => {
  db.query(
    "SELECT airline, flight_id, num_empty_seats from view_flight",
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.send(results);
      }
    }
  );
});

app.post("/book-flight", (req, res) => {
  const customerEmail = req.body.customerEmail;
  const fnum = req.body.fnum;
  const airline = req.body.airline;
  const seatsNum = req.body.seatsNum;
  const cDate = req.body.cDate;
  console.log(req.body);
  db.query(
    "call book_flight(?,?,?,?,?)",
    [customerEmail, fnum, airline, seatsNum, cDate],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("call success");
      }
    }
  );
});

app.post("/get-cancel-flight-list", (req, res) => {
  const customerEmail = req.body.customerEmail;
  const fnum = req.body.fnum;
  const airline = req.body.airline;
  const seatsNum = req.body.seatsNum;
  const cDate = req.body.cDate;
  console.log(req.body);
  db.query(
    "call book_flight(?,?,?,?,?)",
    [customerEmail, fnum, airline, seatsNum, cDate],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("call success");
      }
    }
  );
});


app.post("/owner-rate-customer", (req, res) => {
  const cemail = req.body.cemail;
  const oemail = req.body.oemail;
  const rate = req.body.rate;
  const cdate = req.body.cdate;

  console.log(req.body);
  db.query(
    "call owner_rates_customer(?,?,?,?)",
    [oemail, cemail, rate, cdate],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("call success");
      }
    }
  );
});

app.post("/customer-rate-owner", (req, res) => {
  const cemail = req.body.cemail;
  const oemail = req.body.oemail;
  const rate = req.body.rate;
  const cdate = req.body.cdate;

  console.log(req.body);
  db.query(
    "call customer_rates_owner(?,?,?,?)",
    [cemail, oemail, rate, cdate],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("call success");
      }
    }
  );
});

app.post("/cancel-flight", (req, res) => {
  const cemail = req.body.cemail;
  const fnum = req.body.fnum;
  const airline = req.body.airline;
  const cdate = req.body.cdate;

  console.log(req.body);
  db.query(
    "call cancel_flight_booking(?,?,?,?)",
    [cemail, fnum, airline, cdate],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("call success");
      }
    }
  );
});

app.post("/customer-review-property", (req, res) => {
  const cemail = req.body.cemail;
  const oemail = req.body.oemail;
  const score = req.body.score;
  const content = req.body.content;
  const cdate = req.body.cdate;
  const pname = req.body.pname;

  console.log(req.body);
  db.query(
    "call customer_review_property(?,?,?,?,?,?)",
    [pname, oemail, cemail, content, score, cdate],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("call success");
      }
    }
  );
});

app.get("/selectProperty", (req, res) => {
  db.query("SELECT * from view_properties", (error, results) => {
    if (error) {
      throw error;
    } else {
      res.send(results);
    }
  });
});

app.get("/removeProperty", (req, res) => {
  db.query(
    "select p.Owner_Email, p.Property_Name, p.Descr, p.Capacity, p.Cost,CONCAT_WS(', ', Street, City, State, Zip) as address from view_properties v join property p on v.property_name = p.Property_Name;",
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.send(results);
      }
    }
  );
});

app.get("/selectPropertyReserve", (req, res) => {
  db.query(
    "select r.Property_Name,r.Start_Date,r.End_Date,r.Customer,r.Owner_Email,p.Cost,re.Content,re.Score from Reserve r, Property p , Review re where r.Property_Name=p.Property_Name and re.Property_Name=p.Property_Name",
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.send(results);
      }
    }
  );
});

app.get("/get-reserve-property", (req, res) => {
  db.query(
    "select r.Property_Name,p.Owner_Email,p.Capacity from Reserve r, Property p where r.Property_Name=p.Property_Name",
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.send(results);
      }
    }
  );
});

app.get("/selectOwnerRateCustomer", (req, res) => {
  db.query(
    "select r.Start_Date,r.Owner_Email,r.Customer,r.Property_Name,CONCAT_WS(', ', Street, City, State, Zip) as address from Owners_Rate_Customers o, Reserve r, Property p where o.Owner_Email=r.Owner_Email and o.Customer=r.Customer and p.Owner_Email=r.Owner_Email",
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.send(results);
      }
    }
  );
});

app.get("/selectCustomerRateOwner", (req, res) => {
  db.query(
    "select r.Start_Date,r.Customer,r.Owner_Email,r.Property_Name,CONCAT_WS(', ', Street, City, State, Zip) as address from Owners_Rate_Customers o, Reserve r, Property p where o.Owner_Email=r.Owner_Email and o.Customer=r.Customer and p.Owner_Email=r.Owner_Email",
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.send(results);
      }
    }
  );
});

app.post("/add-property", (req, res) => {
  const pname = req.body.pname;
  const oemail = req.body.oemail;
  const desp = req.body.desp;
  const capacity = req.body.capacity;
  const cost = req.body.cost;
  const street = req.body.street;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const distAirport = req.body.distAirport;
  const nearestAirport = req.body.nearestAirport;

  db.query(
    "call add_property(?,?,?,?,?,?,?,?,?,?,?)",
    [
      pname,
      oemail,
      desp,
      capacity,
      cost,
      street,
      city,
      state,
      zip,
      nearestAirport,
      distAirport,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("call success");
      }
    }
  );
});

app.get("/selectProperty", (req, res) => {
  const oemail = req.body.oemail;
  const pname = req.body.pname;
  db.query("SELECT * from view_properties", (error, results) => {
    if (error) {
      throw error;
    } else {
      res.send(results);
    }
  });
});

app.get("/selectFlight", (req, res) => {
  db.query("SELECT * from view_flight", (error, results) => {
    if (error) {
      throw error;
    } else {
      res.send(results);
    }
  });
});

app.get("/selectProperty", (req, res) => {
  db.query("SELECT * from view_properties", (error, results) => {
    if (error) {
      throw error;
    } else {
      res.send(results);
    }
  });
});

app.get("/cancel-property-reservation", (req, res) => {
  db.query(
    "SELECT r.Start_Date, r.Property_Name, r.Owner_Email, r.Customer, CONCAT_WS(', ', Street, City, State, Zip) as address from Reserve r, Property p where p.Owner_Email=r.Owner_Email;",
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.send(results);
      }
    }
  );
});

app.get("/get-cancel-flight", (req, res) => {
  db.query(
    "select b.Customer,f.Airline_Name,f.Flight_Num,f.Flight_Date from Flight f,Book b where b.Flight_Num=f.Flight_Num and b.Airline_Name=f.Airline_Name;",
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.send(results);
      }
    }
  );
});

app.post("/reserve-property", (req, res) => {
  const cemail = req.body.cemail;
  const oemail = req.body.oemail;
  const pname = req.body.pname;
  const sdate = req.body.sdate;
  const edate = req.body.edate;
  const gnum = req.body.gnum;
  const cdate = req.body.cdate;

  console.log(req.body);
  db.query(
    "call reserve_property(?,?,?,?,?,?,?)",
    [pname, oemail, cemail, sdate, edate, gnum, cdate],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("call success");
      }
    }
  );
});

app.get("/selectCustomerReviewProperty", (req, res) => {
  db.query(
    "select r.Start_Date, r.Property_Name, r.Owner_Email, r.Customer, CONCAT_WS(', ', Street, City, State, Zip) as address from Review re, Reserve r, Property p where re.Owner_Email=r.Owner_Email and re.Customer=r.Customer and p.Owner_Email=r.Owner_Email",
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.send(results);
      }
    }
  );
});

app.post("/process-date", (req, res) => {
  const cdate = req.body.cdate;
  db.query("call process_date(?)", [cdate], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("call success");
    }
  });
});

app.get("/get-admins", (req, res) => {
  db.query(
    "select Admins.Email, Accounts.Pass from Admins join Accounts on Admins.Email = Accounts.Email",
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.send(results);
      }
    }
  );
});

app.get("/get-customers", (req, res) => {
  db.query(
    "select Customer.Email, Accounts.Pass from Customer join Accounts on Customer.Email = Accounts.Email",
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.send(results);
      }
    }
  );
});

app.get("/get-owners", (req, res) => {
  db.query(
    "select Owners.Email, Accounts.Pass from Owners join Accounts on Owners.Email = Accounts.Email",
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.send(results);
      }
    }
  );
});

app.listen(4000, () => {
  console.log("The server is running on port 4000");
});
