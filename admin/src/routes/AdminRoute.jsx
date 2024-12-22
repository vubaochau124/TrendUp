import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import adminAuth from "../../../back-end/middleware/adminAuth";

export default function AdminRoute(){
    const token = localStorage.getItem('token');
    const admin = adminAuth(token);
    return (
        admin ? <Navigate to='/' /> : <Navigate to='/login' />
    );
}