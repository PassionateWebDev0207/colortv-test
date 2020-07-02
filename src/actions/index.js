export function selectUser(user) {
  return {
    type: 'SELECT_UESR',
    user
  };
}
export function selected(bool) {
  return {
    type: 'SELECTED_NEW_USER',
    selected: bool
  }
}
