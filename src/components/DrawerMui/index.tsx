import {
  Box,
  Drawer,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useDispatchContext } from '../../context/DispatchContext';
import { useState } from 'react';

export default function DrawerMui() {
  const { state, dispatch } = useDispatchContext();
  const [priority, setPriority] = useState<string | number>(40);
  const [status, setStatus] = useState<string | number>(40);
  const [date, setDate] = useState<string | number>(40);

  return (
    <>
      <Drawer
        open={state.isDrawerOpen}
        anchor="right"
        onClose={() => {
          dispatch({ type: 'DrawerClose' });
        }}
      >
        <Box p={2} width="28rem">
          <Box
            mb={4}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" component="h6" pl="auto">
              Filters
            </Typography>
            <IconButton
              onClick={() => {
                dispatch({ type: 'DrawerClose' });
              }}
            >
              <Close />
            </IconButton>
          </Box>
          <FormControl fullWidth>
            <label>Priority:</label>
            <Select
              labelId="priority-select-label"
              id="priority-select"
              value={priority}
              sx={{ my: 2 }}
              onChange={e => {
                setPriority(e.target.value);
                dispatch({ type: 'Filter', payload: e.target.value });
              }}
            >
              <MenuItem value={10}>Low</MenuItem>
              <MenuItem value={20}>Medium</MenuItem>
              <MenuItem value={30}>Hight</MenuItem>
              <MenuItem value={40}>All</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <label>Status:</label>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={status}
              sx={{ my: 2 }}
              onChange={e => {
                setStatus(e.target.value);
              }}
            >
              <MenuItem value={10}>Todo</MenuItem>
              <MenuItem value={20}>Doing</MenuItem>
              <MenuItem value={30}>Done</MenuItem>
              <MenuItem value={40}>All</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <label>Deadline:</label>
            <Select
              labelId="deadline-select-label"
              id="deadline-select"
              value={date}
              sx={{ my: 2 }}
              onChange={e => {
                setDate(e.target.value);
              }}
            >
              <MenuItem value={10}>Overdue</MenuItem>
              <MenuItem value={20}>For Tody</MenuItem>
              <MenuItem value={30}>For the Future</MenuItem>
              <MenuItem value={40}>All</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Drawer>
    </>
  );
}
