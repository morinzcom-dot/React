import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Listings from "./Listings";
import AddListing from "./AddListing";
import EditListing from "./EditListing";

import AdminDashboard from "./admin/AdminDashboard";
import AdminUsers from "./admin/AdminUsers";
import AdminListings from "./admin/AdminListings";
import AdminEditListing from "./admin/AdminEditListing";

import Register from "./admin/Register";
import AdminOwners from "./admin/AdminOwners";
import WaitingApproval from "./WaitingApproval";
import AdminPendingOwners from "./admin/AdminPendingOwners";
import BrowseListings from "./user/BrowseListings";
import MyBookings from "./user/MyBookings";


function App() {
  return (
    <Routes>
      {/* ===== PUBLIC ===== */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/waiting-approval" element={<WaitingApproval />} />

      {/* ===== LISTINGS (PROTECTED + USER PASSED) ===== */}
      <Route
        path="/listings"
        element={
          <ProtectedRoute>
            {(user) => <Listings user={user} />}
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-listing"
        element={
          <ProtectedRoute>
            <AddListing />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-listing/:id"
        element={
          <ProtectedRoute>
            <EditListing />
          </ProtectedRoute>
        }
      />

      {/* ===== ADMIN ===== */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <AdminUsers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/listings"
        element={
          <ProtectedRoute>
            <AdminListings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/owners"
        element={
          <ProtectedRoute>
            <AdminOwners />
          </ProtectedRoute>
        }
      />
  
<Route path="/admin/listings/edit/:id" element={<AdminEditListing />} />

      <Route
        path="/admin/pending"
        element={
          <ProtectedRoute>
            <AdminPendingOwners />
          </ProtectedRoute>
        }
      />

      {/* ===== USER ===== */}
      <Route
        path="/user/browse-listings"
        element={
          <ProtectedRoute>
            <BrowseListings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/my-bookings"
        element={
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        }
      />

      {/* ===== DASHBOARD ===== */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;


