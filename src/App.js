import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Routes from "./routes/Routes";

const cookbook = {
  name: "Rychlé a chutné večeře",
};

function App() {
  let navigate = useNavigate();

  return (
      <div className="App">
        <Navbar
            fixed="top"
            expand={"sm"}
            className="mb-3"
            bg="primary-subtle"
        >
          <Container fluid>
            <Navbar.Brand onClick={() => navigate("/")}>
              {cookbook.name}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
            <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                  {cookbook.name}
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link>
                    <button className="btn btn-primary" type="button" onClick={() => navigate(Routes.RECIPE_LIST)}>Recepty</button>
                  </Nav.Link>
                  <Nav.Link>
                    <button className="btn btn-success" type="button" onClick={() => navigate(Routes.INGREDIENT_LIST)}>Ingredience</button>
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        <Outlet />
      </div>
  );
}

export default App;
