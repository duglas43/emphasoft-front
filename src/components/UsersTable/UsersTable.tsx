import React, { FC } from "react";
import { ORDER } from "@src/@types";
import { ApplicationExpandedDto } from "@src/@types";
import { ApplicationProfile } from "@src/components/ApplicationProfile/";
import {
  useGetApplicationsExpandedQuery,
  useUpdateApplicationMutation,
  useCreateApplicationMutation,
  useDeleteApplicationMutation,
  useGetMeQuery,
} from "@src/store/api/api";
import {
  DataGridPremium,
  DataGridPremiumProps,
  GridSortModel,
  GridPaginationModel,
  GridFilterModel,
  GridRowModel,
  GridLogicOperator,
} from "@mui/x-data-grid-premium";
import { getLocalizationLocaleText } from "../Table";
import { useApplicationsTableColumns, ApplicationsTableToolbar } from ".";

export interface ApplicationsTableProps extends Partial<DataGridPremiumProps> {
  additionalQueryParams?: Partial<ApplicationExpandedDto>;
}

export const ApplicationsTable: FC<ApplicationsTableProps> = (props) => {
  const { data: me } = useGetMeQuery();
  const [updateApplication, { isLoading: isUpdating }] =
    useUpdateApplicationMutation();
  const [createApplication, { isLoading: isCreating }] =
    useCreateApplicationMutation();
  const [deleteApplication, { isLoading: isDeleting }] =
    useDeleteApplicationMutation();
  const { columns } = useApplicationsTableColumns({
    onDelete: (id) => {
      deleteApplication(id);
    },
  });

  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    {
      field: "id",
      sort: "asc",
    },
  ]);
  const onSortModelChange = (newModel: GridSortModel) => {
    setSortModel(newModel);
  };

  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({
      page: 0,
      pageSize: 20,
    });

  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
    items: [
      {
        field: "statusCode",
        value: "",
        operator: "is",
        id: 123212,
      },
      {
        field: "responsibleId",
        value: "",
        operator: "is",
        id: 123214,
      },
    ],
    logicOperator: GridLogicOperator.And,
    quickFilterValues: [""],
  });

  const OnFilterModelChange = React.useCallback(
    (filterModel: GridFilterModel) => {
      if (filterModel.items.length === 0) return;
      setFilterModel(filterModel);
    },
    []
  );

  const processRowUpdate = async (
    newRow: GridRowModel<ApplicationExpandedDto>,
    oldRow: GridRowModel<ApplicationExpandedDto>
  ) => {
    try {
      const { id, ...patch } = newRow;
      await updateApplication({ id, patch }).unwrap();
      return newRow;
    } catch (e) {
      return oldRow;
    }
  };

  const handleAddClick = () => {
    createApplication({});
  };

  const { data, isLoading } = useGetApplicationsExpandedQuery({
    query: filterModel?.quickFilterValues?.[0] || "",
    statusCode: filterModel?.items?.find((item) => item.field === "statusCode")
      ?.value,
    responsibleId: filterModel?.items?.find(
      (item) => item.field === "responsibleId"
    )?.value,
    sort: sortModel[0]?.field || "id",
    order: (sortModel[0]?.sort?.toUpperCase() as ORDER) || "ASC",
    page: paginationModel.page,
    limit: paginationModel.pageSize,
    ...props.additionalQueryParams,
  });

  return (
    <>
      <DataGridPremium
        columns={columns}
        rows={data?.content || []}
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
        pagination
        paginationModel={paginationModel}
        pageSizeOptions={[20, 50, 100]}
        paginationMode="server"
        processRowUpdate={processRowUpdate}
        onPaginationModelChange={setPaginationModel}
        rowCount={data?.meta.totalCount || 0}
        filterModel={filterModel}
        disableRowGrouping
        disableAggregation
        onFilterModelChange={OnFilterModelChange}
        localeText={me ? getLocalizationLocaleText(me.language) : undefined}
        {...props}
        loading={
          isLoading || isUpdating || isCreating || isDeleting || props.loading
        }
        slots={{
          toolbar: ApplicationsTableToolbar,
          ...props.slots,
        }}
        getDetailPanelContent={({ row }) => (
          <ApplicationProfile application={row as ApplicationExpandedDto} />
        )}
        getDetailPanelHeight={({ row }) => "auto"}
        slotProps={{
          toolbar: {
            onAddClick: handleAddClick,
            ...props.slotProps?.toolbar,
          },
          filterPanel: {
            logicOperators: [GridLogicOperator.And],
            disableAddFilterButton: true,
            disableRemoveAllButton: true,
          },

          ...props.slotProps,
        }}
      />
    </>
  );
};
