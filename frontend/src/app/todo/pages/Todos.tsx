import { Grid } from '@mui/material'
import { TodoForm } from '../components/TodoForm'
import { TodoList } from '../components/TodoList'

export const Todos = () => {
 
  return (
    <Grid container columns={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4 }} direction="row" spacing={{ xs: 2, md: 4, lg: 8 }}>
      <Grid item xs={1}>
        <TodoForm />
      </Grid>
      <Grid item xs={1} sm={1} md={2} lg={2} xl={3}>
        <TodoList />
      </Grid>
    </Grid>
  )
}
