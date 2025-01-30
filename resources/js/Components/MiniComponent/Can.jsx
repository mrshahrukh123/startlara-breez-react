import { useMemo } from "react";
import { usePage } from "@inertiajs/react";

const Can = ({ permission, role, children }) => {
    const { auth } = usePage().props;

    const hasAccess = useMemo(() => {
        if (!auth.user) return false;
        if (role && !auth.user.roles.includes(role)) return false;
        if (permission && !auth.user.permissions.includes(permission)) return false;
        return true;
    }, [auth, role, permission]);

    return hasAccess ? <>{children}</> : null;
};

export default Can;
