import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Listposts from "./Listposts";
import Navbar from "./Navbar";
import Blogpost from "./Blogpost";
import Footer from "./Footer";
import "../components/App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <BrowserRouter>
          <Route exact path="/" component={Listposts} />
          <Route path="/:slug" component={Blogpost} />
        </BrowserRouter>
        <Footer />
      </React.Fragment>
    );
  }
}
export default App;
