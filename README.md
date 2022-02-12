oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g cli-cookbook
$ ccb COMMAND
running command...
$ ccb (--version)
cli-cookbook/0.0.0 darwin-x64 node-v14.17.0
$ ccb --help [COMMAND]
USAGE
  $ ccb COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`ccb hello PERSON`](#ccb-hello-person)
* [`ccb hello world`](#ccb-hello-world)
* [`ccb help [COMMAND]`](#ccb-help-command)
* [`ccb plugins`](#ccb-plugins)
* [`ccb plugins:inspect PLUGIN...`](#ccb-pluginsinspect-plugin)
* [`ccb plugins:install PLUGIN...`](#ccb-pluginsinstall-plugin)
* [`ccb plugins:link PLUGIN`](#ccb-pluginslink-plugin)
* [`ccb plugins:uninstall PLUGIN...`](#ccb-pluginsuninstall-plugin)
* [`ccb plugins update`](#ccb-plugins-update)

## `ccb hello PERSON`

Say hello

```
USAGE
  $ ccb hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/kahtaf/cli-cookbook/blob/v0.0.0/dist/commands/hello/index.ts)_

## `ccb hello world`

Say hello world

```
USAGE
  $ ccb hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `ccb help [COMMAND]`

Display help for ccb.

```
USAGE
  $ ccb help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for ccb.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `ccb plugins`

List installed plugins.

```
USAGE
  $ ccb plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ ccb plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `ccb plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ ccb plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ ccb plugins:inspect myplugin
```

## `ccb plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ ccb plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ ccb plugins add

EXAMPLES
  $ ccb plugins:install myplugin 

  $ ccb plugins:install https://github.com/someuser/someplugin

  $ ccb plugins:install someuser/someplugin
```

## `ccb plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ ccb plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ ccb plugins:link myplugin
```

## `ccb plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ ccb plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ ccb plugins unlink
  $ ccb plugins remove
```

## `ccb plugins update`

Update installed plugins.

```
USAGE
  $ ccb plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->

```bash
ccb inventory create myFridge
ccb inventory add myFridge --item=eggs --quantity=1 --unit=count
ccb inventory delete myFridge --item=eggs
ccb inventory list myFridge

ccb recipe create pancakes --instructions=""
ccb recipe update pancakes --instructions="" 
ccb recipe add-ingredient pancakes --item=eggs --quantity=1 --unit=count
ccb recipe delete-ingredient pancakes --item=eggs
ccb recipe delete pancakes
ccb recipe make pancakes --inventory=myFridge
```
