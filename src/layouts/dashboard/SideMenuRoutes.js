
import configIcon from "../../assets/icons/menu-icons/confiruration.svg"
import pluginIcon from "../../assets/icons/menu-icons/plugin.svg"
import responesIcon from "../../assets/icons/menu-icons/response-management.svg"
// import knowledgeIcon from "../../assets/icons/menu-icons/knowledge-base.svg"
import { v4 } from "uuid"

 const SideMenuRoutes = [

    {
        title: "Preview",
        path: `/preview/${v4()}/chat`,
        icon: configIcon,
    },
  ]

  export  default SideMenuRoutes
