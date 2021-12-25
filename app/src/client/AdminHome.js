import { Link } from "react-router-dom";

function AdminHome() {
  return (
    <div className="admin-home">
      <center>
        <h1>Admin Home</h1>
        <br />
        <button>
          <Link to="/schedule-flight">Schedule Flight</Link>
        </button>
        <button>
          <Link to="/remove-flight">Remove Flight</Link>
        </button>
        <button>
          <Link to="/Process-date">Process Date</Link>
        </button>
        <button>
          <Link to="/view-airports">View Airports</Link>
        </button>
        <button>
          <Link to="/view-airlines">View Airlines</Link>
        </button>
        <button>
          <Link to="/view-customers">View Customers</Link>
        </button>
        <button>
          <Link to="/view-owners">View Owners</Link>
        </button>
        <button>
          <Link to="/Login">Logout</Link>
        </button>
        <button>
          <Link to="/customer-home">Customer Home</Link>
        </button>
      </center>
    </div>
  );
}

export default AdminHome;
