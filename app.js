const inquirer = require('inquirer');
// const fs = require('fs');
// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name, github);


// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });

const promptUser = () =>  {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true; 
        } else {
          console.log('Please enter your name!');
          return false
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your github username? (Required)',
      validate: githubUserInput => {
        if (githubUserInput) {
          return true; 
        } else {
          console.log('Please enter your github username!');
          return false
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({confirmAbout}) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      }
    }
  ]);
};
  

  const promptProject = portfolioData => {
    if (!portfolioData.projects) {
      portfolioData.projects = [];
    }
    console.log(`
    =========
    Add a new project
    ===============
    `)
    return inquirer.prompt([
      {
      type: 'input',
      name: 'project name',
      message: 'What is the name of your project (Required):',
      validate: projectInput => {
        if (projectInput) {
          return true; 
        } else {
          console.log('Please enter your projects name!');
          return false
        }
      }
      },
      {
      type: 'input',
      name: 'description',
      message: 'Provide some information about your project (Required)',
      validate: projectDescInput => {
        if (projectDescInput) {
          return true; 
        } else {
          console.log('Please enter a description!');
          return false
        }
      }
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you buiid this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node'] 
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the Github link to your project. (Required)',
        validate: linkInput => {
          if (linkInput) {
            return true; 
          } else {
            console.log('Please enter your repos link!');
            return false
          }
        }
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ])
    .then(projectData => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
  };
  
  promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
  });