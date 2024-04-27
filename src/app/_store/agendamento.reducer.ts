import { createReducer, on } from '@ngrx/store';
import Agendamento from '../models/agendamento.model';
import { addAgendamento, removeAgendamento, retrievedAgendamentoList, updateAgendamento } from './agendamento.action';

export const initialState: Agendamento[] = [];

export const agendamentosReducer = createReducer(
  initialState,
  on(retrievedAgendamentoList, (state, { agendamentos }) => agendamentos),
  on(addAgendamento, (state, { agendamento }) => {

    return [...state, agendamento];
  }),
  on(removeAgendamento, (state, { id }) => state.filter(item => item.id !== id)),
  on(updateAgendamento, (state, { id, agendamento }) => {

    const agendamentoExistente = state.find(item => item.id === id);
    if (agendamentoExistente && agendamentoExistente.data !== agendamento.data) {

      const newData = state.filter(item => item.data !== agendamento.data);

      const newState = newData.filter(item => item.id !== id);

      return [...newState, agendamento];
    } else {

      return state.map(item => item.id === id ? { ...agendamento } : item);
    }
  })
);
