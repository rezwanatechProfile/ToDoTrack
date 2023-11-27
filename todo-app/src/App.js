
import "./App.css";
import { Grid } from "@mui/material";
import { ToDoList } from "./components/ToDoList";
import { CompleteList } from "./components/CompleteList";
import { PriorityList } from "./components/PriorityList";
// bootstrap
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <div className="App">
      <Grid container spacing={1}>
        {/* Centered top grid item */}
        <Grid item xs={12} md={12} lg={12}>
          <ToDoList />
        </Grid>

        {/* Two grid items in a row for md and lg screen, two rows for small screen */}
        <Grid item xs={12} md={6} lg={6}>
          <CompleteList />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <PriorityList />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

