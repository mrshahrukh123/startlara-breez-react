import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { usePage } from '@inertiajs/react';

const ToastNotifier = () => {
    const { props } = usePage();
    const { success, error } = props;

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
        if (error) {
            toast.error(error);
        }
    }, [success, error]);

    return null;
};

export default ToastNotifier;
