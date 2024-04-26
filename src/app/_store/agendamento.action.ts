import { createAction, props } from "@ngrx/store";
import Agendamento from "../models/agendamento.model";

export const retrievedAgendamentoList = createAction(
    '[Agendamento List] Retrieve Agendamento Success',
    props<{ agendamentos: Agendamento[] }>()
  );