CLI Cookbook (CCB)
==================

A simple CLI application to keep track of recipes and inventories

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
* [Run tests](#tests)
<!-- tocstop -->

# Usage
<!-- usage -->
```bash
yarn install
yarn build

./bin/run COMMAND (.\bin\run.cmd on Windows)
running command...

./bin/run (--version)
cli-cookbook/0.0.1 darwin-x64 node-v14.17.0

./bin/run --help [COMMAND]
USAGE
  ./bin/run COMMAND
...
```
<!-- usagestop -->

# Commands
<!-- commands -->

## Inventory Commands
```bash
# Create a new inventory
./bin/run inventory create myFridge

# Add an item to an inventory
./bin/run inventory add-item myFridge --item=eggs --quantity=1 --unit=count

# Delete an item from an inventory
./bin/run inventory delete-item myFridge --item=eggs

# List items in the inventory
./bin/run inventory list myFridge

# Delete an inventory and all its items
./bin/run inventory delete myFridge
```

## Recipe Commands
```bash
# Create a new recipe
./bin/run recipe create pancakes --instructions="Old instructions"

# Update recipe instructions
./bin/run recipe update pancakes --instructions="New instructions" 

# Add an ingredient to a recipe
./bin/run recipe add-ingredient pancakes --item=eggs --quantity=1 --unit=count

# Deletes an ingredient from a recipe
./bin/run recipe delete-ingredient pancakes --item=eggs

# Deletes a recipe 
./bin/run recipe delete pancakes

# Checks one or more recipes against an inventory, and identifies missing items
./bin/run recipe make pancakes --inventory=myFridge
./bin/run recipe make "pancakes,waffles" --inventory=myFridge
```
<!-- commandsstop -->

# Run Tests
<!-- tests -->
```bash
yarn test
```
<!-- testsstop -->
