import apiNotes from '@/api/note.js';

const state = {
  notes: [],
  status: ''
};
const getters = {
  notes: state => state.notes,
  status: state => state.status
};
const mutations = {
  SET_STATUS(state, status) {
    state.status = status;
  },
  SET_NOTES(state, payload) {
    state.notes = payload;
  },
  ADD_NOTE(state, payload) {
    state.notes.unshift(payload);
  },
  DELETE_NOTE(state, id) {
    const notes = state.notes.filter(note => note._id != id);
    state.notes = notes;
  }
};
const actions = {
  getNotes({ commit }) {
    return new Promise((resolve, reject) => {
      commit('SET_STATUS', 'load');
      apiNotes
        .getNotes()
        .then(resp => {
          const { notes, status } = resp.data;
          commit('SET_STATUS', status);
          commit('SET_NOTES', notes);
          resolve(resp);
        })
        .catch(err => {
          commit('SET_STATUS', 'error');
          reject(err);
        });
    });
  },
  createNote({ commit }, payload) {
    return new Promise((resolve, reject) => {
      apiNotes
        .createNote(payload)
        .then(resp => {
          const { note, title, status } = resp.data;
          commit('ADD_NOTE', note);
          resolve({ title, status });
        })
        .catch(err => {
          reject({ status: 'error', title: `${err}` });
        });
    });
  },
  deleteNote({ commit }, id) {
    apiNotes
      .deleteNote(id)
      .then(resp => {
        commit('DELETE_NOTE', id);
      })
      .catch(err => {});
  },
  updateNote({ commit }, note) {
    apiNotes.updateNote(note).then(resp => {
      const { note } = resp.data;
      commit('DELETE_NOTE', note._id);
      commit('ADD_NOTE', note);
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
