import {AlignSearch, Main, AlignStretch} from "./styles";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import TextField from "@mui/material/TextField";
import {useState} from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DateTimePicker } from '@mui/x-date-pickers';

export const Home = () => {
  const [selectDateTime, setSelectDateTime] = useState<Date | null>(null)
  return <>
  <Main>
  <h1>Bem vindo! Procure sua passagem de barco agora mesmo.</h1>
    <AlignSearch>
      <Row md={2}>
        <Col xs={4}>
        <AlignStretch>
        <fieldset>
        <div className="mb-3">
          <label htmlFor="disabledSelect">Saindo de</label>
          <Form.Select id="disabledSelect" placeholder="cidade">
            <option value="" disabled selected hidden>Escolha a origem</option>
            <option>Manaus</option>
            <option>Coari</option>
            <option>Tefe</option>
            <option>Belem</option>
            <option>Teste</option>
            <option>Coari</option>
            <option>Coari</option>
            <option>Coari</option>
          </Form.Select>
        </div>
        </fieldset>
      </AlignStretch>
        </Col>
        <Col xs={4}>
        <AlignStretch>
        <fieldset>
        <div className="mb-3">
          <label htmlFor="disabledSelect">Indo para</label>
          <Form.Select id="disabledSelect">
            <option value="" disabled selected hidden>Escolha o destino</option>
            <option>Manaus</option>
            <option>Coari</option>
            <option>Tefe</option>
            <option>Belem</option>
            <option>Teste</option>
            <option>Coari</option>
            <option>Coari</option>
            <option>Coari</option>
          </Form.Select>
        </div>
        </fieldset>
      </AlignStretch>
        </Col>
      </Row>
      <Row md={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Col xs={4}>
        <AlignStretch>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="Data de partida"  
          value=''
          onChange={(defaultValue) => {
            setSelectDateTime(selectDateTime);
          }}
        />
      </AlignStretch>
        </Col>
        <Col xs={4}>
        <AlignStretch>
        <DateTimePicker 
          renderInput={(props) => <TextField {...props} />}
          label="Data de volta"  
          value=''
          onChange={(defaultValue) => {
            setSelectDateTime(selectDateTime);
          }}
        />
      </AlignStretch>
        </Col>
        </LocalizationProvider>        
      </Row>
    </AlignSearch>
  </Main>
  </>;
};
