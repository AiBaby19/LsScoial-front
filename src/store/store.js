import { getTenPosts, getOne, add, update, remove } from '../api/post';

export function createStore() {
  return {
    //add checkTokenValidation(),

    //AUTH
    isLoggedIn: true,

    login() {
      this.isLoggedIn = true;
    },
    logout() {
      this.isLoggedIn = false;
    },

    //POSTS
    posts: [],

    post: null,

    chosenPost: null,

    async getTenPosts(skip) {
      const tenPosts = await getTenPosts(skip);

      if (tenPosts?.status) {
        return;
      }
      this.posts = [...this.posts, ...tenPosts];
    },

    async getPost(id) {
      const res = await getOne(id);
      if (res?.status) {
        return alert('something is wrong');
      }
      this.post = res;
    },

    async addPost(post) {
      const res = await add(post);
      if (res?.status) {
        return alert('something is wrong');
      }
      this.posts.unshift(res);
    },

    async updatePost(updatedPost) {
      const res = await update(updatedPost);

      if (res?.status) {
        return alert('something is wrong');
      }
      this.posts.forEach((post) => {
        if (post._id === res._id) {
          post.content = res.content;
        }
      });
    },

    async deletePost(id) {
      const res = await remove(id);
      if (res?.status) {
        return alert('something is wrong');
      }
      this.posts = this.posts.filter(({ _id }) => {
        return !(id === _id);
      });
    },

    initModalPost() {
      this.post = null;
    },

    //UTILS
    userName: null,

    setUserName(name) {
      this.userName = name;
    },

    modal: false,

    toggleModal() {
      this.modal = !this.modal;
    },
  };
}
