import { GridColDef } from "@mui/x-data-grid";
import { User } from "@src/@types";

export const UsersTableColumns: GridColDef<User>[] = [
  {
    field: "id",
    headerName: "ID",
    flex: 0.1,
    sortable: false,
    type: "number",
    minWidth: 50,
  },
  {
    field: "username",
    headerName: "Username",
    flex: 0.2,
    sortable: false,
    minWidth: 150,
  },
  {
    field: "first_name",
    headerName: "First name",
    flex: 0.3,
    sortable: false,
    minWidth: 200,
  },
  {
    field: "last_name",
    headerName: "Last name",
    flex: 0.2,
    sortable: false,
    minWidth: 150,
  },
];
