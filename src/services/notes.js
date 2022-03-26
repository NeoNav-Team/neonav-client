import { isBrowser } from '../utils/checks';

export const getLocalNotes = () =>
isBrowser && window.localStorage.getItem('nnNotes')
  ? JSON.parse(window.localStorage.getItem('nnNotes'))
  : {};

export const setLocalNotes = note => {
window.localStorage.setItem('nnNotes', JSON.stringify(note));
}
