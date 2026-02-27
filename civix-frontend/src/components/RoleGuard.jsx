import React from 'react';
import { useAuth } from '../context/AuthContext';

const RoleGuard = ({ role, children }) => {
    const { user } = useAuth();

    if (user?.role !== role) {
        return null;
    }

    return <>{children}</>;
};

export default RoleGuard;
