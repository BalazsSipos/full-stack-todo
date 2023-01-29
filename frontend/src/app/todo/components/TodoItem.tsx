import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  CircularProgressProps,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import { DateTime } from 'luxon'
import { GlassSurface } from '../../common/components/GlassSurface'
import { MoreHoriz, SvgIconComponent } from '@mui/icons-material'
import { Todo } from '../models/Todo'
import { TodoForm } from './TodoForm'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useTodoDelete, useTodoPatch } from '../../common/hooks/queries/use-todo'
import BlockIcon from '@mui/icons-material/Block'
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import EditIcon from '@mui/icons-material/Edit'
import ForwardTwoToneIcon from '@mui/icons-material/ForwardTwoTone'
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone'
import LunchDiningTwoToneIcon from '@mui/icons-material/LunchDiningTwoTone'
import SportsRugbyTwoToneIcon from '@mui/icons-material/SportsRugbyTwoTone'

type CategoryInfo = {
  icon: SvgIconComponent
  backgroundColor: string
}

export const TodoItem = ({ todo }: { todo: Todo }) => {
  const { email } = useParams()
  const todoCategories: Map<string, CategoryInfo> = new Map()
  todoCategories.set('sport', { icon: SportsRugbyTwoToneIcon, backgroundColor: 'info.main' })
  todoCategories.set('food', { icon: LunchDiningTwoToneIcon, backgroundColor: 'secondary' })

  const [editMode, setEditMode] = useState(false)
  const patchTodo = useTodoPatch(email ?? '', Number(todo.id))
  const deleteTodo = useTodoDelete(email ?? '', Number(todo.id))

  const completed = () => {
    patchTodo.mutate({ completed: true })
  }

  const deleted = () => {
    deleteTodo.mutate()
  }

  const getIcon = (category: string) => {
    const Icon = todoCategories.get(category)?.icon
    return Icon ? <Icon /> : <MoreHoriz />
  }

  if (editMode) {
    return <TodoForm todo={todo} onFinish={() => setEditMode(false)} />
  }

  const CircularProgressWithLabel = (props: CircularProgressProps & { value: number }) => {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    )
  }

  const TodoCardHeader = ({ bgColor }: { bgColor: string }) => {
    return (
      <CardHeader
        sx={{ backgroundColor: bgColor }}
        title={
          <Tooltip title={todo.description}>
            <Typography variant="h6">{todo.title}</Typography>
          </Tooltip>
        }
        // avatar={<Tooltip title={todo.category}>{getIcon(todo.category)}</Tooltip>}
        action={
          <Stack direction="column" spacing={{ xs: 1 }}>
            {/* <Tooltip title={todo.completed ? 'Done' : 'Open. Created at ' + todo.createdAt}>
          {todo.completed ? <DoneIcon /> : <ListAltTwoToneIcon />}
        </Tooltip> */}
            <CircularProgressWithLabel value={todo.progress} />
          </Stack>
        }
      />
    )
  }

  const TodoCardContent = () => {
    return (
      <CardContent>
        {!patchTodo.isError ? null : (
          <Typography variant="body2" color="error">
            {JSON.stringify(patchTodo.error)}
          </Typography>
        )}
        <List dense disablePadding>
          <ListItem>
            <ListItemIcon>
              <Tooltip title={todo.category}>{getIcon(todo.category)}</Tooltip>
            </ListItemIcon>
            <ListItemText primary={todo.description} />
          </ListItem>
          <Stack direction="row">
            <ListItem>
              <ListItemIcon>
                <Tooltip title="Starting date">
                  <CalendarMonthTwoToneIcon />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary={DateTime.fromISO(todo.startingDate ?? '').toLocaleString(DateTime.DATE_MED)} />
            </ListItem>
            {!todo.location ? null : (
              <ListItem>
                <ListItemIcon>
                  <Tooltip title="Location">
                    <LocationOnTwoToneIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary={todo.location} />
              </ListItem>
            )}
          </Stack>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}></Box>
        </List>
        {!patchTodo.isError ? null : (
          <Typography variant="body2" color="error">
            {JSON.stringify(patchTodo.error)}
          </Typography>
        )}
      </CardContent>
    )
  }

  const TodoCardActions = ({ bgColor }: { bgColor: string }) => {
    return (
      <CardActions sx={{ backgroundColor: bgColor }}>
        <>
          <Stack direction="row" textAlign="right">
            <Tooltip title="Edit">
              <IconButton onClick={() => setEditMode(true)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Done">
              <IconButton onClick={() => completed()}>
                <CheckCircleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Obsolete">
              <IconButton onClick={() => deleted()}>
                <BlockIcon />
              </IconButton>
            </Tooltip>
          </Stack>
          <Grid container justifyContent="flex-end">
            <Stack direction="row">
              <Chip label={todo.createdBy.email.substring(0, 6)} color="primary" size="small" sx={{ mx: 1 }} />{' '}
              <ForwardTwoToneIcon />
              <Chip label={todo.performedBy.email.substring(0, 6)} color="primary" size="small" />
            </Stack>
          </Grid>
        </>
      </CardActions>
    )
  }

  return (
    <GlassSurface component={Card}>
      <TodoCardHeader bgColor="important.dark" />
      <TodoCardContent />
      <TodoCardActions bgColor="important.main" />
    </GlassSurface>
  )
}
