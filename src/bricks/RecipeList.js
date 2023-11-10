import React, {useState, useMemo, useContext} from "react";
import RecipeGridList from "./RecipeGridList";
import RecipeTableList from "./RecipeTableList";
import styles from "../css/recipe.module.css";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Icon from "@mdi/react";
import {mdiTable, mdiViewGridOutline, mdiMagnify, mdiPlus} from "@mdi/js";
import RecipeFormModal from "./RecipeFormModal";
import UserContext from "./../UserProvider"

const ViewState = {
  BIG_GRID: 'big_grid', SMALL_GRID: 'small_grid', TABLE: 'table',
};

function RecipeList(props) {
  const {isAuthorized} = useContext(UserContext);

  const [viewType, setViewType] = useState(ViewState.BIG_GRID);
  const [searchBy, setSearchBy] = useState("");
  const [addRecipeShow, setAddRecipeShow] = useState({
    state: false
  });
  const filteredRecipeList = useMemo(() => {
    return props.recipeList.filter((item) => {
      return (item.name
          .toLocaleLowerCase()
          .includes(searchBy.toLocaleLowerCase()) || item.description.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase()));
    });
  }, [props.recipeList, searchBy]);

  function handleSearch(event) {
    event.preventDefault();
    setSearchBy(event.target["searchInput"].value);
  }

  function handleSearchDelete(event) {
    if (!event.target.value) setSearchBy("");
  }

  const handleAddRecipeShow = () => setAddRecipeShow({state: true});
  const handleUpdateRecipeShow = (data) => setAddRecipeShow({state: true, data});


  function getChild(viewType) {
    return (<div className="container">
      {filteredRecipeList.length ? (<div className="container">
        <div className={"d-block d-md-none"}>
          {switchView(ViewState.SMALL_GRID)}
        </div>
        <div className={"d-none d-md-block"}>
          {switchView(viewType)}
        </div>
      </div>) : (<div style={{margin: "16px auto", textAlign: "center"}}>
        Nejsou žádné recepty k zobrazení.
      </div>)}
    </div>);
  }

  function switchView(viewType) {
    switch (viewType) {
      case ViewState.BIG_GRID:
        return <RecipeGridList recipeList={filteredRecipeList}
                               ingredientList={props.ingredientList}
                               handleAddRecipeShow={handleUpdateRecipeShow}
                               onDelete={(id) => props.onDelete(id)}
                               onError={(error) => props.onError(error)}
                               isBigCard={true}/>;
      case ViewState.SMALL_GRID:
        return <RecipeGridList recipeList={filteredRecipeList}
                               ingredientList={props.ingredientList}
                               handleAddRecipeShow={handleUpdateRecipeShow}
                               onDelete={(id) => props.onDelete(id)}
                               onError={(error) => props.onError(error)}
                               isBigCard={false}/>;
      case ViewState.TABLE:
        return <RecipeTableList recipeList={filteredRecipeList}
                                handleAddRecipeShow={handleUpdateRecipeShow}
                                onDelete={(id) => props.onDelete(id)}
                                onError={(error) => props.onError(error)}/>;
      default:
        return <RecipeGridList recipeList={filteredRecipeList}
                               ingredientList={props.ingredientList}
                               handleAddRecipeShow={handleUpdateRecipeShow}
                               onDelete={(id) => props.onDelete(id)}
                               onError={(error) => props.onError(error)}
                               isBigCard={false}/>;
    }
  }

  function switchViewType(viewType) {
    switch (viewType) {
      case ViewState.BIG_GRID:
        return ViewState.SMALL_GRID;
      case ViewState.SMALL_GRID:
        return ViewState.TABLE;
      case ViewState.TABLE:
        return ViewState.BIG_GRID;
      default:
        return ViewState.BIG_GRID;
    }
  }

  function chooseIcon(viewType) {
    switch (viewType) {
      case ViewState.BIG_GRID:
        return mdiViewGridOutline;
      case ViewState.SMALL_GRID:
        return mdiViewGridOutline;
      case ViewState.TABLE:
        return mdiTable;
      default:
        return mdiViewGridOutline;
    }
  }

  function chooseText(viewType) {
    switch (viewType) {
      case ViewState.BIG_GRID:
        return "Velká mřížka";
      case ViewState.SMALL_GRID:
        return "Malá mřížka";
      case ViewState.TABLE:
        return "Tabulka";
      default:
        return mdiViewGridOutline;
    }
  }

  return (<>
    <div>
      <Navbar collapseOnSelect expand="sm" bg="light">
        <div className="container-fluid">
          <Navbar.Brand>Seznam receptů</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse style={{justifyContent: "right"}}>
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                  id={"searchInput"}
                  style={{maxWidth: "150px"}}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={handleSearchDelete}
              />
              <Button
                  style={{marginRight: "8px"}}
                  variant="outline-success"
                  type="submit"
              >
                <Icon size={1} style={{verticalAlign: "top"}} path={mdiMagnify}/>
              </Button>
              {isAuthorized && <Button style={{marginRight: "8px"}}
                      variant="outline-success"
                      onClick={handleAddRecipeShow}
              >
                <div className={"row no-gutters "}>
                  <div className={"col-sm-12 col-md-2 px-md-1"}>
                    <Icon size={1} style={{verticalAlign: "top"}} path={mdiPlus}/>
                  </div>
                  <div className={"col-md-10 px-1 d-none d-md-block"}>
                    Vytvořit
                  </div>
                </div>
              </Button>}
              <Button
                  className={"d-none d-md-block"}
                  variant="outline-primary"
                  onClick={() => setViewType((currentState) => {
                    return switchViewType(currentState);
                  })}
              >
                <div className={"row no-gutters "}>
                  <div className={"col-sm-2 p-1"}>
                    <Icon size={1} style={{verticalAlign: "top"}} path={chooseIcon(viewType)}/>
                  </div>
                  <div className={"col-sm-10 p-1"}>
                    {chooseText(viewType)}
                  </div>
                </div>
              </Button>
            </Form>
          </Navbar.Collapse>
        </div>
      </Navbar>
      <div className={styles.recipeList}>
        {getChild(viewType)}
      </div>
    </div>
    <RecipeFormModal
        ingredientList={props.ingredientList}
        show={addRecipeShow.state}
        recipe={addRecipeShow.data}
        setAddRecipeShow={setAddRecipeShow}
        onComplete={(recipe) => props.onComplete(recipe)}

    />
  </>);
}

export default RecipeList;
