import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    if (!token) {
        // Not logged in, redirect to login page
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
        // Logged in but doesn't have the required role
        // For regular users, maybe send to dashboard, for others maybe login or a 403 page
        if (user?.role === 'admin') {
            return <Navigate to="/admin/dashboard" replace />;
        } else if (user?.role === 'agent') {
            return <Navigate to="/agent/dashboard" replace />;
        } else {
            return <Navigate to="/dashboard" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
