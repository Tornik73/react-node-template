import { toast } from 'react-toastify';


export const ToastService = {
    showGreenMessage: (message: string): void => {
        toast.success(message);
    },
    showRedMessage(message: string): void {
        toast.error(message);
    }
}
