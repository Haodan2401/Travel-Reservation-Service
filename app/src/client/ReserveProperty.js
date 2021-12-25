import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function ReserveProperty() {
  const [reservePropertyList, setReservePropertyList] = useState([]);
  const [pname, setPname] = useState("");
  const [cemail, setCemail] = useState("");
  const [oemail, setOemail] = useState("");
  const [sdate, setSdate] = useState("");
  const [edate, setEdate] = useState("");
  const [gnum, setGnum] = useState(0);
  const [cdate, setCdate] = useState("");

  const getReservePropertyList = () => {
    Axios.get("http://localhost:4000/get-reserve-property").then((res) => {
      setReservePropertyList(res.data);
      //console.log(res);
    });
  };

  const reserveProperty = () => {
    Axios.post("http://localhost:4000/reserve-property", {
      pname: pname,
      oemail: oemail,
      cemail: cemail,
      sdate: sdate,
      edate: edate,
      gnum: gnum,
      cdate: cdate,
    }).then(() => {
      console.log("success");
    });
  };

  return (
    <div>
      <center>
        <h1>Customer Reserve Property</h1>
        <button onClick={getReservePropertyList}>Reserve Property</button>
        <table>
          <tr>
            <th>Property Name</th>
            <th>Owner Email</th>
            <th>Capacity</th>
          </tr>

          {reservePropertyList.map((val, key) => {
            return (
              <tr>
                <td>{val.Property_Name}</td>
                <td>{val.Owner_Email}</td>
                <td>{val.Capacity}</td>
              </tr>
            );
          })}
        </table>
        <hr />
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
          Customer Email:
          <input
            type="text"
            name="oemail"
            onChange={(event) => {
              setCemail(event.target.value);
            }}
          />
          <br />
          Property Name:
          <input
            type="text"
            name="pname"
            onChange={(event) => {
              setPname(event.target.value);
            }}
          />
          <br />
          Start Date:
          <input
            type="text"
            name="startDate"
            onChange={(event) => {
              setSdate(event.target.value);
            }}
          />
          <br />
          End Date:
          <input
            type="text"
            name="num_guests"
            onChange={(event) => {
              setEdate(event.target.value);
            }}
          />
          <br />
          Number Of Guests:
          <input
            type="text"
            name="gnum"
            onChange={(event) => {
              setGnum(event.target.value);
            }}
          />
          <br />
          Current Date:
          <input
            type="text"
            name="cdate"
            onChange={(event) => {
              setCdate(event.target.value);
            }}
          />
          <hr />
        </form>
        <button>
          <Link to="/customer-home">Back</Link>
        </button>{" "}
        <button onClick={reserveProperty}>Reserve</button>
        <br />
      </center>
    </div>
  );
}
export default ReserveProperty;

