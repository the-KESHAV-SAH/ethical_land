import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AdminLayout() {
    const user = useSelector((state) => state.Auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate('/login');
        }
    }, [user, navigate]); // Include navigate in the dependency array

    return (
        <>
            <Outlet />
        </>
    );
}