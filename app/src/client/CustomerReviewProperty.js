import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function CustomerReviewProperty() {
  const [customerReviewPropertyList, setCustomerReviewPropertyList] = useState([]);
  const [pname, setPname] = useState("");
  const [oemail, setOemail] = useState("");
  const [cemail, setCemail] = useState("");
  const [content, setContent] = useState("");
  const [score, setScore] = useState(0);
  const [cdate, setCdate] = useState("");

  const getCustomerReviewPropertyList = () => {
    Axios.get("http://localhost:4000/selectCustomerReviewProperty").then((res) => {
      setCustomerReviewPropertyList(res.data);
      //console.log(res);
    });
  };

  const customerReviewProperty = () => {
    Axios.post("http://localhost:4000/customer-review-property", {
      oemail: oemail,
      cemail: cemail,
      score: score,
      pname: pname,
      content: content,
      cdate: cdate,
    }).then(() => {
      console.log("success");
    });
  };

  return (
    <div>
    <center>
      <h1>Customer Review Property</h1>
        <button onClick={getCustomerReviewPropertyList}>CustomerReviewProperty</button>
            <table>
              <tr>
                <th>Reservation Date</th>
                <th>Property Name</th>
                <th>Owner Email</th>
                <th>Customer Email</th>
                <th>Address</th>
              </tr>

              {customerReviewPropertyList.map((val, key) => {
                return (
                  <tr>
                    <td>{val.Start_Date}</td>
                    <td>{val.Property_Name}</td>
                    <td>{val.Owner_Email}</td>
                    <td>{val.Customer}</td>
                    <td>{val.address}</td>
                  </tr>
                );
              })}
            </table>
            <hr/>

            <form>
               Property Name:
              <input
                type="text"
                name="pname"
                onChange={(event) => {
                  setPname(event.target.value);
                }}
              />
              <br />

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
                name="cemail"
                onChange={(event) => {
                  setCemail(event.target.value);
                }}
              />
              <br />

              Review Content:
              <input
                type="text"
                name="content"
                onChange={(event) => {
                  setContent(event.target.value);
                }}
              />
              <br />

              Rate Score:
              <input
                type="text"
                name="score"
                onChange={(event) => {
                  setScore(event.target.value);
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
              <br />

            </form>



            <button>
                <Link to="/customer-home">Back</Link>
            </button>
            {" "}
            <button onClick={customerReviewProperty}>Submit</button>
    </center>
    </div>
  );
}

export default CustomerReviewProperty;
