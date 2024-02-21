import { toast } from 'react-toastify';

export const SuccessNotify = (e) => toast.success(e);

export const ErrorNotify = (e) => toast.error(e);