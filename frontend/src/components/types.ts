export type Process = {
  id: number;
  number: string;
  date: string;
  description: string;
  client: string;
  lawyer: string;
  uf: string;
};

export type Proceeding = {
  id: number;
  date: string;
  description: string;
};
