
import Preview from "src/pages/Preview/Preview";
import Chat from "src/pages/Chat/Chat";

const  routes = [

    {
        title: "chatContext",
        path: "/preview/:contextId/chat",
        icon: "",
        page: <Preview/>,
        isPrivate: true
    },

  ]


  export default routes
