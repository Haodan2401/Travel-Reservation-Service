import { Link } from "react-router-dom";
import { useState } from "react";

function OwnerHome() {

  return (
    <div className="OwnerHome">
      <center>
        <h1>Welcome, Owner!</h1>

        <button>
          <Link to="/add-property">Add Property</Link>
        </button>
        {' '}
        <button>
          <Link to="/owner-remove-property">RemoveProperty</Link>
        </button>
        <br />
        <br />
        <button>
          <Link to="/Login">Log Out</Link>
        </button>


      </center>
    </div>
  );
}

export default OwnerHome;
