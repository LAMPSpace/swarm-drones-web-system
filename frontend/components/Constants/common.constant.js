const YES = 'Y';
const NO = 'N';

export const IS_ADMIN = YES;
export const IS_NORMAL_USER = NO;
export const USER_PERMISSIONS = ['admin', 'user'];

// DATA TABLE
export const SORT_ORDER = {
    ASC: 'asc',
    DESC: 'desc'
}
export const DEFAULT_SORT_ORDER = SORT_ORDER.ASC;
export const DEFAULT_PER_PAGE = 10;

// TOAST SETTINGS
export const TOAST_SETTINGS = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeButton: true,
}