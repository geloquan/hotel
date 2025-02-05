import React, { useState, useEffect } from "react";
import { TableTemplate } from "../FldrClass/TableTemplate";
import {
  Form,
  Row,
  Col,
  Button,
  InputGroup,
  Card,
  Container,
} from "react-bootstrap";
import { SideBar } from "../FldrMain/SideBar";
import axios from "axios";

// Helper function to convert month name to month number (1-12)
const monthToNumber = (month) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return months.indexOf(month) + 1; // +1 because months are 1-indexed (1-12)
};

export default function Collection() {
  const [year, setYear] = useState("");
  const [incomeStatements, setIncomeStatements] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fromMonth, setFromMonth] = useState("");
  const [toMonth, setToMonth] = useState("");

  useEffect(() => {
    handleFilter();
  }, [toMonth, fromMonth, year]);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const columns = [
    { name: "Name", selector: (row) => row.clientName, sortable: true, width: "20%"},
    { name: "January", selector: (row) => row.january, sortable: true },
    { name: "February", selector: (row) => row.february, sortable: true },
    { name: "March", selector: (row) => row.march, sortable: true },
    { name: "April", selector: (row) => row.april, sortable: true },
    { name: "May", selector: (row) => row.may, sortable: true },
    { name: "June", selector: (row) => row.june, sortable: true },
    { name: "July", selector: (row) => row.july, sortable: true },
    { name: "August", selector: (row) => row.august, sortable: true },
    { name: "September", selector: (row) => row.september, sortable: true },
    { name: "October", selector: (row) => row.october, sortable: true },
    { name: "November", selector: (row) => row.november, sortable: true },
    { name: "December", selector: (row) => row.december, sortable: true },
    { name: "TOTAL", selector: (row) => row.total, sortable: true },
  ];

  // Fetch the income statement data from the API
  const fetchIncomeStatements = async () => {
    console.log('fetchIncomeStatements');
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5103/api/income-statement', {
        params: {
          companyname: 'YourCompanyName',
          year: year,
          frommonth: monthToNumber(fromMonth),
          tomonth: monthToNumber(toMonth),      // Convert to integer
        },
      });
      console.log(response.data);
      setIncomeStatements(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching income statements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Apply filtering to the fetched income statement data
  const handleFilter = () => {
    console.log('handleFilter');
    console.log('year ', year);
    console.log('fromMonth ', fromMonth);
    console.log('toMonth ', toMonth);
    if (!year || !fromMonth || !toMonth) {
      return; // Exit early if any field is missing
    }
    console.log('triggered');
    fetchIncomeStatements();
  };

  return (
    <Container fluid>
      <Row className="h-100">
        {/* Sidebar */}
        <Col md={3} lg={2} className="bg-light p-0 min-vh-100">
          <SideBar />
        </Col>

        {/* Main Content Column */}
        <Col md={9} lg={10} className="mt-4 px-5 mr-5">
          <Card className="shadow-sm">
            <Card.Header className="bg-light">
              <Row className="align-items-center">
                <Col md="auto">
                  <h3 className="fs-4 mb-0">Collections</h3>
                </Col>

                <Col>
                  <Row className="g-2">
                    <Col md={2}>
                      <InputGroup>
                        <InputGroup.Text>Year</InputGroup.Text>
                        <Form.Select
                          value={year}
                          onChange={(e) => {setYear(e.target.value)}}
                        >
                          <option value="">Select Year</option>
                          {Array.from({ length: 10 }, (_, i) => (
                            <option key={i} value={2015 + i}>
                              {2015 + i}
                            </option>
                          ))}
                        </Form.Select>
                      </InputGroup>
                    </Col>

                    <Col md={2}>
                      <InputGroup>
                        <InputGroup.Text>From</InputGroup.Text>
                        <Form.Select
                          value={fromMonth}
                          onChange={(e) => {setFromMonth(e.target.value)}}
                        >
                          <option value="">Select Month</option>
                          {months.map((month, index) => (
                            <option key={index} value={month}>
                              {month}
                            </option>
                          ))}
                        </Form.Select>
                      </InputGroup>
                    </Col>

                    <Col md={2}>
                      <InputGroup>
                        <InputGroup.Text>To</InputGroup.Text>
                        <Form.Select
                          value={toMonth}
                          onChange={(e) => {setToMonth(e.target.value)}}
                        >
                          <option value="">Select Month</option>
                          {months.map((month, index) => (
                            <option key={index} value={month}>
                              {month}
                            </option>
                          ))}
                        </Form.Select>
                      </InputGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Header>

            <Card.Body>
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <TableTemplate
                columns={columns}
                  data={incomeStatements}
                  fromMonth={fromMonth}
                  toMonth={toMonth}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
