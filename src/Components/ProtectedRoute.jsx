// import { useAuth } from '../stores/authStore.js'
// import { Navigate } from "react-router";

// function ProtectedRoute({ children, allowedRoles }) {
//   //get user login status from store
//   const { loading, currentUser, isAuthenticated, logout } = useAuth();
//   //loading state
//   if (loading) {
//     return <p>Loading...</p>;
//   }
//   //if user not loggedin
//   if (!isAuthenticated) {
//     //redirect to Login
//     return <Navigate to="/login" replace />;
//   }

//   console.log("current user role", currentUser.role);
//   console.log("aloowed role", allowedRoles);
//   console.log(allowedRoles.includes(currentUser?.role));
//   //check roles
//   if (allowedRoles && !allowedRoles.includes(currentUser?.role)) {
//     console.log("first");
//     //redirect to Login
//     return <Navigate to="/unauthorized" replace state={{ redirectTo: "/" }} />;
//   }

//   return children;
// }
// export default ProtectedRoute;
import { Navigate } from "react-router";
import { useAuth } from "../stores/authStore";

function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, currentUser, authChecked } = useAuth();

  //  Wait until auth check completes
  if (!authChecked) {
    return <div>Checking authentication...</div>;
  }

  //  Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  //  Role not allowed
  if (!allowedRoles.includes(currentUser?.role)) {
    return <Navigate to="/login" />;
  }

  //  Allowed
  return children;
}

export default ProtectedRoute;