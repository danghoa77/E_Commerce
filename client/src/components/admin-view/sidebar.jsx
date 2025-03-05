import { ChartNoAxesCombined, X } from "lucide-react";
import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BadgeCheck, LayoutDashboard, ShoppingBasket } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../../components/ui/sheet";



const adminSideBarMenuItems = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/admin/dashboard',
        icon: <LayoutDashboard />
    },
    {
        id: 'products',
        label: 'Products',
        path: '/admin/products',
        icon: <ShoppingBasket />
    },
    {
        id: 'orders',
        label: 'Orders',
        path: '/admin/orders',
        icon: <BadgeCheck />
    },

]

function MenuItems({ setOpen }) {
    const navigate = useNavigate();

    return (
        <nav className="mt-8 flex-col flex gap-2">
            {adminSideBarMenuItems.map((menuItem) => (
                <div
                    key={menuItem.id}
                    onClick={() => {
                        navigate(menuItem.path);
                        setOpen ? setOpen(false) : null;
                    }}
                    className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                    {menuItem.icon}
                    <span>{menuItem.label}</span>
                </div>
            ))}
        </nav>
    );
}

function AdminSideBar({ open, setOpen }) {

    const navigate = useNavigate();
    useEffect(() => {
        console.log("Sidebar Open State:", open); // Debug: Kiểm tra giá trị open
    }, [open]);
    return (
        <Fragment>
            <Sheet open={open} onOpenChange={(state) => {
                console.log("onOpenChange Triggered, New State:", state); // Debug
                setOpen(state);
            }}>
                {/* <SheetContent side="left" className="w-64">
                    <div className="flex flex-col h-full">
                        <SheetHeader className="border-b">
                            <SheetTitle>
                                <ChartNoAxesCombined size={30} />
                                Admin Panel
                            </SheetTitle>
                        </SheetHeader>
                        <MenuItems setOpen={setOpen} />
                    </div>
                </SheetContent> */}
                {open && (
                    <div className="fixed top-0 left-0 w-64 h-full bg-gray-900 text-white p-4">
                        <div className="flex flex-2 justify-between items-center">
                            <h2>Admin Panel</h2>
                            <X onClick={() => setOpen(false)} />
                        </div>

                        <MenuItems setOpen={setOpen} />

                    </div>
                )}

            </Sheet>
            <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
                <div onClick={() => navigate('/admin/dashboard')}
                    className="flex cursor-pointer items-xenter gap-2">
                    <ChartNoAxesCombined />
                    <h1 className=" text-2xl font-extrabold">Admin Panel</h1>
                </div>

                <MenuItems />

            </aside>
        </Fragment>
    );
}

export default AdminSideBar;