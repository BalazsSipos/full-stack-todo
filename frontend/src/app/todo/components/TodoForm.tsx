import { Button, Card, CardActions, CardContent, CardHeader, Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { DateTime } from 'luxon';

import { AuthContext } from '../../common/components/AuthContext';
import { GlassSurface } from '../../common/components/GlassSurface';
import { LoadingButton } from '@mui/lab';
import { Todo } from '../models/Todo';
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTodoCreation, useTodoPatch } from '../../common/hooks/queries/use-todo';

interface Props {
  todo?: Todo;
  onFinish?: () => unknown;
}

export const TodoForm = ({ todo, onFinish }: Props) => {
  const context = useContext(AuthContext);
  const firebaseUser = context?.firebaseUser;

  const { email } = useParams();
  const [token, setToken] = useState('invalid');

  useEffect(() => {
    if (firebaseUser) {
      firebaseUser.getIdToken().then((idToken) => {
        setToken(idToken);
      });
    }
  }, [firebaseUser]);
  const form = useRef<HTMLFormElement | null>();
  const [startingDate, setStartingDate] = useState(todo?.startingDate ? DateTime.fromISO(todo.startingDate) : null);
  // const [createdAt, setCreatedAt] = useState(todo?.createdAt ? DateTime.fromISO(todo.createdAt) : null)

  const createTodo = useTodoCreation(email ?? '', token);
  const updateTodo = useTodoPatch(email ?? '', token, Number(todo?.id));

  const loading = createTodo.isLoading || updateTodo.isLoading;

  const reset = () => {
    form.current?.reset();
    // setCreatedAt(todo?.createdAt ? DateTime.fromISO(todo.createdAt) : null)
    setStartingDate(todo?.startingDate ? DateTime.fromISO(todo.startingDate) : null);
  };

  const onSuccess = () => {
    console.log('success');
    reset();
    onFinish?.();
  };

  const save = () => {
    if (!form.current || !email) {
      return;
    }
    if (!form.current.reportValidity()) {
      return;
    }

    const data = new FormData(form.current);
    const newTodo: Partial<Todo> = {
      id: todo?.id ?? undefined,
      title: (data.get('title') as string) ?? '',
      description: (data.get('description') as string) ?? '',
      category: (data.get('category') as string) ?? '',
      location: (data.get('location') as string) ?? '',
      progress: Number(data.get('progress')) ?? 0,
      startingDate: startingDate?.toISODate() ?? undefined,
      performedByEmail: (data.get('performedBy') as string) ?? '',
    };
    if (todo) {
      updateTodo.mutate(newTodo, { onSuccess });
    } else {
      createTodo.mutate(newTodo, { onSuccess });
    }
  };

  return (
    <GlassSurface component={Card}>
      <CardHeader title={todo ? 'Edit todo' : 'New todo'} />
      <CardContent component="form" ref={form as any}>
        <Stack spacing={2}>
          <TextField name="title" label="Title" defaultValue={todo?.title} disabled={loading} />
          <TextField
            name="description"
            label="Description"
            multiline
            defaultValue={todo?.description}
            disabled={loading}
          />
          <TextField name="category" label="Category" defaultValue={todo?.category} disabled={loading} />
          <TextField name="location" label="Location" defaultValue={todo?.location} disabled={loading} />
          <TextField name="progress" label="Progress" defaultValue={todo?.progress} disabled={loading} />
          <DatePicker
            label="Starting date"
            value={startingDate}
            onChange={setStartingDate}
            disabled={loading}
            renderInput={(params) => (
              <TextField name="startingDate" {...params} helperText={params?.inputProps?.placeholder} />
            )}
          />
          <TextField
            name="performedBy"
            label="Performed by"
            defaultValue={todo?.performedBy.email}
            disabled={loading}
          />
        </Stack>
      </CardContent>
      <CardActions>
        <LoadingButton variant="contained" color="primary" onClick={save} loading={loading}>
          Save
        </LoadingButton>
        {!todo ? null : (
          <Button disabled={loading} variant="text" onClick={onFinish} color="primary">
            Cancel
          </Button>
        )}
      </CardActions>
    </GlassSurface>
  );
};
