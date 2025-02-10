import { Navigate, useLocation } from "react-router-dom";

export function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation();

    // Nếu chưa đăng nhập và không phải trang login hoặc register
    if (!isAuthenticated &&
        !(location.pathname.includes('/login') || location.pathname.includes('/register'))) {
        // Chuyển hướng đến trang đăng nhập
        return <Navigate to='/auth/login' />
    }

    // Nếu đã đăng nhập và đang truy cập trang login hoặc register
    if (isAuthenticated && (location.pathname.includes('/login') ||
        location.pathname.includes('/register'))) {
        // Nếu là admin, chuyển hướng đến dashboard admin
        if (user?.role === 'admin') {
            return <Navigate to='/admin/dashboard' />
        } else {
            // Nếu không phải admin, chuyển hướng đến trang chủ của shop
            return <Navigate to='/shop/home' />
        }
    }

    // Nếu đã đăng nhập, không phải admin và cố gắng truy cập trang admin
    if (isAuthenticated && user?.role !== 'admin' &&
        location.pathname.includes('/admin')) {
        // Chuyển hướng đến trang thông báo không có quyền truy cập
        return <Navigate to='/unauth-page' />
    }

    // Nếu đã đăng nhập, là admin và cố gắng truy cập trang shop
    if (isAuthenticated && user?.role === 'admin' &&
        location.pathname.includes('/shop')) {
        // Chuyển hướng đến dashboard admin
        return <Navigate to='/admin/dashboard' />
    }

    // Nếu không vi phạm bất kỳ điều kiện nào, hiển thị nội dung của children
    return <>
        {children}
    </>;
}
