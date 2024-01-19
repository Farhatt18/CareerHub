const SHOW_MODAL = "modal/showModal";
const HIDE_MODAL = "modal/hideModal";

export const showModal = () => ({
  type: SHOW_MODAL,
});

export const hideModal = () => ({
  type: HIDE_MODAL,
});

function modalsReducer(state = { type: false }, action) {
  switch (action.type) {
    case SHOW_MODAL: {
      return { type: true };
    }
    case HIDE_MODAL:
      return { type: false };
    default:
      return state;
  }
}

export default modalsReducer;
