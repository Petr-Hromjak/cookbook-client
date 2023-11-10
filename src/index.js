import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import RecipeDetail from "./routes/RecipeDetail";
import RecipeList from "./routes/Cookbook";
import IngredientList from "./routes/IngredientList";
import Home from "./routes/Home";
import RoutesConfig from "./routes/Routes"
import {UserProvider} from "./UserProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App/>}>
              <Route path={RoutesConfig.HOME} element={<Home/>}/>
              <Route path={RoutesConfig.RECIPE_DETAIL} element={<RecipeDetail/>}/>x
              <Route path={RoutesConfig.RECIPE_LIST} element={<RecipeList/>}/>
              <Route path={RoutesConfig.INGREDIENT_LIST} element={<IngredientList/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
