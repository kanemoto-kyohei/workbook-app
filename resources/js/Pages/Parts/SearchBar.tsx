import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.65),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchBar({onSearch,onSort}:{onSearch:(text:string)=>void,onSort:(order:'asc' | 'desc')=>void}) {
    const [searchText, setSearchText] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc'|'desc'| null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuAnchor,setMenuAnchor] = useState(null);


    const handleSearchChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
      };
    
      const handleKeyPress = (event:React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          onSearch(searchText);
        }
      };

      const handleMenuClick = (e:any) => {
        setIsMenuOpen(true);
        setMenuAnchor(e.target); 
    };

      const handleSort = (order:'asc'|'desc') => {
        setSortOrder(order);
        setIsMenuOpen(false);
        onSort(order);
      };
      

  return (
      <AppBar position="static" color="transparent" enableColorOnDark>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleMenuClick}

          >
            <MenuIcon 
            />
            </IconButton>
            <Menu
            open={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            anchorEl={menuAnchor}
            >
            <MenuItem onClick={() => handleSort('desc')}>難しい順</MenuItem>
            <MenuItem onClick={() => handleSort('asc')}>易しい順</MenuItem>
            </Menu>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            ShareLedge
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="検索…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchText}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
            />
          </Search>
        </Toolbar>
      </AppBar>
    
  );
}