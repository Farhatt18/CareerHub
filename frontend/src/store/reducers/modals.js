const SHOW_MODAL = "modal/showModal";
const HIDE_MODAL = "modal/hideModal";

export const showModal = () => ({
  type: SHOW_MODAL,
});

export const hideModal = () => ({
  type: HIDE_MODAL,
});

function modalsReducer(state = { type: true }, action) {
  switch (action.type) {
    case SHOW_MODAL: {
      return { type: false };
    }
    case HIDE_MODAL:
      return { type: true };
    default:
      return state;
  }
}

export default modalsReducer;
