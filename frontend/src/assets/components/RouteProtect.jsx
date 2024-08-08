import { Navigate, Outlet } from "react-router-dom";
import { useAndCompileContext } from "./context/CompileContext";


export const RouteProtect = () => {
const {payloadToken} = useAndCompileContext()

    if (!payloadToken | !localStorage.getItem("access") | !localStorage.getItem("refresh")) return <Navigate to={"/signin"} replace />

    return <Outlet />
}