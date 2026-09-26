import React, { useContext, useEffect } from "react";
import { getUserProfile } from "../services/AuthService";
import { UserContext } from "../Context/AppContext";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";

function AdminProtectedRoute({ children }) {
  const { user, setUser, loading, setLoading } = useContext(UserContext);

  useEffect(() => {
    async function getUser() {
      try {
        setLoading(true);
        const data = await getUserProfile();
        setUser(data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    // Only fetch if user state hasn't been populated yet
    if (!user) {
      getUser();
    } else {
      setLoading(false);
    }
  }, []);

  // 1. Show loader while authenticating
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default AdminProtectedRoute;
