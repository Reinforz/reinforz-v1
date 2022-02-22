module.exports = {
  stories: ['../src/stories/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app'
  ],
  typescript: {
    reactDocgen: 'none'
  },
  core: {
    builder: "webpack5"
  }
};
