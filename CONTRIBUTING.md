# Contributing

If you wish to contribute to the `tasmota-commands`, feel free to fork the repository and submit a pull request. ESLint and Prettier are used to enforce a consistent coding style, so remember to run linter and formatter during your development process.

## Setup

To get ready to work, do the following:

1. Fork and clone the repository, and make sure you're on the main branch
2. Run `yarn install --immutable`
3. Run `yarn check` to check that linter, prettier, tests and build are working
4. Code! Remember to commit the changes frequently.
5. Run `yarn check` to check that everything still works
6. Add changeset with `yarn changeset` or if changes doesn't need a release, run `yarn changeset add --empty`
7. [Submit a pull request](https://github.com/panusoi/tasmota-commands/compare)
