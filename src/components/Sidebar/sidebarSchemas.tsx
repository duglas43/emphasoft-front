import GroupIcon from "@mui/icons-material/Group";

export interface SidebarSchema {
  text: string;
  link: string;
  icon: JSX.Element;
}

export const SIDEBAR_SCHEMA: SidebarSchema[] = [
  {
    text: "Users",
    link: "/",
    icon: <GroupIcon />,
  },
];
