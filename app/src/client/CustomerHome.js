import { Link } from "react-router-dom";

function CustomerHome() {
  return (
    <div className="customer-home">
      <center>
        <h1>Customer Home</h1>
        <br />
        <button>
          <Link to="/book-flight">Book Flight</Link>
        </button>
        <button>
          <Link to="/cancel-flight">Cancel Flight</Link>
        </button>
        <button>
          <Link to="/view-properties">View Properties</Link>
        </button>
        <button>
          <Link to="/reserve-property">Reserve Property</Link>
        </button>
        <button>
          <Link to="/customer-cancel-reservation">Cancel Reservation</Link>
        </button>
        <button>
          <Link to="/customer-review-properties">Review Property</Link>
        </button>
        <button>
          <Link to="/view-properties-reservation">View Reservation</Link>
        </button>
        <button>
          <Link to="/customer-rate-owner">Rate Owner</Link>
        </button>
        <button>
          <Link to="/Login">Logout</Link>
        </button>
      </center>
    </div>
  );
}

export default CustomerHome;