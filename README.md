# MoisesAi

This is the repository for the `Music.AI Fullstack Engineer Code Test`.

## Table of contents

- [MoisesAi](#moisesai)
  - [Table of contents](#table-of-contents)
  - [Documentation](#documentation)
  - [Getting Stated](#getting-stated)
    - [Installation](#installation)
    - [Start up the Dev Server](#start-up-the-dev-server)
  - [Tools](#tools)
    - [Git hooks](#git-hooks)
    - [Docker](#docker)
    - [Homebrew](#homebrew)
    - [Volta.js](#voltajs)
  - [Merge Requests](#merge-requests)
  - [Tips](#tips)
    - [Create a branch from the latest `main`](#create-a-branch-from-the-latest-main)
      - [Rebasing your brach onto latest `main`](#rebasing-your-brach-onto-latest-main)
  - [Environments](#environments)
  - [Helpful Resources](#helpful-resources)

## Documentation

This README file includes basic information to help you get started on the project.

There are lots of things that still need to be documented. If you have any
suggestions, feel free to submit a Merge Request or discuss with the team!
Improvements are always welcome.

## Getting Stated

### Installation

1. It's recommended to have [Docker](#docker), [Homebrew](#homebrew) and [Volta](#voltajs) installed.
2. Run `yarn` to download and link all dependencies.
3. Run `yarn build` to build all workspace packages.

### Start up the Dev Server

1. Run `yarn start` to build all packages and start the development server.
2. Go to `http://localhost:4200`

## Tools

### Git hooks

We have a few hooks setup with Husky:

- `pre-commit`: Runs Prettier and ESLint using `lint-staged` before finishing a
  commit. If Eslint throws and error, the commit is aborted.

### Docker

Docker is a platform designed to help developers build, share, and run container
applications. We handle the tedious setup, so you can focus on the code.

To install Docker Desktop, checkout out the official [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Homebrew

Homebrew installs the stuff you need that Apple (or your Linux system) didn’t.

To install Homebrew run `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

### Volta.js

Volta.js makes it easier to manage Node tooling versions. If you have Volta.js
installed you'll automatically use the correct Node and Yarn versions for this
Project in your terminal, just by being in the project folder.

This is defined by the `volta` field in the root `package.json`

To install Volta, run `curl https://get.volta.sh | bash` or you can check out the
official [getting started documentation](https://docs.volta.sh/guide/getting-started)

## Merge Requests

Merge Requests are a great way to share knowledge about the codebase between the
team and to increase the code quality. But in order to be helpful. they need to
follow a few principles:

Some principles are:

1. Write your Merge Requests (MR) as if they are going to ready by other people.
2. Always write a descriptive and meaningful MR description.
3. Keep your MR as short and scoped as possible.

## Tips

### Create a branch from the latest `main`

Just run `git checkout -b new-branch-name origin/main`. if you use Zsh with the
git plugin installed, you can replace `git checkout -b` with `gcb`.

Example: `git checkout -b feat/some-feature origin/main`.

#### Rebasing your brach onto latest `main`

You can run `git pull --rebase origin/main`. That way the latest `main` will be
fetched.

Another options is to update the `main` branch to it's latest version and then
run `git rebase main`

## Environments

| Environment | URL          |
| ----------- | ------------ |
| `staging`   | `http://...` |

## Helpful Resources

- [Nest CLI](https://docs.nestjs.com/cli/overview)
