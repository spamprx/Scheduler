import { atom, selector } from 'recoil';

export const postsState = atom({
  key: 'postsState',
  default: [],
});

export const sortedPostsState = selector({
  key: 'sortedPostsState',
  get: ({get}) => {
    const posts = get(postsState);
    return [...posts].sort((a, b) => new Date(a.date) - new Date(b.date));
  },
});