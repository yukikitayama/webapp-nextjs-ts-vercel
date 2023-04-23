import { useRouter } from "next/router";

import ExpenseDetail from "../../../components/expense/expense-detail";

const UpdateExpensePage = () => {
  const router = useRouter();

  return <ExpenseDetail id={router.query.id as string} />;
};

export default UpdateExpensePage;