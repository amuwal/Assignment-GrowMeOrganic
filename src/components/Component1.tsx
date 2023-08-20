import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 150,
    editable: true,
  },
  {
    field: "userId",
    headerName: "User ID",
    width: 150,
    editable: true,
  },
  {
    field: "title",
    headerName: "Title",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "completed",
    headerName: "Completed",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const Component1 = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      userId: 1,
      title: "",
      completed: 1,
    },
  ]);

  const setData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    setData();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Component 1: Data-Grid
      </h2>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default Component1;
