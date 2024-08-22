import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Table, Dropdown, Pagination } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserPage = () => {
  const rowHeight = "75px";

  const [UserDetails, setUserDetails] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch users whenever the currentPage changes or when a search is initiated
  useEffect(() => {
    getUser(searchInput, currentPage);
  }, [currentPage]);

  // Fetch users from the backend
  const getUser = async (searchValue = "", page = 1) => {
    try {
      console.log(`Fetching data for page ${page} with search: ${searchValue}`);
      const response = await axios.get(`http://localhost:5000/api/user-details`, {
        params: { search: searchValue, page }
      });
      console.log(`Data received: ${response.data.return.length} users`);
      setUserDetails(response.data.return);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle search input change
  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  // Handle search form submit
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1); // Reset to the first page on new search
    getUser(searchInput, 1); // Start searching from page 1
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    console.log(`Changing to page ${pageNumber}`);
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-100 h-100">
      <div className=" mx-5 p-5">
        <div className=" table_container">
          <div className="d-flex justify-content-between align-items-center py-3">
            <div>
              <Form className="d-flex" onSubmit={handleSearchSubmit}>
                <Form.Control
                  value={searchInput}
                  onChange={handleSearchInput}
                  type="search"
                  placeholder="Search by Name, Email, or Phone"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success" type="submit">
                  Search
                </Button>
              </Form>
            </div>
            <div>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Role
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Admin</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Visitor</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Intern</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr className="text-center">
                <th>Id</th>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Role</th>
                <th colSpan={2}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {UserDetails?.map((profile, index) => (
                <tr style={{ height: rowHeight }} key={profile._id}>
                  <td>{(currentPage - 1) * 10 + index + 1}</td> {/* Adjust index for pagination */}
                  <td>
                    <img
                      width={60}
                      className=" rounded-circle"
                      src={profile.avatar.url}
                      alt="Loading"
                    />
                  </td>
                  <td>{profile.name}</td>
                  <td>{profile.email}</td>
                  <td>{profile.phone}</td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: profile.status ? "green" : "red"
                      }}
                    ></div>
                  </td>
                  <td>{profile.role}</td>

                  <td className="text-center">
                    <Button>Edit</Button>
                  </td>
                  <td className="text-center">
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination className="mt-4 d-flex justify-content-center">
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserPage;
