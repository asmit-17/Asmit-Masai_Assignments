const randomWords = require('random-words');
const { checkPalindrome, countVowels } = require('./fun');

const randomWordArray = randomWords({ exactly: 5 });

randomWordArray.forEach((word, index) => {
  const vowelsCount = countVowels(word);
  const isPalindrome = checkPalindrome(word);
  console.log(`word ${index + 1} -> ${word} -> vowelsCount: ${vowelsCount} -> isPalindrome: ${isPalindrome}`);
});