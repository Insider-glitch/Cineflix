import React, { useEffect, useState, useCallback } from "react";
import { Navigate } from "react-router-dom";
import User from "../pages/user";
import Admin from "../pages/admin";
import { supabase } from "../lib/supabase";

const AdminRoute = ({ children }) => {
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRole = useCallback(async () => {
    try {
      const { data, error: sessionError } = await supabase.auth.getSession();
      const session = data?.session; 

  
      if (!session?.user) {
        setIsLoading(false);
        return;
      }
  
      const { data: userData, error } = await supabase
        .from("users")
        .select("role")
        .eq("id", session.user.id)
        .single();
  
      if (error) {
        console.error("Error fetching role:", error.message);
      } else {
        setRole(userData?.role);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);
  

  useEffect(() => {
    fetchRole();
  }, [fetchRole]);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return role === "admin" ? children : <Navigate to="/" />;
};

// App Routes
const AppRoutes = [
  {
    path: "/*",
    element: <User />,
  },
  {
    path: "/admin/*",
    element: (
      <AdminRoute>
        <Admin />
      </AdminRoute>
    ),
  },
];

export default AppRoutes;
