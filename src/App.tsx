import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TimeTable } from './TimeTable/TimeTable';
import { Alert, Container, Nav, Navbar } from 'react-bootstrap';

function App() {

  const [alert, setAlert] = React.useState(true);

  return <>
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand>SIT TimeTable</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="https://github.com/Kyo-s-s/sit_timetable">GitHub</Nav.Link>
          <Nav.Link onClick={() => {
            sessionStorage.removeItem("faculty");
            sessionStorage.removeItem("department");
            sessionStorage.removeItem("year");
            sessionStorage.removeItem("selectedLecture");
            sessionStorage.removeItem("credits");
            // Reload
            // eslint-disable-next-line no-self-assign
            window.location.href = window.location.href;
          }}>Reset</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    <div className="m-1">
      <Container>
        <Alert className="mt-3" variant="danger" onClose={() => setAlert(false)} show={alert} dismissible>
          時間割や取得予定単位数は参考値です。万が一誤りがあった場合でも、一切の責任を負いません。
        </Alert>
      </Container>
      {TimeTable()}
    </div>
  </>;
}

export default App;
