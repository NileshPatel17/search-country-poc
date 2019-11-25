## Getting Started
1. Use an existing repository or make a brand new repository

> You can run the Github Action from the repository it lives in or run it from another repositories action.

2. Create a .github folder and the root of your directory

3. Create a actions folder inside of .github folder

### **Creating our JavaScript Action**
Now we have basic folder structure. Lets make our first JavaScript Github Action.

1. Create a ```test-action``` folder inside of the previously created actions folder.
2. Inside of ```test-action``` initialize a npm package by running
```npm init -y```
3. Now create a ```index.js``` file

> This index.js file will contain the logic we will run for our Github Action

4. Open up ```index.js``` and lets add a simple Hello World
```
// Inside of index.js
console.log('Hello World!)
```
5. Create an ```action.yml``` file inside test-action folder
>This is a special file for Github Actions, it helps tell Github information about your action and how to run it

6. Insert the following into ```action.yml``` the following:
```
name: Hello-World
description: Example hello world running JavaScript Github Action
runs:
  using: node12 # Runtime Environment
  main: index.js # Script to run, path is relative
  ```
  7. Make sure everything is saved, commit the code, and push it to your Github repository