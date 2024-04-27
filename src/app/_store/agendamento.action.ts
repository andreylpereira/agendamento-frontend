import { createAction, props } from "@ngrx/store";
import Agendamento from "../models/agendamento.model";

export const retrievedAgendamentoList = createAction(
    '[Agendamento List] Retrieve Agendamento Success',
    props<{ agendamentos: Agendamento[] }>()
  );

  export const addAgendamento = createAction(
    '[Agendamento] Adicionar Agendamento',
    props<{ agendamento: Agendamento }>()
  );

  export const removeAgendamento = createAction(
    '[Agendamento] Remover Agendamento',
    props<{ id: number }>()
  );

  export const updateAgendamento = createAction(
    '[Agendamento] Atualizar Agendamento',
    props<{ id: number, agendamento: Agendamento }>()
  );
