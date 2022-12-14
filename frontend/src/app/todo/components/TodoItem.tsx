import { Card, CardActions, CardContent, CardHeader, Chip, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { DateTime } from 'luxon'
import { DirectionsRun, MoreHoriz, Work } from '@mui/icons-material'
import { Todo } from '../models/Todo'
import BlockIcon from '@mui/icons-material/Block'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import EditIcon from '@mui/icons-material/Edit'

export const TodoItem = ({ todo }: { todo: Todo }) => {
  const todoCategories = {
    sport: DirectionsRun,
    work: Work,
  } as const

  const updateStatus = (status: string) => {
    /* TODO */ status
  }
  const setEditMode = (editMode: boolean) => {
    /* TODO */ editMode
  }

  const getIcon = (category: string) => {
    const Icon = todoCategories[category]
    return Icon ? <Icon /> : <MoreHoriz />
  }

  return (
    <Card>
      <CardHeader title={<Typography variant="h6">{todo.title}</Typography>} avatar={getIcon(todo.category)} />
      <CardContent>
        <Typography sx={{ textAlign: 'justify' }}>{todo.startingDate}</Typography>

        <Stack direction="row">
          <>
            Assigned to {todo.performedBy.name} by {todo.createdBy.name} on{' '}
            {DateTime.fromISO(todo.createdAt ?? '').toLocaleString(DateTime.DATE_MED)}
          </>
        </Stack>
      </CardContent>
      <CardActions>
        <>
          <Chip label="active" color="primary" size="small" sx={{ mx: 1 }} />
          <Tooltip title="Edit">
            <IconButton onClick={() => setEditMode(true)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Done">
            <IconButton onClick={() => updateStatus('Done')}>
              <CheckCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Obsolete">
            <IconButton onClick={() => updateStatus('Obsolete')}>
              <BlockIcon />
            </IconButton>
          </Tooltip>
        </>
      </CardActions>
    </Card>
  )
}
