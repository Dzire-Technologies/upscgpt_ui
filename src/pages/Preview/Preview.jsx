import DashboardBody from "src/layouts/dashboard/DashboadBody"
import PreviewChatBox from "./ChatBox"
// import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "src/components/Loading/Loading"


const Preview = ()=>{ 
    // const { user, loading } = useAuth0();

    return(
        <DashboardBody title="Preview" containerStyle={{padding: "0px 0px", height: "calc(100vh - 80px)"}}>
            <PreviewChatBox/>
        </DashboardBody>
    )
}


export default Preview
// export default (Preview, {
//   onRedirecting: () => <div>Loading...</div>,
// });