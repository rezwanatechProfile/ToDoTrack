
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
			<ToDoList />

			<Grid container spacing={1}>
      <Grid item xs={6}>
        <CompleteList />
      </Grid>
      <Grid item xs={6}>
        <PriorityList />
      </Grid>
    </Grid>


		</div>
	);
}

export default App;

