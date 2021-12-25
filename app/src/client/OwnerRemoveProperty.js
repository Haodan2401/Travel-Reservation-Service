import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import currentDate from "./data";


function OwnerRemoveProperty() {
  const [propertyName, setPropertyName] = useState("");
  const [oemail, setOemail] = useState("");
  const [cdate, setCdate] = useState("");
  const [propertyList, setPropertyList] = useState([]);

  const getPropertyList = () => {
    Axios.get("http://localhost:4000/removeProperty").then((res) => {
      setPropertyList(res.data);
      //console.log(res);
    });
  };

  const removeProperty = () => {
    Axios.post("http://localhost:4000/remove-property", {
      propertyName: propertyName,
      oemail: oemail,
      cdate: currentDate.date,
    }).then(() => {
      console.log("success");
    });
  };

  return (
    <div>
        <center>
          <h1>Remove Property</h1>
            <button onClick={getPropertyList}>Property</button>
            <table>
              <tr>
                <th>Owner Email</th>
                <th>Property Name</th>
                <th>Description</th>
                <th>Capacity</th>
                <th>Cost</th>
                <th>Address</th>
              </tr>
              {propertyList.map((val, key) => {
                return (
                  <tr>
                    <td>{val.Owner_Email}</td>
                    <td>{val.Property_Name}</td>
                    <td>{val.Descr}</td>
                    <td>{val.Capacity}</td>
                    <td>{val.Cost}</td>
                    <td>{val.address}</td>
                  </tr>
                );
              })}
            </table>
            <hr/>




            <form>
              Owner Email:
              <input
                type="text"
                name="oemail"
                onChange={(event) => {
                  setOemail(event.target.value);
                }}
              />
              <br />

              Property Name:
              <input
                type="text"
                name="propertyName"
                onChange={(event) => {
                  setPropertyName(event.target.value);
                }}
              />
              <br />

            </form>





            <hr/>
            <button>
                <Link to="/owner-home">Back</Link>
            </button>
            {" "}
            <button onClick={removeProperty}>Remove Property</button>




        </center>
    </div>
  );
}

export default OwnerRemoveProperty;
