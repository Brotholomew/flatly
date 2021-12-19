import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export interface NotificationInterface {
    title: string,
    message?: string
}

const defaultSettings = {
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
}

const useNotification = () => {
    const toast = (data: any) => {
        MySwal.fire({
            ...defaultSettings,
            ...data
        });
    };

    const success = (data: NotificationInterface) => {
        toast({
            ...data,
            icon: 'success',
        });
    };

    const error = (data: NotificationInterface) => {
        toast({
            ...data,
            icon: 'error',
        });
    };

    const info = (data: NotificationInterface) => {
        toast({
            ...data,
            icon: 'info',
        });
    };

    const warning = (data: NotificationInterface) => {
        toast({
            ...data,
            icon: 'warning',
        });
    };

    return {
        success,
        error,
        info,
        warning,
        toast
    }
}

export default useNotification;