import { CardContent, Grid, Typography } from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { useTodoList } from "../../common/hooks/queries/use-todo";
import { TodoItem } from "./TodoItem";

const EmptyListCard = () => (
  <CardContent sx={{ textAlign: "center" }}>
    <SentimentDissatisfiedIcon />
    <Typography>It&apos;s so empty here</Typography>
  </CardContent>
);

export const TodoList = () => {
  const todoList = useTodoList();

  return (
<Grid
      container
      spacing={{ xs: 2, md: 4, lg: 8 }}
      sx={{ p: { xs: 2, md: 4 } }}
      columns={{ xs: 1, md: 6, lg: 9, xl: 12 }}
    >
      {todoList.map((todoItem) => (
        <Grid item xs={3} key={todoItem.id} justifyContent="center">
          <TodoItem todo={todoItem} />
        </Grid>
      ))}
      {todoList.length ? null : <EmptyListCard />}
    </Grid>

    // <>
    //   <Grid item xs={1}>
    //     <Stack spacing={2}>
    //       <Typography variant="h6">Todos</Typography>
    //       {todoList.map((todoItem) => (
    //         <TodoItem todo={todoItem} key={todoItem.id} />
    //       ))}
    //       {todoList.length ? null : <EmptyListCard />}
    //     </Stack>
    //   </Grid>
    // </>
  )
};