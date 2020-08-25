import {
  getTenPosts,
  getOne,
  add,
  update,
  remove,
  likeToggle,
} from '../api/post';

import {connectAuto} from '../api/auth';

export function createStore() {
  return {
    //AUTH
    isLoggedIn: false,

    async autoConnect(token) {
      const res = await connectAuto(token);
      if(res.userId) {
        this.login();
      }else {
        this.logout();
      }
    },

    login() {
      this.isLoggedIn = true;
    },
    logout() {
      this.isLoggedIn = false;
      this.posts = [];
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
        return alert(res.message);
      }
      this.post = res;
    },

    async addPost(post) {
      const res = await add(post);
      if (res?.status) {
        return alert(res.message);
      }
      this.posts.unshift(res);
    },

    async updatePost(updatedPost) {
      const res = await update(updatedPost);

      if (res?.status) {
        return alert(res.message);
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
        return alert(res.message);
      }
      this.posts = this.posts.filter(({ _id }) => {
        return !(id === _id);
      });
    },

    initModalPost() {
      this.post = null;
    },

    async toggleLike(postId, userId) {
      const res = await likeToggle(postId, userId);
      if (res?.status) {
        return alert(res.message);
      }

      this.posts.forEach((post) => {
        if (post._id === postId) {
          post.likes += res;
        }
      });
    },

    //UTILS
    modal: false,

    toggleModal() {
      this.modal = !this.modal;
    },
  };
}
