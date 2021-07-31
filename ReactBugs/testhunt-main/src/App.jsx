import React from "react";
import Mainpage from "./pages/main/MainPage";
import Container from "./components/Container";
import Homepage from "./pages/treasure/Treasure";
import Bounties from "./pages/bounties/Bounties";
import Mine from "./pages/mine/Mine";
import Trove from "./pages/trove/Trove";
import Navbar from "./partials/Navbar";
import Misc from "./partials/Misc";

import About from "./pages/about/About";
import NftFamily from "./pages/nft-family/NftFamily";
import PlatformRoadmap from "./pages/platform-roadmap/PlatformRoadmap";
import Treasure from "./pages/treasure/Treasure";

import { createHashHistory } from "history";

import { Router, Switch, Route } from "react-router-dom";

const history = createHashHistory();

export class App extends React.Component {
  // handleMobileToggle = () => {
  //     document.body.classList.toggle("navbar-open");
  // }

  // componentDidMount() {
  //     history.listen(() => {
  //         document.body.classList.remove("navbar-open");
  //     });
  // }

  render() {
    return (
      <Router history={history}>
        {/* <Navbar handleMobileToggle={this.handleMobileToggle}/> */}
        <Container>
          <Switch>
            <Route path="/trove">
              <Trove />
            </Route>
            <Route path="/bounties">
              <Bounties />
            </Route>
            <Route path="/bitdiamond-token">
              <About />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/links">
              <About />
            </Route>
            <Route path="/safu">
              <About />
            </Route>
            <Route path="/nft-family">
              <NftFamily />
            </Route>
            <Route path="/community">
              <NftFamily />
            </Route>
            <Route path="/nft-trasure">
              <NftFamily />
            </Route>
            <Route path="/bts">
              <NftFamily />
            </Route>
            <Route path="/art-rewards">
              <NftFamily />
            </Route>
            <Route path="/platform-roadmap">
              <PlatformRoadmap />
            </Route>
            <Route path="/mine">
              <Mine />
            </Route>
            <Route path="/treasure">
              <Treasure />
            </Route>
            <Route path="/">
              {/* <Homepage /> */}
              <Mainpage />
            </Route>
          </Switch>
        </Container>
        <Misc />
      </Router>
    );
  }
}

export default App;
