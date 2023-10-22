export const urls = Object.freeze({
  login: 'user/loginIn',
  signUp: 'user/signUp',

  users: '/api/user',

  chats: '/api/chat',
  createGroup: '/api/chat/group',
  addToGroup: '/api/chat/groupadd',
  renameGroup: '/api/chat/rename',
  removeUserFromGroup: '/api/chat/groupremove',

  sendMessage: '/api/message',
  getAllMessage: (chatId: string) => `/api/message/${chatId}`,
});
