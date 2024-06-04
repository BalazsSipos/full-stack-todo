import { Alert, Button, Card, CardActions, CardContent, CardHeader, Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { DateTime } from 'luxon';

import { AuthContext } from '../common/components/AuthContext';
import { ErrorList, validateIncomingFormData } from '../common/utils/validateIncomingFormData';
import { GlassSurface } from '../common/components/GlassSurface';
import { LoadingButton } from '@mui/lab';
import { Todo } from '../models/Todo';
import { incrementOwnTodoNumber } from '../store/user-slice';
import { useAppDispatch } from '../store/hooks';
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTodoCreation, useTodoPatch } from '../common/hooks/queries/use-todo';

interface Props {
  todo?: Todo;
  onFinish?: () => unknown;
}

export const TodoForm = ({ todo, onFinish }: Props) => {
  const context = useContext(AuthContext);
  const firebaseUser = context?.firebaseUser;

  const { email } = useParams();
  const [token, setToken] = useState('invalid');
  const [error, setError] = useState<ErrorList | null>(null);

  useEffect(() => {
    if (firebaseUser) {
      firebaseUser.getIdToken().then((idToken) => {
        setToken(idToken);
      });
    }
  }, [firebaseUser]);

  const dispatch = useAppDispatch();

  const form = useRef<HTMLFormElement>(null);
  const [startingDate, setStartingDate] = useState(todo?.startingDate ? DateTime.fromISO(todo.startingDate) : null);

  const createTodo = useTodoCreation(email ?? '', token);
  const updateTodo = useTodoPatch(email ?? '', token, Number(todo?.id));

  const errorObject = createTodo.error || updateTodo.error;

  let parsed;
  if (errorObject) {
    parsed = JSON.parse(errorObject.message ?? '{}');
  }

  const loading = createTodo.isLoading || updateTodo.isLoading;

  const reset = () => {
    form.current?.reset();
    setStartingDate(todo?.startingDate ? DateTime.fromISO(todo.startingDate) : null);
  };

  const onSuccess = () => {
    console.log('success');
    reset();
    onFinish?.();
  };

  const onSuccessCreate = () => {
    dispatch(incrementOwnTodoNumber());
    onSuccess();
  };

  const save = async () => {
    if (!form.current || !email) {
      return;
    }
    if (!form.current.reportValidity()) {
      return;
    }

    const data = new FormData(form.current);
    const newTodo = new Todo();
    newTodo.id = Number(todo?.id) ?? undefined;
    newTodo.title = data.get('title') as string;
    newTodo.description = data.get('description') as string;
    newTodo.category = data.get('category') as string;
    newTodo.location = data.get('location') as string;
    newTodo.progress = Number(data.get('progress'));
    newTodo.startingDate = startingDate?.toISODate();
    newTodo.performedByEmail = data.get('performedBy') as string;

    const valRes = await validateIncomingFormData(newTodo);

    if (valRes) {
      setError(valRes);
      return;
    } else {
      setError(null);
    }

    if (todo) {
      updateTodo.mutate(newTodo, { onSuccess });
    } else {
      createTodo.mutate(newTodo, { onSuccess: onSuccessCreate });
    }
  };

  return (
    <GlassSurface component={Card}>
      <CardHeader title={todo ? 'Edit todo' : 'New todo'} />
      <CardContent component="form" ref={form}>
        <Stack spacing={2}>
          <TextField name="title" label="Title" defaultValue={todo?.title} disabled={loading} />
          {(parsed?.title || error?.title) && (
            <Alert variant="filled" severity="error">
              {parsed?.title || error?.title}
            </Alert>
          )}
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
          {(parsed?.progress || error?.progress) && (
            <Alert variant="filled" severity="error">
              {parsed?.progress || error?.progress}
            </Alert>
          )}
          <DatePicker
            label="Starting date"
            value={startingDate}
            onChange={setStartingDate}
            disabled={loading}
            renderInput={(params) => (
              <TextField name="startingDate" {...params} helperText={params?.inputProps?.placeholder} />
            )}
          />
          {(parsed?.startingDate || error?.startingDate) && (
            <Alert variant="filled" severity="error">
              {parsed?.startingDate || error?.startingDate}
            </Alert>
          )}
          <TextField
            name="performedBy"
            label="Performed by"
            defaultValue={todo?.performedBy?.email}
            disabled={loading}
          />
          {(parsed?.performedByEmail || error?.performedByEmail) && (
            <Alert variant="filled" severity="error">
              {parsed?.performedByEmail || error?.performedByEmail}
            </Alert>
          )}
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
