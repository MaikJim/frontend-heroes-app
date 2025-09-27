import { Outlet } from "react-router"


const AdminLayout = () => {
    return (
        <div className="bg-blue-500">
            <Outlet />
        </div>
    )
}

export default AdminLayout
