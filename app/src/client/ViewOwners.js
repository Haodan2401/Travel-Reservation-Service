import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { render } from "@testing-library/react";

function ViewOwners() {
  const [ownersList, setOwnersList] = useState([]);
  const [name, setName] = useState("");

  const filter = () => {
    var temp = [];
    ownersList.forEach((val) => {
      if (val.owner_name === name) {
        temp.push(val);
      }
    });
    setOwnersList(temp);
    render();
  };

  const increaseRat = () => {
    var temp = [];
    ownersList.forEach((val) => {
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
    setOwnersList(temp);
    render();
  };

  const decreaseRat = () => {
    var temp = [];
    ownersList.forEach((val) => {
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
    setOwnersList(temp);
    render();
  }; 

  const increaseNum = () => {
    var temp = [];
    ownersList.forEach((val) => {
      temp.push(val);
    });
    temp.sort(function (x, y) {
      if (x.num_properties_owned < y.num_properties_owned) {
        return -1;
      }
      if (x.num_properties_owned > y.num_properties_owned) {
        return 1;
      }
      return 0;
    });
    setOwnersList(temp);
    render();
  };

  const decreaseNum = () => {
    var temp = [];
    ownersList.forEach((val) => {
      temp.push(val);
    });
    temp.sort(function (x, y) {
      if (x.num_properties_owned < y.num_properties_owned) {
        return 1;
      }
      if (x.num_properties_owned > y.num_properties_owned) {
        return -1;
      }
      return 0;
    });
    setOwnersList(temp);
    render();
  }; 

  const increaseProRat = () => {
    var temp = [];
    ownersList.forEach((val) => {
      temp.push(val);
    });
    temp.sort(function (x, y) {
      if (x.avg_property_rating < y.avg_property_rating) {
        return -1;
      }
      if (x.avg_property_rating > y.avg_property_rating) {
        return 1;
      }
      return 0;
    });
    setOwnersList(temp);
    render();
  };

  const decreaseProRat = () => {
    var temp = [];
    ownersList.forEach((val) => {
      temp.push(val);
    });
    temp.sort(function (x, y) {
      if (x.avg_property_rating < y.avg_property_rating) {
        return 1;
      }
      if (x.avg_property_rating > y.avg_property_rating) {
        return -1;
      }
      return 0;
    });
    setOwnersList(temp);
    render();
  }; 


  const getOwnersList = () => {
    Axios.get("http://localhost:4000/view-owners").then((res) => {
      setOwnersList(res.data);
      console.log(res.data);
    });
  };  

  return (
    <div>
      <h1> View Owners </h1>
      <button onClick={getOwnersList}>Owners</button>
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
          <th>owner_name</th>
          <th>avg_rating     <button onClick={increaseRat}>⬆</button><button onClick={decreaseRat}>⬇</button> </th>
          <th>num_properties_owned  <button onClick={increaseNum}>⬆</button><button onClick={decreaseNum}>⬇</button></th>
          <th>avg_property_rating <button onClick={increaseProRat}>⬆</button><button onClick={decreaseProRat}>⬇</button></th>
        </tr>
        {ownersList.map((val, key) => {
          return (
            <tr>
              <td>{val.owner_name}</td>
              <td>{val.avg_rating}</td>
              <td>{val.num_properties_owned}</td>
              <td>{val.avg_property_rating}</td>
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
export default ViewOwners;
