import Link from "next/link";
import { Fragment } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import ExpenseTable from "../../components/expense/expense-table";
import DailyPlot from "../../components/expense/daily-plot";
import MonthlyPlot from "../../components/expense/monthly-plot";
import CategoryPlot from "../../components/expense/category-plot";

const ExpensePage = () => {
  return (
    <Fragment>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Link href="/expense/new-expense" passHref>
            <Button
              variant="contained"
              sx={{ width: { xs: "100%", md: "auto" } }}
            >
              add new expense
            </Button>
          </Link>
        </Grid>

        <Grid item xs={12} md={4}>
          <DailyPlot />
        </Grid>

        <Grid item xs={12} md={4}>
          <MonthlyPlot />
        </Grid>

        <Grid item xs={12} md={4}>
          <CategoryPlot />
        </Grid>

        <Grid item xs={12}>
          <ExpenseTable />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ExpensePage;