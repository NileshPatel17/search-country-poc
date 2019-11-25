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

### Creating your Github Action Workflow
Next we need to create a Github Action Workflow that will run our brand new JavaScript "Hello World" Github Action. This can be done one of two ways.

1. On Github.com in your repostory page directly
2. Locally be manually creating the dependent folder and files

> Doing it manually is a little more work since on Github.com you can start with using the template boilerplate.

I will going through Method 1. Once were done with Method 1, it will be easy to say how to do it manually.

## Creating your Workflow on Github.com
1. Navigate to your repository homepage on Github
2. On the top bar next to Pull Requests click on ▶️ Actions

> When you dont have any Github Action Workflows for your repository you will see a "Getting Started" kind of page. It will suggest Github Actions you can start with based off the main language of your repository.

3. Ignore the suggestion and click on Setup and workflow yourself button located on the right side of the page.

> You will be taken to the standard Github file create/edit screen with a TWIST (very twisty)! On the right margin you will have a WYSIWYG sort of thing to fill in Github Actions that might be of use. This will be attempt to make a main.yml file inside of .github/workflow/.

> This YAML file will run an entire workflow, executing our desired Github Actions or commands.

4. In our ```main.yml``` put the following in:
```name: CI # Name of our workflow

on: [push] # Repository event that will trigger the workflow

jobs:
  build:

    runs-on: ubuntu-latest # Environment job will run in

    steps: # Each action/command to run
    - uses: actions/checkout@v1 # Helps check out the repo code
    - uses: ./.github/actions/test-action # Tell it to run out JS Action
```
5. Commit the file on Github

> Since we just made our workflow file and it triggers on push. Github should actually attempt to run our workflow and trigger our JavaScript action. Let's go check it out!

## Checking Executed Workflows

1. On the top bar next to Pull Requests click on ▶️ Actions

> This page will look completely different since that last time we visited it. Since we now have a workflow, it will display the history of our workflow runs.

> In the table for All Workflows you should see a job called CI that is currently running or has completed (depending on how fast you got to this page after committing the workflow.

2. Click on name CI to view the workflow details.

> You will see a UI displaying the various steps your workflow went through during is execution process.

3. Click on Run ```/./.github/actions/test-action``` if its not already expanded.

>If the step has completed executing it will be expanded showing you what is going on during that step. If it has been completed it will be collapsed.

4. You should see our console log of Hello World!

Congratulations you just made your own JavaScript Github Action and Workflow to run it!!!!!

## Support Using Packages in JavaScript Actions
Doing a plain console log is nice and all but its looking kinda plain. Lets spice it up a little by giving the "Hello World" some flair. By using Boxen package to put our "Hello World" in a nice box to make it feel more official.

But in order to support running 3rd party packages, our JavaScript Github Action must be bundled together with its dependency (just like if we were deploying a front end app).

1. Install ```boxen``` inside ```test-action``` folder using the terminal:
```npm i boxen```
2. Update ```index.js``` to use ```boxen```:

```// In index.js
const boxen = require('boxen');

console.log(boxen('HELLO WORLD!!', {padding: 1}));
```

Check everything so far is working by running ```index.js``` with node in the terminal
```node index.js```

# Should output:
┌───────────────────┐
│                   │
│   HELLO WORLD!!   │
│                   │
└───────────────────┘

> Next step is to bundle all our index.js together with our dependencies, in this case Boxen. Webpack will be used in this situation but you can use a number of other bundlers as an alternative.

3. Inside ```test-action``` folder run the following command in the terminal:
```npm i -D webpack webpack-cli```

4. Inside ```test-action``` folder create a file called ```webpack.config.js``` and add the following:

```
// Inside webpack.config.js
const path = require("path")

module.exports = {
  mode: "production",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  target: "node",
  node: false,
}
```

> Although Webpack 4 has made major improvements so that a configuration file is not needed, it is still valuable to create one to demystify whats going on when you move to the build step.

4. Inside ```test-action``` open ```package.json``` and inside of scripts attribute add a build command:

```
{
  // ...
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  }
  // ....
}
```
> build will run webpack which will take a look at the config file and output a production bundle of index.js inside of dist folder.

5. Now run create our bundle for Github to run the action in the terminal:
```npm run build```

> A new folder called ```dist``` should have been created containing an ```index.js``` file. If you open it up you will see a lot of code, since our file also includes the code for our ```Boxen``` dependency.

6. Lastly commit all the new files and push it up to Github

## Checking on Our Newly Updated Github Action

Now that our Github Action has a little more sizzle, razzle-dazzle, spiciness, and the new code has just been pushed. The Github Workflow should had been triggered and the new Hello World message.

On the top bar next to Pull Requests click on ▶️ Actions

Click on latest CI to view the workflow details.
Click on Run /./.github/actions/test-action if its not already expanded.
You should see the output we tested locally:
Run ./.github/actions/test-action
tput: No value for $TERM and no -T specified
┌───────────────────┐
│                   │
│   HELLO WORLD!!   │
│                   │
└───────────────────┘
At this point we should now have a JavaScript Github Action that can run dependencies. This is just a trivial example but it perfectly shows the steps necessary to creating a custom Github Action to execute a desired behavior or series of actions. An example of what you can do next is building out integrations with a third party API to trigger events like your lights blinking or sending a text.

> reference: https://dev.to/talk2megooseman/talking-github-actions-with-benjamin-lannon-aka-lannonbr-1acf