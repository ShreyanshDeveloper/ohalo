import type { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  helpUrl: 'please use `yarn commit` instead of `git commit`',
};

module.exports = Configuration;
