import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import { useGlobalContext } from "./context";
import PrivateRoute from "./components/PrivateRoute";
import AllPokemonsPage from "./pages/AllPokemonsPage";
import OwnedPokemons from "./pages/OwnedPokemons";
// import DetailsPage from "./pages/DetailsPage";

interface Props {}

const App: React.FC<Props> = () => {
  const { loadUser, state } = useGlobalContext();
  const { loading, is_authenticated } = state;

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route
          path="/register"
          exact
          component={() =>
            !loading && is_authenticated ? (
              <RegisterPage />
            ) : (
              <Redirect to={"/"} />
            )
          }
        />
        <Route
          path="/login"
          exact
          component={() =>
            !loading && !is_authenticated ? (
              <LoginPage />
            ) : (
              <Redirect to={"/"} />
            )
          }
        />
        <Route exact path="/pokemons/all" component={AllPokemonsPage} />
        <PrivateRoute exact path="/pokemons/owned" component={OwnedPokemons} />
      </Switch>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
