const gitChangedFiles = require('git-changed-files');

const prLintAction = () => {
  gitChangedFiles()
    .then((committedGitFiles) => {
      const numberOfFiles = {};
      committedGitFiles.committedFiles.forEach((file) => {
        numberOfFiles[file] = file;
      });
      committedGitFiles.unCommittedFiles.forEach((file) => {
        numberOfFiles[file] = file;
      });
      const fileCount = Object.keys(numberOfFiles).length;
      if (fileCount > 50) {
        throw new Error(
          'Failed to commit as file changes are huge!!!, required size limit is: 25 but found: ' +
            fileCount,
        );
      } else {
        console.log('pr files count check passed!!!');
      }
    })
    .catch((error) => {
      if (error.message) {
        console.log(error.message);
        process.exitCode = 1;
      }
    });
};

prLintAction();
