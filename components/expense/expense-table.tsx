import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridEventListener,
} from "@mui/x-data-grid";

// flex defines ratio for column width
const columns: GridColDef[] = [
  {
    field: "date",
    headerName: "Date",
    type: "date",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "item",
    headerName: "Category",
    type: "string",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "place",
    headerName: "Place",
    type: "string",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
];

const ExpenseTable = () => {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const url = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/expenses`;
      const response = await fetch(url);
      const fetchedData = await response.json();

      setRows(fetchedData);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    router.push(`/expense/update-expense/${params.id}`);
  };

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[100, 200]}
        onRowClick={handleRowClick}
        density="compact"
        loading={isLoading}
        components={{
          LoadingOverlay: LinearProgress,
        }}
      />
    </div>
  );
};

export default ExpenseTable;