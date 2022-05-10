/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    canUser: currentUser && currentUser.access === 'user',
    canServer: currentUser && currentUser.access === 'server',
    canRoot: currentUser && currentUser.access === 'root',
  };
}
