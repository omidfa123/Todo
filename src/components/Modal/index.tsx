import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { useDispatchContext } from '../../context/DispatchContext';
import { useEffect, useState } from 'react';
import { uniqueId } from 'lodash';

import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import 'react-multi-date-picker/styles/layouts/mobile.css';
import weekends from 'react-multi-date-picker/plugins/highlight_weekends';
import persian_fa from 'react-date-object/locales/persian_fa';

interface Itodo {
  id: string;
  title: string;
  description: string;
  date: DateObject | null | string;
  priority: string | number;
  priorityColor: string;
  status: string | number;
  StatusColor: string;
}
export default function Modal() {
  const { state, dispatch } = useDispatchContext();
  const [edit, editId] = state.isEdit;
  const [view, viewId] = state.isView;
  const [todo, setTodo] = useState<Itodo>({
    id: '',
    title: '',
    description: '',
    date: new DateObject({ calendar: persian, locale: persian_fa }),
    priority: 'priority',
    priorityColor: '',
    status: 'Status',
    StatusColor: '',
  });
  useEffect(() => {
    if (edit) {
      setTodo(state.todos.find((todo: Itodo) => todo.id === editId));
    }
  }, [edit, editId, state.todos]);

  useEffect(() => {
    if (view) {
      setTodo(state.todos.find((todo: Itodo) => todo.id === viewId));
    }
  }, [view, viewId, state.todos]);

  return (
    <>
      <Dialog
        maxWidth="xl"
        open={state.isModalOpen}
        onClose={() => {
          setTodo({
            ...todo,
            id: '',
            title: '',
            description: '',
            date: new DateObject({ calendar: persian, locale: persian_fa }),
            priority: 'priority',
            priorityColor: '',
            status: 'Status',
            StatusColor: '',
          });
          dispatch({ type: 'CloseModal' });
        }}
      >
        <Box width="50rem">
          <DialogTitle>{edit ? 'Edit Task' : 'New Task'}</DialogTitle>
          <Divider />

          <DialogContent>
            <TextField
              fullWidth
              disabled={view}
              label="Task Name"
              sx={{ mb: '4rem' }}
              onChange={e => setTodo({ ...todo, title: e.target.value })}
              value={todo?.title}
            />
            <Box display="flex" alignItems="center" columnGap={3} mb={6}>
              <Select
                fullWidth
                disabled={view}
                labelId="priority-select-label"
                id="priority-select"
                value={todo?.priority}
                sx={{ my: 2 }}
                onChange={e => {
                  switch (e.target.value) {
                    case 'priority':
                      setTodo({
                        ...todo,
                        priorityColor: 'info',
                        priority: e.target.value,
                      });
                      return;
                    case 10:
                      setTodo({
                        ...todo,
                        priorityColor: 'default',
                        priority: e.target.value,
                      });
                      return;
                    case 20:
                      setTodo({
                        ...todo,
                        priorityColor: 'warning',
                        priority: e.target.value,
                      });
                      return;
                    case 30:
                      setTodo({
                        ...todo,
                        priorityColor: 'error',
                        priority: e.target.value,
                      });
                  }
                }}
              >
                <MenuItem value={'priority'}>priority</MenuItem>
                <MenuItem value={10}>Low</MenuItem>
                <MenuItem value={20}>Medium</MenuItem>
                <MenuItem value={30}>Hight</MenuItem>
              </Select>
              <Select
                fullWidth
                disabled={view}
                labelId="status-select-label"
                id="status-select"
                sx={{ my: 2 }}
                onChange={e => {
                  switch (e.target.value) {
                    case 'Status':
                      setTodo({
                        ...todo,
                        StatusColor: 'info',
                        status: e.target.value,
                      });
                      return;
                    case 'Done':
                      setTodo({
                        ...todo,
                        StatusColor: 'success',
                        status: e.target.value,
                      });
                      return;
                    case 'Doing':
                      setTodo({
                        ...todo,
                        StatusColor: 'warning',
                        status: e.target.value,
                      });
                      return;
                    case 'Todo':
                      setTodo({
                        ...todo,
                        StatusColor: 'error',
                        status: e.target.value,
                      });
                      return;
                  }
                }}
                value={todo?.status}
              >
                <MenuItem value={'Status'}>Status</MenuItem>
                <MenuItem value={'Todo'}>Todo</MenuItem>
                <MenuItem value={'Doing'}>Doing</MenuItem>
                <MenuItem value={'Done'}>Done</MenuItem>
              </Select>
              <DatePicker
                className="rmdp-mobile"
                disabled={view}
                style={{
                  height: '56px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  padding: '3px 10px',
                }}
                containerStyle={{ height: '55px' }}
                plugins={[weekends()]}
                calendar={persian}
                locale={persian_fa}
                value={todo?.date}
                onChange={date => setTodo({ ...todo, date: date?.format() })}
              ></DatePicker>
            </Box>
            <TextareaAutosize
              minRows={8}
              disabled={view}
              aria-label="Details (Optional)"
              placeholder="Details (Optional)"
              style={{
                borderRadius: '0.5rem',
                border: '1px solid #e0e0e0',
                padding: '1rem',
                resize: 'none',
                width: '100%',
              }}
              onChange={e => setTodo({ ...todo, description: e.target.value })}
              value={todo?.description}
            />
          </DialogContent>
          <Divider />
          <DialogActions sx={{ m: '1rem' }}>
            <Button
              sx={{ mr: 'auto' }}
              disabled={view}
              color="secondary"
              variant="outlined"
              onClick={() => {
                setTodo({
                  ...todo,
                  id: '',
                  title: '',
                  description: '',
                  date: new DateObject({
                    calendar: persian,
                    locale: persian_fa,
                  }),
                  priority: 'priority',
                  priorityColor: '',
                  status: 'Status',
                  StatusColor: '',
                });
                dispatch({ type: 'CloseModal' });
              }}
            >
              Cancel
            </Button>
            <Button
              disableElevation
              disabled={view}
              color="secondary"
              variant="contained"
              type="submit"
              onClick={() => {
                if (edit) {
                  dispatch({ type: 'UpdateTodo', payload: todo });
                  dispatch({ type: 'CloseModal' });
                } else {
                  dispatch({
                    type: 'AddTodo',
                    payload: { ...todo, id: uniqueId() },
                  });
                  setTodo({
                    ...todo,
                    id: '',
                    title: '',
                    description: '',
                    date: new DateObject({
                      calendar: persian,
                      locale: persian_fa,
                    }),
                    priority: 'priority',
                    priorityColor: '',
                    status: 'Status',
                    StatusColor: '',
                  });
                  dispatch({ type: 'CloseModal' });
                }
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
