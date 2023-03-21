import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TimeTable } from './TimeTable/TimeTable';
import { Alert, Container } from 'react-bootstrap';

function App() {

  const [alert, setAlert] = React.useState(true);
  const [alert2022, setAlert2022] = React.useState(true);

  return (
    <div className="m-1">
      <Container className="pt-4">
        <Alert variant="danger" onClose={() => setAlert(false)} show={alert} dismissible>
          時間割や取得予定単位数は参考値です。万が一誤りがあった場合でも、一切の責任を負いません。
        </Alert>
        <Alert variant="danger" onClose={() => setAlert2022(false)} show={alert2022} dismissible>
          これは2022年度の時間割です。2023年度の時間割は未定です。公開され次第更新します。
        </Alert>
      </Container>
      {TimeTable()}
    </div>
  );
}

export default App;
