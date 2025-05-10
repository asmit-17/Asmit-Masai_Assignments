const chalk = require('chalk');

console.log(chalk.blue('Hello, World!'));
console.log(chalk.yellow('Learning Chalk is fun!'));

console.log(chalk.bgYellow.black('Warning! Proceed with caution.'));
console.log(chalk.bgRed.white('Error! Something went wrong.'));

console.log(chalk.green('Success: ') + chalk.white('Operation completed!'));
console.log(chalk.cyan('Loading...') + chalk.magenta(' Please wait'));

const themes = {
  error: chalk.bold.red,
  warning: chalk.bold.keyword('orange'),
  success: chalk.bold.green,
};

console.log(themes.error('Error: Unable to connect to the server!'));
console.log(themes.warning('Warning: Low disk space!'));
console.log(themes.success('Success: Data saved successfully!'));

console.log(chalk.underline.italic.hex('#FF8C00')('Bonus: Styled Text!'));
console.log(chalk.bgRgb(255, 255, 0).black('Bonus: Yellow Background'));