import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Grid, Typography } from '@mui/material';
import DashboardTemplate from '../components/DashboardTemplate';
import AllRoutes from "../routes";
import AppContextProvider from "../context";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2a9461"
    },
    secondary: {
      main: "#494c7d"
    }
  }
});

function App() {
  return (
    <AppContextProvider>
      <ThemeProvider theme={theme}>
        <Grid container>
          <DashboardTemplate>
            <AllRoutes/>
          </DashboardTemplate>
        </Grid>
      </ThemeProvider>
    </AppContextProvider>
  );
}

export default App;
