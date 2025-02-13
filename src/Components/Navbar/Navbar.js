import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { ArrowLeft, Search } from "react-bootstrap-icons";
import { Container, Navbar, Form, Nav, Button } from "react-bootstrap";

const NavbarComponent = ({activeCategory, setActiveCategory}) => {
  const [professions, setProfessions] = useState([]);
  useEffect(() => {
    if (professions.length > 0) return;
    const FetchProfession = async () => {
      try {
        const url = await fetch(
          "https://lafs-atv.com/letsfame-admin/api/list_artise_api.php?page=1&pageSize=12"
        );
        const data = await url.json();
        if (data.status && data.data && data.data.posts) {
          let professionList = data.data.posts
            .map((post) => post.profession)
            .filter((profession) => profession && profession.trim() !== "");
          const uniqueProfessions = [...new Set(professionList)];
          setProfessions(["All", "Director", ...uniqueProfessions, "Dancer"]);
          console.log("Datas: ", uniqueProfessions);
        }
      } catch (error) {
        console.error("Error Fetching Data: ", error);
      }
    };
    FetchProfession();
  }, [professions]);
  return (
    <header>
      <Navbar className="bg-header py-3">
        <Container
          fluid
          className="px-4 d-flex align-items-center justify-content-between"
        >
          <div className="d-flex align-items-center">
            <Nav.Link href="/" className="me-3">
              <ArrowLeft size={20} />
            </Nav.Link>
            <Navbar.Brand href="/" className="fw-bold logo-title p-0">
              Book Artists
            </Navbar.Brand>
          </div>
          <Navbar.Collapse className="justify-content-end">
            <Form className="d-flex align-items-center g-1 bg-white search-icon p-1">
              <Search className="ps-1" size={17} />
              <Form.Control
                type="search"
                placeholder="Search"
                id="SearchInput"
                className="me-2 ms-1 shadow-none bg-transparent border-0 p-0"
                aria-label="Search"
                style={{ fontSize: "13px" }}
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Artist Category Section */}
      <div className="artist-cat py-1 bg-white w-100">
        <ul className="d-flex justify-content-center list-unstyled gap-2 p-1 mb-0">
          {professions.length > 0 ? (
            professions.map((profession, index) => (
              <li key={index}>
                <Button
                  variant="link"
                  className={`cat-btn text-decoration-none fw-normal text-muted text-dark ${activeCategory === profession? "active" : ""}`}
                  onClick={()=>setActiveCategory(profession)}
                >
                  {profession}
                </Button>
              </li>
            ))
          ) : ""}
        </ul>
      </div>
    </header>
  );
};

export default NavbarComponent;
