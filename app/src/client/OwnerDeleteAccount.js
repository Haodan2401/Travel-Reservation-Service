import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import currentDate from "./data";

function OwnerDeleteAccount() {
  const [oemail, setOemail] = useState("");

  const deleteAccount = () => {
    Axios.post("http://localhost:4000/delete-account", {
      oemail: oemail,
    }).then(() => {
      console.log("success");
    });
  };

  return (
    <div>
      <center>
      <h1>Delete Owner Account</h1>
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

            </form>
          <p>Are you sure you want to DELETE your owner account?</p>
          <button onClick={deleteAccount}>DELETE</button>
          <br />




          <button>Back</button>

          <button>Log Out</button>
      </center>
    </div>
  );
}

export default OwnerDeleteAccount;
