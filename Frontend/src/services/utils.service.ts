import { AxiosResponse } from "axios";
import { IViaCepResponse } from "shared/interfaces/via-cep-response..interface";
import { api } from "./api";

export const utilsService = {
  GET_CEP_DATA: (cep: string): Promise<AxiosResponse<IViaCepResponse>> =>
    api.get(`https://viacep.com.br/ws/${cep}/json/`),
};
