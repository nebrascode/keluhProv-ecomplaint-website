import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
  TablePagination,
  TextField,
  Paper,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";

const ListComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredComplaints, setFilteredComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get(
        "https://capstone-dev.mdrizki.my.id/api/v1/complaints?sort_by=id&sort_type=desc&limit=10&page=1",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_JWT}`,
          },
        }
      );
      console.log(response.data.data); // Logging data to console
      setComplaints(response.data.data);
      setFilteredComplaints(response.data.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = complaints.filter(
      (complaint) =>
        complaint.user.name.toLowerCase().includes(value) ||
        complaint.category.name.toLowerCase().includes(value) ||
        complaint.status.toLowerCase().includes(value)
    );
    setFilteredComplaints(filtered);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box p={4}>
      <TextField
        variant="outlined"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
        InputProps={{
          endAdornment: (
            <IconButton>
              <Search />
            </IconButton>
          ),
        }}
        fullWidth
        margin="normal"
        className="font-poppins"
      />
      <TableContainer component={Paper} className="font-poppins">
        <Table>
          <TableHead>
            <TableRow className="bg-dark-5">
              <TableCell>No</TableCell>
              <TableCell>No. Aduan</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Lokasi</TableCell>
              <TableCell>Tipe</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredComplaints
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((complaint, index) => (
                <TableRow key={complaint.id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{complaint.id}</TableCell>
                  <TableCell>
                    {complaint.files && complaint.files.length > 0 ? (
                      <img
                        src={`https://storage.googleapis.com/e-complaint-assets/${complaint.files[0].path}`}
                        alt="Complaint"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </TableCell>
                  <TableCell>{complaint.regency.name}</TableCell>
                  <TableCell>{complaint.type}</TableCell>
                  <TableCell>{complaint.user.name}</TableCell>
                  <TableCell>{complaint.category.name}</TableCell>
                  <TableCell>{complaint.status}</TableCell>
                  <TableCell>
                    {new Date(complaint.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/complaints/${complaint.id}`}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Detail
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredComplaints.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="font-poppins"
        />
      </TableContainer>
    </Box>
  );
};

export default ListComplaint;
