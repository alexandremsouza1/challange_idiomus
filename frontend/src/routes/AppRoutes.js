import { Link, Route, Switch } from "react-router-dom";
import Schedule from "../pages/Schedule";
import Leaderboard from "../pages/Leaderboard";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (


    <Switch>
      <Route exact path="/" component={Schedule} />
      <Route exact path="/schedule" component={Schedule} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route component={NotFound} /> 
    </Switch>
  );
}

export default AppRoutes;