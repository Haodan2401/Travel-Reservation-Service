import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { render } from "@testing-library/react";

function ViewCustomers() {
  const [customersList, setCustomersList] = useState([]);
  const [name, setName] = useState("");

  const getCustomersList = () => {
    Axios.get("http://localhost:4000/view-customers").then((res) => {
      setCustomersList(res.data);
      console.log(res.data);
    });
  }; 

  const filter = () => {
    var temp = [];
    customersList.forEach((val) => {
      if (val.customer_name === name) {
        temp.push(val);
      }
    });
    setCustomersList(temp);
    render();
  };

  const increaseName = () => {
    var temp = [];
    customersList.forEach((val) => {
      temp.push(val);
    });
    temp.sort(function (x, y) {
      if (x.customer_name < y.customer_name) {
        return -1;
      }
      if (x.customer_name > y.customer_name) {
        return 1;
      }
      return 0;
    });
    setCustomersList(temp);
    render();
  };

  const decreaseName = () => {
    var temp = [];
    customersList.forEach((val) => {
      temp.push(val);
    });
    temp.sort(function (x, y) {
      if (x.customer_name < y.customer_name) {
        return 1;
      }
      if (x.customer_name > y.customer_name) {
        return -1;
      }
      return 0;
    });
    setCustomersList(temp);
    render();
  }; 

  const increaseRat= () => {
    var temp = [];
    customersList.forEach((val) => {
      temp.push(val);
    });
    temp.sort(function (x, y) {
      if (x.avg_rating < y.avg_rating) {
        return -1;
      }
      if (x.avg_rating > y.avg_rating) {
        return 1;
      }
      return 0;
    });
    setCustomersList(temp);
    render();
  };

  const decreaseRat = () => {
    var temp = [];
    customersList.forEach((val) => {
      temp.push(val);
    });
    temp.sort(function (x, y) {
      if (x.avg_rating < y.avg_rating) {
        return 1;
      }
      if (x.avg_rating > y.avg_rating) {
        return -1;
      }
      return 0;
    });
    setCustomersList(temp);
    render();
  }; 

  const increaseIsOwner = () => {
    var temp = [];
    customersList.forEach((val) => {
      temp.push(val);
    });
    temp.sort(function (x, y) {
      if (x.is_owner < y.is_owner ) {
        return -1;
      }
      if (x.is_owner  > y.is_owner ) {
        return 1;
      }
      return 0;
    });
    setCustomersList(temp);
    render();
  };

  const decreaseIsOwner = () => {
    var temp = [];
    customersList.forEach((val) => {
      temp.push(val);
    });
    temp.sort(function (x, y) {
      if (x.is_owner < y.is_owner) {
        return 1;
      }
      if (x.is_owner > y.is_owner) {
        return -1;
      }
      return 0;
    });
    setCustomersList(temp);
    render();
  }; 

  const increaseSeats = () => {
    var temp = [];
    customersList.forEach((val) => {
      temp.push(val);
    });
    temp.sort(function (x, y) {
      if (x.total_seats_purchased < y.total_seats_purchased ) {
        return -1;
      }
      if (x.total_seats_purchased  > y.total_seats_purchased ) {
        return 1;
      }
      return 0;
    });
    setCustomersList(temp);
    render();
  };

  const decreaseSeats = () => {
    var temp = [];
    customersList.forEach((val) => {
      temp.push(val);
    });
    temp.sort(function (x, y) {
      if (x.total_seats_purchased < y.total_seats_purchased) {
        return 1;
      }
      if (x.total_seats_purchased > y.total_seats_purchased) {
        return -1;
      }
      return 0;
    });
    setCustomersList(temp);
    render();
  }; 

  return (
    <div>
      <h1> View Customers </h1>
      <button onClick={getCustomersList}>Customers</button>
      <br/>
      name:
      <input
          type="text"
          name="name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <button onClick={filter}>filter</button>
        <br />  
      <table>
        <tr>
          <th>customer_name <button onClick={increaseName}>⬆</button><button onClick={decreaseName}>⬇</button></th>
          <th>avg_rating <button onClick={increaseRat}>⬆</button><button onClick={decreaseRat}>⬇</button></th>
          <th>location</th>
          <th>is_owner <button onClick={increaseIsOwner}>⬆</button><button onClick={decreaseIsOwner}>⬇</button></th>
          <th>total_seats_purchased <button onClick={increaseSeats}>⬆</button><button onClick={decreaseSeats}>⬇</button></th>
        </tr>
        {customersList.map((val, key) => {
          return (
            <tr>
              <td>{val.customer_name}</td>
              <td>{val.avg_rating}</td>
              <td>{val.location}</td>
              <td>{val.is_owner}</td>
              <td>{val.total_seats_purchased}</td>
            </tr>
          );
        })}
      </table>
      <br />
      <button>
        <Link to="/admin-home">Back</Link>
      </button>
    </div>
  );
}

export default ViewCustomers;

