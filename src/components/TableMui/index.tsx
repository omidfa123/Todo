import { ArrowDownward, Delete, Edit, Visibility } from '@mui/icons-material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Chip,
  Box,
  IconButton,
} from '@mui/material';
import { useState } from 'react';
import { useDispatchContext } from '../../context/DispatchContext';

type ColorType =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning'
  | undefined;

interface Itodo {
  id: string;
  title: string;
  description: string;
  date: string;
  priority: string | number;
  priorityColor: ColorType;
  status: string | number;
  StatusColor: ColorType;
}

export default function TableMui() {
  const { state, dispatch } = useDispatchContext();
  const [priorityBtn, setPriorityBtn] = useState('hidden');
  const [statusBtn, setStatusBtn] = useState('hidden');
  const [dateBtn, setDateBtn] = useState('hidden');
  const [children, setChildren] = useState(0);
  const switchPriority = (p: number | string) => {
    switch (p) {
      case 10:
        return 'Low';
      case 20:
        return 'Medium';
      case 30:
        return 'High';
    }
  };

  const icons = [
    <IconButton
      disableFocusRipple
      disableRipple
      onMouseEnter={() => {
        setPriorityBtn('visible');
      }}
      onMouseLeave={() => {
        setPriorityBtn('hidden');
      }}
      onClick={() => {
        dispatch({ type: 'SortByPriorityHight' });
        setChildren(1);
      }}
      size="small"
      key={children}
    >
      <ArrowDownward sx={{ visibility: priorityBtn }} fontSize="small" />
    </IconButton>,
    <IconButton
      disableFocusRipple
      disableRipple
      onMouseEnter={() => {
        setPriorityBtn('visible');
      }}
      onMouseLeave={() => {
        setPriorityBtn('hidden');
      }}
      onClick={() => {
        dispatch({ type: 'SortByPriorityLow' });
        setChildren(2);
      }}
      size="small"
      key={children}
    >
      <ArrowDownward
        sx={{ visibility: priorityBtn }}
        color="primary"
        fontSize="small"
      />
    </IconButton>,
    <IconButton
      disableFocusRipple
      disableRipple
      onMouseEnter={() => {
        setPriorityBtn('visible');
      }}
      onMouseLeave={() => {
        setPriorityBtn('hidden');
      }}
      onClick={() => {
        dispatch({ type: 'SortByPriorityNone' });
        setChildren(0);
      }}
      key={children}
      size="small"
    >
      <ArrowUpwardIcon sx={{ visibility: priorityBtn }} fontSize="small" />
    </IconButton>,
  ];

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task Name</TableCell>
              <TableCell align="center">
                Priority
                {icons[children]}
              </TableCell>
              <TableCell align="center">
                Status
                <IconButton
                  disableFocusRipple
                  disableRipple
                  onMouseEnter={() => {
                    setStatusBtn('visible');
                  }}
                  onMouseLeave={() => {
                    setStatusBtn('hidden');
                  }}
                  size="small"
                >
                  <ArrowDownward
                    sx={{ visibility: statusBtn }}
                    fontSize="small"
                  />
                </IconButton>
              </TableCell>
              <TableCell align="center">
                Deadline
                <IconButton
                  disableFocusRipple
                  disableRipple
                  onMouseEnter={() => {
                    setDateBtn('visible');
                  }}
                  onMouseLeave={() => {
                    setDateBtn('hidden');
                  }}
                  size="small"
                >
                  <ArrowDownward
                    sx={{ visibility: dateBtn }}
                    fontSize="small"
                  />
                </IconButton>
              </TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.todos.map((todo: Itodo) => (
              <TableRow key={todo.id} hover>
                <TableCell> {todo.title} </TableCell>
                <TableCell padding="none" align="center">
                  <Chip
                    label={switchPriority(todo.priority)}
                    color={todo.priorityColor}
                    sx={{
                      fontWeight: 'bold !important ',
                      letterSpacing: '1px',
                    }}
                  />
                </TableCell>
                <TableCell padding="none" align="center">
                  <Chip
                    label={todo.status}
                    color={todo.StatusColor}
                    sx={{
                      fontWeight: 'bold !important ',
                      letterSpacing: '1px',
                    }}
                  />
                </TableCell>
                <TableCell padding="none" align="center">
                  <Chip
                    label={todo.date}
                    variant="outlined"
                    color="secondary"
                    sx={{ color: '#000 !important', letterSpacing: '1px' }}
                  />
                </TableCell>
                <TableCell padding="none" align="center">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    padding={0.9}
                    columnGap={0.7}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      bgcolor="#DC3545"
                      width="34px"
                      height="26px"
                      borderRadius="4px"
                    >
                      <IconButton
                        aria-label="delete"
                        color="info"
                        onClick={() => {
                          dispatch({ type: 'DeleteTodo', payload: todo.id });
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      bgcolor="#0D6EFD"
                      width="34px"
                      height="26px"
                      borderRadius="4px"
                    >
                      <IconButton
                        aria-label="edit"
                        color="info"
                        onClick={() => {
                          dispatch({ type: 'OpenModal' });
                          dispatch({ type: 'EditTodo', payload: todo.id });
                        }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      bgcolor="#6C757D"
                      width="34px"
                      height="26px"
                      borderRadius="4px"
                    >
                      <IconButton
                        aria-label="visibility"
                        color="info"
                        onClick={() => {
                          dispatch({ type: 'OpenModal' });
                          dispatch({ type: 'ViewTodo', payload: todo.id });
                        }}
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100, { value: -1, label: 'All' }]}
        component="div"
        count={state.todos.length}
        rowsPerPage={-1}
        page={0}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        sx={{
          marginTop: '1rem',
        }}
      />
    </>
  );
}
