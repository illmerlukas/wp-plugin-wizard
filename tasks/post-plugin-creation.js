/**
 * Post plugin creation actions
 */
export const actions = (data) => {
  return [
    {
      type: 'installNpmDeps',
      message: 'Installing npm dependencies...',
    },
  ];
};

export default {
  actions,
};
