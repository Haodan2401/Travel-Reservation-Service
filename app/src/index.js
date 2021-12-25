import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./client/Login";
import Register from "./client/Register";
import AdminHome from "./client/AdminHome";
import ScheduleFlight from "./client/ScheduleFlight";
import RemoveFlight from "./client/RemoveFlight";
import ProcessDate from "./client/ProcessDate";
import ViewAirports from "./client/ViewAirports";
import ViewAirlines from "./client/ViewAirlines";
import ViewCustomers from "./client/ViewCustomers";
import ViewOwners from "./client/ViewOwners";
import CustomerViewFlights from "./client/CustomerViewFlights";
import ViewProperties from "./client/ViewProperties";
import ViewPropertyReserve from "./client/ViewPropertyReserve";

import OwnerAddProperty from "./client/OwnerAddProperty";
import OwnerHome from "./client/OwnerHome";
import OwnerDeleteAccount from "./client/OwnerDeleteAccount";
import OwnerRateCustomer from "./client/OwnerRateCustomer";
import OwnerRemoveProperty from "./client/OwnerRemoveProperty";
import CustomerRateOwner from "./client/CustomerRateOwner";
import AdminProcessDate from "./client/AdminProcessDate";
import CustomerHome from "./client/CustomerHome";
import BookFlight from "./client/BookFlight";
import CancelFlight from "./client/CancelFlight";
import CustomerReviewProperty from "./client/CustomerReviewProperty";
import CustomerCancelProperty from "./client/CustomerCancelProperty";
import ReserveProperty from "./client/ReserveProperty";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="admin-home" element={<AdminHome />} />
      <Route path="schedule-flight" element={<ScheduleFlight />} />
      <Route path="remove-flight" element={<RemoveFlight />} />
      <Route path="process-date" element={<ProcessDate />} />
      <Route path="view-airports" element={<ViewAirports />} />
      <Route path="view-airlines" element={<ViewAirlines />} />

      <Route path="view-customers" element={<ViewCustomers />} />
      <Route path="view-owners" element={<ViewOwners />} />
      <Route path="admin-process-date" element={<AdminProcessDate />} />
      <Route path="customer-home" element={<CustomerHome />} />
      <Route path="book-flight" element={<BookFlight />} />
      <Route path="cancel-flight" element={<CancelFlight />} />

      <Route path="add-property" element={<OwnerAddProperty />} />
      <Route path="delete-account" element={<OwnerDeleteAccount />} />
      <Route path="owner-home" element={<OwnerHome />} />
      <Route path="owner-rate-customer" element={<OwnerRateCustomer />} />
      <Route path="owner-remove-property" element={<OwnerRemoveProperty />} />
      <Route path="customer-rate-owner" element={<CustomerRateOwner />} />
      <Route path="customer-view-flights" element={<CustomerViewFlights />} />
      <Route path="view-properties" element={<ViewProperties />} />
      <Route
        path="customer-review-properties"
        element={<CustomerReviewProperty />}
      />
      <Route
        path="customer-cancel-reservation"
        element={<CustomerCancelProperty />}
      />

      <Route path="reserve-property" element={<ReserveProperty />} />

      <Route
        path="view-properties-reservation"
        element={<ViewPropertyReserve />}
      />

      <Route
        path="customer-review-properties"
        element={<CustomerReviewProperty />}
      />
<<<<<<< Updated upstream


=======
>>>>>>> Stashed changes
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
