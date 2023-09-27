export const pageInitState = {
  isChatPage: true,
  isFeedbackPage: false,
  isCompletePage: false,
  isMaximizedPage: false,
  isSettingDrawerOpen: false,
  isHumanAgentPage: false,
  isChatDialogOpen: false,
};

export const pagesReducers = (state, action) => {
  switch (action.type) {
    case 'CHAT_DIALOG_OPEN':
      return {
        ...state,
        isChatDialogOpen: true,
      };

    case 'CHAT_DIALOG_CLOSE':
      return {
        ...state,
        isChatDialogOpen: false,
      };

    case 'BACK_TO_CHAT':
      return {
        ...state,
        isFeedbackPage: false,
        isHumanAgentPage: false,
        isSettingDrawerOpen: false,
        isChatPage: true,
      };

    case 'OPEN_FEEDBACK':
      return {
        ...state,
        isChatPage: false,
        isHumanAgentPage: false,
        isChatDialogOpen: false,
        isFeedbackPage: true,
      };

    case 'OPEN_COMPLETE':
      return {
        ...state,
        isCompletePage: true,
        isFeedbackPage: false,
        isChatPage: false,
      };

    case 'CLOSE_COMPLETE':
      return {
        ...state,
        isCompletePage: false,
      };

    case 'TOGGLE_MAXIMIZE':
      return {
        ...state,
        isMaximizedPage: !state.isMaximizedPage,
      };

    case 'TOGGLE_SETTINGS_DRAWER':
      return {
        ...state,
        isSettingDrawerOpen: !state.isSettingDrawerOpen,
      };

    case 'OPEN_HUMAN_PAGE':
      return {
        ...state,
        isChatPage: false,
        isFeedbackPage: false,
        isHumanAgentPage: true,
        isSettingDrawerOpen: false,
      };

    default:
      return state;
  }
};

export const test = '';
