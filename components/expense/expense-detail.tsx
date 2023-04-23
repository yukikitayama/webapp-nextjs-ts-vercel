import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dayjs, { Dayjs } from "dayjs";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { expenseCategories, expenseTypes } from "../../utils/expense";
import {
  getLocalDateFromDatetime,
  getDatetimeFromLocalDate,
} from "../../utils/datetime";
import type { RootState } from "../../store/index";

interface ExpenseDetailProps {
  id?: string;
}

const ExpenseDetail: React.FC<ExpenseDetailProps> = (props) => {
  const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [category, setCategory] = useState("grocery");
  const [type, setType] = useState("normal");
  const [amount, setAmount] = useState<number | string>("");
  const [place, setPlace] = useState("");
  const [memo, setMemo] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mode, setMode] = useState("add-expense");
  const router = useRouter();
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const idToken = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (props.id) {
      const url = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/expenses?id=${props.id}`;
      const fetchData = async () => {
        const response = await fetch(url);
        const fetchedData = await response.json();
        const localDate = getDatetimeFromLocalDate(fetchedData.date);
        setDate(dayjs(localDate));
        setCategory(fetchedData.item);
        setType(fetchedData.type);
        setAmount(fetchedData.amount);
        setPlace(fetchedData.place);
        setMemo(fetchedData.memo);
        setDocumentId(fetchedData.id);
        setMode("update-expense");
      };

      setIsSubmitting(true);
      fetchData();
      setIsSubmitting(false);
    }
  }, [props.id]);

  const categoryChangeHandler = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
  const typeChangeHandler = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };
  const amountChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(+event!.target.value);
  };
  const placeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlace(event.target.value);
  };
  const memoChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemo(event.target.value);
  };

  const addHandler = async () => {
    setIsSubmitting(true);

    const dateString = getLocalDateFromDatetime(date!.toDate());
    const body = {
      date: dateString,
      item: category,
      type: type,
      amount: amount,
      place: place,
      memo: memo,
    };
    const url = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/expenses`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // This authorization is configured by Amazon Cognito and Amazon API Gateway
        Authorization: idToken!,
      },
      body: JSON.stringify(body),
    });

    response
      .json()
      .then((res) => {
        setIsSubmitting(false);
        router.push("/expense");
      })
      .catch((err) => {
        setIsSubmitting(false);
        alert(`Error: ${err}`);
      });
  };

  const updateHandler = async () => {
    setIsSubmitting(true);

    const dateString = getLocalDateFromDatetime(date!.toDate());
    // PUT needs MongoDB document ID to update one
    const body = {
      date: dateString,
      item: category,
      type: type,
      amount: amount,
      place: place,
      memo: memo,
      id: documentId,
    };
    const url = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/expenses`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // This authorization is configured by Amazon Cognito and Amazon API Gateway
        Authorization: idToken!,
      },
      body: JSON.stringify(body),
    });

    response
      .json()
      .then((data) => {
        setIsSubmitting(false);
        router.push("/expense");
      })
      .catch((error) => {
        setIsSubmitting(false);
        alert(`Error: ${error}`);
      });
  };

  const deleteHandler = async () => {
    setIsSubmitting(true);

    const body = { id: documentId };
    const url = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/expenses`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // This authorization is configured by Amazon Cognito and Amazon API Gateway
        Authorization: idToken!,
      },
      body: JSON.stringify(body),
    });

    response
      .json()
      .then((data) => {
        setIsSubmitting(false);
        router.push("/expense");
      })
      .catch((error) => {
        setIsSubmitting(false);
        alert(`Error: ${error}`);
      });
  };

  const addExpenseButtons = (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" disabled={!isAuth} onClick={addHandler}>
        Submit
      </Button>
      <Link href="/expense" passHref>
        <Button variant="contained" color="warning">
          Cancel
        </Button>
      </Link>
    </Stack>
  );

  const updateExpenseButtons = (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" disabled={!isAuth} onClick={updateHandler}>
        Update
      </Button>
      <Link href="/expense" passHref>
        <Button variant="contained" color="warning">
          Cancel
        </Button>
      </Link>
      <Button
        variant="contained"
        color="error"
        disabled={!isAuth}
        onClick={deleteHandler}
      >
        Delete
      </Button>
    </Stack>
  );

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item sx={{ width: { xs: "100%", md: "70%" } }}>
        <Card>
          <CardHeader title="Add new expense" />
          <CardContent>
            <Stack spacing={1}>
              <DesktopDatePicker
                label="Date *"
                value={date}
                onChange={(newValue) => setDate(newValue)}
              />
              <FormControl fullWidth>
                <InputLabel id="category-label">Category *</InputLabel>
                <Select
                  labelId="category-label"
                  value={category}
                  label="Category *"
                  onChange={categoryChangeHandler}
                >
                  {expenseCategories.map((expenseCategory) => (
                    <MenuItem
                      key={expenseCategory.value}
                      value={expenseCategory.value}
                    >
                      {expenseCategory.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
              <FormControl>
                <InputLabel id="type-label">Type *</InputLabel>
                <Select
                  labelId="type-label"
                  value={type}
                  label="Type *"
                  onChange={typeChangeHandler}
                >
                  {expenseTypes.map((expenseType) => (
                    <MenuItem key={expenseType.value} value={expenseType.value}>
                      {expenseType.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
              <TextField
                label="Amount"
                value={amount}
                onChange={amountChangeHandler}
                variant="outlined"
                required
                type="number"
                inputProps={{ inputMode: "numeric", pattern: "[0-9.]*" }}
                helperText="Required"
              />
              <TextField
                label="Place"
                value={place}
                onChange={placeChangeHandler}
                variant="outlined"
                required
                helperText="Required"
              />
              <TextField
                label="Memo"
                value={memo}
                onChange={memoChangeHandler}
                variant="outlined"
              />
            </Stack>
          </CardContent>
          <CardActions>
            {mode === "add-expense" ? addExpenseButtons : updateExpenseButtons}
          </CardActions>
          {isSubmitting && <LinearProgress color="primary" />}
        </Card>
      </Grid>
    </Grid>
  );
};

export default ExpenseDetail;
