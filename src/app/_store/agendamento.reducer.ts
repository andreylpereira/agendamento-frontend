import { createReducer, on } from '@ngrx/store';
import Agendamento from '../models/agendamento.model';
import { retrievedAgendamentoList } from './agendamento.action';

export const initialState: Agendamento[] = [];

export const agendamentosReducer = createReducer(
  initialState,
  on(retrievedAgendamentoList, (state, { agendamentos }) => agendamentos)
);
