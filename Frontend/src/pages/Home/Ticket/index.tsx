import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NextButton } from "shared/components/buttons";
import Spin from "shared/components/Spin";
import { ENDPOINT } from "shared/constants/endpoints";
import { HOME } from "shared/constants/routes";
import { ITicket } from "shared/interfaces/ticket.interface";
import { formatCurrencyPtBr } from "shared/utils/common/format-currency-pt-br";
import { openUrl } from "shared/utils/common/open-url";
import { Text1, Text2, Text3, Text4 } from "styles/app-styles";
import Container, {
  AlignButton,
  AlignColumn,
  AlignRow,
  AlignRowButton,
  CardStyled,
} from "./styles";

export const Ticket = ({ ticket }: { ticket: ITicket }) => {
  const {
    id,
    accommodation_name,
    boat_name,
    destination_city,
    dt_arrival,
    dt_output,
    home_city,
    transport_value,
  } = ticket;

  const [fetching, setFetching] = useState(false);
  const [sandboxInitPoint, setSandboxInitPoint] = useState<string>("");
  const navigate = useNavigate();
  const createPreference = async () => {
    setFetching(true);

    const product = {
      title: "Bilhete",
      unit_price: transport_value,
      quantity: 1,
    };

    await ENDPOINT.CREATE_PREFERENCE(id, product)
      .then((v) => setSandboxInitPoint(v.data.sandbox_init_point))
      .catch(() => navigate(`${HOME}`));

    setFetching(false);

    openUrl(sandboxInitPoint);
  };

  if (fetching) {
    return <Spin />;
  }

  return (
    <Container>
      <CardStyled>
        <AlignRowButton>
          <AlignRow>
            <AlignColumn>
              <Text2>{boat_name}</Text2>
              <Text4> {`Acomodação: ${accommodation_name}`} </Text4>
            </AlignColumn>
            <AlignRow>
              <AlignColumn>
                <Text3>{home_city}</Text3>
                <Text4>{new Date(dt_output).toLocaleDateString()}</Text4>
                <Text4>Saída</Text4>
              </AlignColumn>
              <AlignColumn>
                <Text3>{destination_city}</Text3>
                <Text4>{new Date(dt_arrival).toLocaleDateString()}</Text4>
                <Text4>Chegada</Text4>
              </AlignColumn>
            </AlignRow>
            <AlignColumn>
              <Text4>Valor por Adulto</Text4>
              <Text1>{formatCurrencyPtBr(transport_value)}</Text1>
              <Text4>(Alimentação + Transporte)</Text4>
            </AlignColumn>
          </AlignRow>
          <AlignButton>
            <NextButton
              handleClick={createPreference}
              icon={false}
              text="Selecionar"
            />
          </AlignButton>
        </AlignRowButton>
      </CardStyled>
    </Container>
  );
};
