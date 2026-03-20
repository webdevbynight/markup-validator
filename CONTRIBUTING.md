# Contributing to markup-validator

Thank you for your interest and efforts to contribute to markup-validator. All work done is available on GitHub.

Your effort to contribute is highly appreciated, but you should talk to a maintainer before spending a lot of time making a pull request that may not align with the project roadmap.

## Code of Conduct

This project and everyone participating in it are governed by a [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold it. Make sure to read the full text to understand which type of actions may or may not be tolerated.

## Issue tracker

The issue tracker is the channel for bug reports, feature requests and submitting pull requests only. Please use the [help](README.md#get-help) section for support, troubleshooting and questions.

markup-validator is using [GitHub issues](https://github.com/webdevbynight/markup-validator/issues) to manage feature requests and bugs. Before opening an issue or a pull request, try to ensure your problem or feature request has not been already reported or fixed.

### Feature requests

Feature requests by the community are highly encouraged. Feel free to submit a new one filling the information requested in the [feature request template](https://github.com/webdevbynight/markup-validator/issues/new?template=feature-request.yml).

### Bug reports

Please try to be as detailed as possible in your report and fill the information requested in the [bug report template](https://github.com/webdevbynight/markup-validator/issues/new?template=bug-report.yml).

## Submitting a pull request

Your pull request will be reviewed and either merged, subject to change requests or closed.

### Contribution prerequisites

Make sure:
- you have [Node.js](https://nodejs.org/en/) at version 20.18.3+, 22.12.0+ or 24.0.0+,
- you have [pnpm](https://pnpm.io) at version 10.32.1+ installed,
- you are familiar with [Git](https://git-scm.com).

**Before submitting your pull request,** make sure the following requirements are fulfilled:
- fork the repository and create your new branch from `main`;
- install dependencies in the root of the repository;
- if you have fixed a bug or added code that should be tested, please make sure to add tests;
- ensure all the test suites are passing running `pnpm test`;
- if your contribution fixes an existing issue, please make sure to link it in your commits and pull request.

### Development workflow

#### Steps
1. [Go to the repository](https://github.com/webdevbynight/markup-validator) and fork it using your own GitHub account,
2. clone your repository:

        git clone git@github.com:YOUR_USERNAME/markup-validator.git
3. go to the root of the repository and run:

        cd markup-validator
        pnpm install
4. run TypeScript and the test suites in watch mode:

        pnpm dev

Awesome! You are now able to contribute to markup-validator.

#### Available commands

- `pnpm biome`: checks imports organisation and linting and formating errors and fixes them,
- `pnpm biome:check`: only checks imports organisation, linting and formating,
- `pnpm format`: checks formating errors only and fixes them,
- `pnpm format:check`: only checks formating errors,
- `pnpm lint`: checks linting errors only and fixes them,
- `pnpm lint:check`: only checks linting errors,
- `pnpm build`: runs the TypeScript compiler once,
- `pnpm dev`: runs both the TypeScript compiler and the test suites in watch mode,
- `pnpm tsc:watch`: runs the TypeScript compiler in watch mode,
- `pnpm test`: runs the test suites once,
- `pnpm test:watch`: runs the test suites in watch mode.

## Git conventions

### Atomic commits

If possible, make [atomic commits](https://en.wikipedia.org/wiki/Atomic_commit), which means:
- a commit should contain exactly one self-contained functional change,
- a functional change should be contained in exactly one commit,
- a commit should not create an inconsistent state (such as test errors, linting errors, partial fix, etc.).

A complex feature can be broken down into multiple commits as long as each one maintains a consistent state and consists of a self-contained change.

### Commit messages

markup-validator follows the rules defined by the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

The footer can contain a [closing reference to an issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue).

markup-validator uses [commitlint](https://commitlint.js.org) to help you create valid commit messages.

#### Type

The type must be one of the following:
- `build`: when working on the build system or external dependencies (example scope: pnpm),
- `chore`: when working on tooling,
- `ci`: when working on CI configuration files and scripts (example scope: GitHub Actions),
- `docs`: when writing documentation,
- `feat`: when working on a feature,
- `fix`: when fixing an issue,
- `perf`: when improving performance,
- `refactor`: when doing some refactoring,
- `revert`: when reverting one or several commits,
- `style`: when doing some code or content clean-up (white-space, formatting, missing semicolons, etc.),
- `test`: when adding missing tests or correcting existing tests.

A type ending with `!` introduces breaking changes.

#### Subject

The subject contains succinct description of the change:
- use the imperative, present tense (“change”, not “changed” nor “changes”),
- do not capitalize first letter,
- no dot (.) at the end.

It should not describe what the code is doing.

> [!IMPORTANT]
> For a `fix` commit, the message should describe what the commit is fixing, not what the solution is.

#### Body

The body, if provided, should include the motivation for the change and contrast this with previous behaviour.

> [!IMPORTANT]
> For a `fix` commit, the body should explain why there was a need for fix, not how the problem was fixed.

#### Footer

The footer, if provided, is the place to reference GitHub issues that this commit closes.

If the type used does not end with `!`, the footer should contain any information about breaking changes. Breaking changes should start with the phrase `BREAKING CHANGE:` with a space.

> [!IMPORTANT]
> For a `revert` commit, the footer should say: `Refs: <hash>`, where the hash is the SHA of the commit being reverted. If several commits are reverted, each commit SHA should be comma-separated.

## Coding rules

### Source code

To ensure consistency and quality throughout the source code, all code modifications must have:
- no linting errors,
- a test for every possible case introduced by your code change,
- valid commit message(s).

### Linting and formating

markup-validator uses [Biome](https://biomejs.dev) for linting and formatting. Biome linting and formatting will be automatically checked and run when committing.

### Tests

> [!NOTE]
> Before pushing your code changes make sure **all tests pass.**

markup-validator uses [Vitest](https://vitest.dev) for writing and running tests.
