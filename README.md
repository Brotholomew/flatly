# Committing to our project

Every change to our project has to be designed that way: a holistic container - branch consists of smaller changes - commits.

For each and every change a new branch shall be created and then merged (**only by a pull request**) into the **develop** branch.
After a successful merge such branch shall be deleted.

## Naming conventions

There are two types of work that us, developers, carry out: hotfixes and features.
Thus, every branch shall follow strict naming conventions:

- branch names shall begin with the keywords: *hotfix* or *feature*;
- words shall be separated by dashes

E.g.: *feature-add-component-main*

## Commit rules
- always create a commit with a ```-s``` option (*signed commit*, at the first time git will ask you for your credentials);
- first line of the commit message should comprise a short description - like a title
- second line should be blank
- start a detailed description from the third line
- separate the description from your signature with a blank line

E.g.:
```angular2html
add a new component

The purpose of this commit is to include a new 
component - test1 - and two unit tests that 
asses code correctness.

Signed-off-by: Bartosz Błachut <bartoszek.blach@gmail.com>
```

## Merge rules
- manual branch merging is strictly forbidden
- merging can only take place through a pull request
- to merge a pull request three conditions must be fulfilled:
  - the pull request must receive approvals from at least 2 developers
  - all the CI test must pass
  - all the code review threads must be resolved
- ```hotfix-``` and ```feature-``` branches **cannot** be merged into the main branch directly
- ```hotfix-``` and ```feature-``` branches can be merged to the ```develop``` branch
- the ```develop``` branch shall be merged into the ```main``` branch (aka. ```release```) on an established CI meeting as a team effort

# Continuous Integration Effort

Every time a Pull Request for main and develop branches a CI workflow is run by the GitHub Actions component.

It basically means that a container with Node v. 11.x, 12.x, 14.x is created on which the branches from the Pull Request are merged - then the project is being built and tests are run (our jest unit tests).

Steps that are being run:
- ```npm ci```
- ```run: npm run build --if-present```
- ```run: npm test```

In order to merge the branches from the pull request, all the tests have to pass.

# Plans for the future

The CI will be broadened by an addition of automated GitHub pages update on every push to the ```develop``` and ```main``` branches.
(there shall be separate directories for ```develop``` and ```main``` GH pages)