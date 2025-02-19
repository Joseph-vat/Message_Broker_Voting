type Voto = {
  id: string;
  candidato: string;
}

declare namespace Express{
    export interface Request{
      userExpr: Voto;
    }
  }
