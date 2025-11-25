
import { Routes, Route, Navigate } from "react-router-dom"
import DashboardLayout from "src/layouts/dashboard/Dashboard"
import Landing from "src/pages/Landing/Landing"
import routes from "src/config/routes"
import { v4 } from "uuid"
import Preview from "src/pages/Preview/Preview"
import AuthCallback from "src/pages/AuthCallback/AuthCallback"; // NEW


const MainRoute = () => {
    return (
        <Routes>
            <Route path='/' element={<Landing/>} />
            <Route path='/auth/callback' element={<AuthCallback />} /> 
            <Route path="/preview" element={<PreviewRedirect />} />
            <Route path='/' element={<DashboardLayout/>}>
                {/* {
                routes.filter(route => route.isPrivate).map((item, index)=>{
                    return (
                        <Route key={index} path={item.path} element={item.page} />
                    )
                })
                } */}
                <Route path="/preview/:contextId/chat" element={<Preview/>} />
            </Route>
            {
            routes.filter(route => !route.isPrivate && route.path !== '/').map((item, index)=>{
                return (
                    <Route key={index} path={item.path} element={item.page} />
                )
            })
            }
        </Routes>
    )
}

const PreviewRedirect = () => {
    return <Navigate to={`/preview/${v4()}/chat`} replace={true} />;
};

export default MainRoute
