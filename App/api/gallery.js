import clinet from './clinet';

const getGalleryList = () => clinet.get('galleries');

export default {
  getGalleryList,
};
