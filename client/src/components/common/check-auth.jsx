/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";

export function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation();

    console.log(location.pathname, isAuthenticated);


    // Nếu chưa đăng nhập và không phải trang login hoặc register
    if (!isAuthenticated &&
        !(
            location.pathname.includes('/login') ||
            location.pathname.includes('/register')
        )) {
        return <Navigate to='/auth/login' />
    }

    // Nếu đã đăng nhập và đang truy cập trang login hoặc register
    if (isAuthenticated && (location.pathname.includes('/login') ||
        location.pathname.includes('/register'))) {
        if (user?.role === 'admin') {
            return <Navigate to='/admin/dashboard' />
        } else {
            return <Navigate to='/shop/home' />
        }
    }

    // Nếu đã đăng nhập, không phải admin và cố gắng truy cập trang admin
    if (isAuthenticated && user?.role !== 'admin' &&
        location.pathname.includes('/admin')) {
        return <Navigate to='/unauth-page' />
    }

    // Nếu đã đăng nhập, là admin và cố gắng truy cập trang shop
    if (isAuthenticated && user?.role === 'admin' &&
        location.pathname.includes('/shop')) {
        return <Navigate to='/admin/dashboard' />
    }
    return <>
        {children}
    </>;
}
