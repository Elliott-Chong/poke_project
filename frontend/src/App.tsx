import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useGlobalContext } from "./context";
import PrivateRoute from "./components/PrivateRoute";
import AllPokemonsPage from "./pages/AllPokemonsPage";
import OwnedPokemons from "./pages/OwnedPokemons";
import CatchPokemonPage from "./pages/CatchPokemonPage";

interface Props {}

const App: React.FC<Props> = () => {
  const { loadUser, state } = useGlobalContext();
  const { loading, is_authenticated } = state;
  const location = useLocation();

  useEffect(() => {
    loadUser();
  }, [loadUser, location]);

  return (
    <>
      <Navbar />
      <Switch>
        <Route
          path="/register"
          exact
          component={() =>
            !loading && !is_authenticated ? (
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
        <Route exact path="/" component={AllPokemonsPage} />
        <PrivateRoute exact path="/pokemons/owned" component={OwnedPokemons} />
        <PrivateRoute
          exact
          path="/pokemons/catch"
          component={CatchPokemonPage}
        />
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
