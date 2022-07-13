import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatchContext } from '../../context/DispatchContext';
//
import { Search, SearchIconWrapper, StyledInputBase } from './searchStyle';

export default function Header() {
  const { dispatch } = useDispatchContext();

  return (
    <>
      <AppBar elevation={0} position="static">
        <Toolbar sx={{ px: '.7rem !important' }}>
          <FormatListBulletedRoundedIcon fontSize="large" sx={{ mr: 1 }} />
          <Typography variant="h5" component="h1" sx={{ mr: 'auto' }}>
            My To-Do Tasks
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
              onKeyUp={e => {
                dispatch({ type: 'Search', payload: e.target.value });
              }}
            />
          </Search>
          <IconButton
            aria-label="filter list"
            color="info"
            onClick={() => {
              dispatch({ type: 'DrawerOpen' });
            }}
          >
            <FilterAltIcon fontSize="large" />
          </IconButton>
          <IconButton
            aria-label="add"
            color="info"
            onClick={() => {
              dispatch({ type: 'OpenModal', payload: false });
            }}
          >
            <AddBoxIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
