export interface ICreateBoat {
  cnpj: string;
  boat: {
    IMO: number;
    name: string;
    subscription: number;
    flag: string;
  };
}
