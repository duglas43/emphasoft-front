import React from "react";
import {
  GridColDef,
  GridActionsCellItem,
  getGridSingleSelectOperators,
} from "@mui/x-data-grid";
import { ROLES_IDS } from "@src/@types";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ChatIcon from "@mui/icons-material/Chat";
import { useGetUsersQuery } from "@src/store/api/api";
import { useNavigate } from "react-router-dom";
import { ApplicationExpandedDto, STATUS_CODES } from "@src/@types";

export interface useApplicationsTableColumnsProps {
  onDelete: (id: number) => any;
}
export const useApplicationsTableColumns = ({
  onDelete,
}: useApplicationsTableColumnsProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: clients } = useGetUsersQuery({
    query: "",
    roleId: ROLES_IDS.CLIENT,
  });
  const { data: engineers } = useGetUsersQuery({
    query: "",
    roleId: ROLES_IDS.ENGINEER,
  });
  const columns = React.useMemo<GridColDef<ApplicationExpandedDto>[]>(
    () => [
      {
        field: "id",
        headerName: t("id"),
        flex: 0.1,
        type: "number",
        filterable: false,
        minWidth: 50,
      },
      {
        field: "name",
        headerName: t("name"),
        flex: 0.2,
        editable: true,
        filterable: false,
        minWidth: 150,
      },
      {
        field: "description",
        headerName: t("description"),
        flex: 0.3,
        editable: true,
        filterable: false,
        minWidth: 200,
      },
      {
        field: "equipment",
        headerName: t("equipment"),
        flex: 0.2,
        editable: true,
        filterable: false,
        minWidth: 150,
      },
      {
        field: "creatorId",
        headerName: t("client"),
        flex: 0.2,
        type: "singleSelect",
        editable: true,
        valueOptions: clients?.content.map((client) => ({
          value: client.id,
          label: `${client.firstName} ${client.lastName} ${client.patronymic}`,
        })),
        filterable: false,
        minWidth: 150,
      },
      {
        field: "responsibleId",
        headerName: t("responsible"),
        flex: 0.2,
        type: "singleSelect",
        editable: true,
        valueOptions: engineers?.content.map((engineer) => ({
          value: engineer.id,
          label: `${engineer.firstName} ${engineer.lastName} ${engineer.patronymic}`,
        })),
        filterOperators: getGridSingleSelectOperators().filter(
          (operator) => operator.value === "is"
        ),
        minWidth: 150,
      },
      {
        field: "statusCode",
        headerName: t("status"),
        flex: 0.1,
        type: "singleSelect",
        editable: true,
        valueOptions: Object.keys(STATUS_CODES)
          .filter((key) => isNaN(Number(key)))
          .map((key: any) => ({
            value: STATUS_CODES[key],
            label: t(`statusCodes.${key}` as any),
          })),
        filterOperators: getGridSingleSelectOperators().filter(
          (operator) => operator.value === "is"
        ),
        minWidth: 100,
      },
      {
        field: "purchaseAt",
        headerName: t("purchaseAt"),
        flex: 0.1,
        type: "date",
        valueGetter: ({ value }) => value && new Date(value),
        valueFormatter: ({ value }) =>
          value && new Date(value).toLocaleDateString(),
        editable: true,
        filterable: false,
        minWidth: 100,
      },
      {
        field: "createdAt",
        headerName: t("createdAt"),
        flex: 0.1,
        type: "date",
        valueGetter: ({ value }) => value && new Date(value),
        valueFormatter: ({ value }) =>
          value && new Date(value).toLocaleDateString(),
        filterable: false,
        minWidth: 100,
      },
      {
        field: "guarantee",
        headerName: t("guarantee"),
        type: "boolean",
        flex: 0.05,
        editable: true,
        filterable: false,
        minWidth: 50,
      },
      {
        field: "actions",
        type: "actions",
        headerName: t("actions"),
        flex: 0.05,
        getActions: ({ row }) => [
          <GridActionsCellItem
            icon={<DeleteOutlineIcon />}
            label="Delete"
            aria-label="Delete"
            title="Delete"
            sx={{
              color: "primary.main",
            }}
            onClick={() => {
              onDelete(row.id);
            }}
          />,
          <GridActionsCellItem
            icon={<ChatIcon />}
            label="Chat"
            aria-label="Chat"
            title="Chat"
            sx={{
              color: "primary.main",
            }}
            onClick={() => {
              navigate(`/chat/${row.id}`);
            }}
          />,
        ],
        minWidth: 100,
      },
    ],
    [onDelete, t, clients, engineers, navigate]
  );
  const columnsDict = React.useMemo(() => {
    return columns.reduce((acc: any, column: any) => {
      acc[column.field] = column;
      return acc;
    }, {}) as applictionTableColumns;
  }, [columns]);

  return { columns, columnsDict };
};
