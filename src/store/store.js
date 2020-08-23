export function createStore() {
  return {
    posts: [
      { title: 'title', content: 'content' },
      { title: 'title2', content: 'content2' },
    ],
    isLoggedIn: true,
    login(){
      this.isLoggedIn = true;
    },
    logout() {
      this.isLoggedIn = false;
    }
  };
}
