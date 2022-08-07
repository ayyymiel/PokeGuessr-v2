import * as React from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';

const generalTheme = createTheme({
  palette: {
    mode: 'dark',
  }
});

export default function App() {
  return (
    <ThemeProvider theme={generalTheme}>
      <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                >
                  <MenuIcon />
              </IconButton>
              <Typography variant="h5" 
                component="div" 
                align="center" 
                sx={{flexGrow: 1}}>
                  Poke-dle!
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>

        <Stack>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              component="img"
              display="flex" 
              alignItems="center"
              justifyContent="center"
              sx ={{width: '10%',
                height: '10%',
                pt: 10
              }}
              src="https://lh3.googleusercontent.com/jTa4FrUwEXqPDoU0oCwALwZi8zQNWDnBcQTlFKcjw8N2WrpMpBWYRfh8ep01b9jaJWId3juig56Pf5johs-II6JDckFusUrv6qrboA=w600"
            />
            <Typography sx={{
              pt: 5, pb: 5
              }}>
                Who's that Pokemon?
            </Typography>
            <TextField id="filled-basic" label="Enter a Guess!" variant="filled" />
            <Button variant="submit" sx={{p: 2}}>Submit</Button>
          </Grid>
        </Stack>
          
    </ThemeProvider>
  );
}