function checkPalindrome(word) {
  const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
  const reversedWord = cleanWord.split('').reverse().join('');
  return cleanWord === reversedWord;
}

function countVowels(word) {
  const vowels = 'aeiou';
  let count = 0;
  for (const char of word.toLowerCase()) {
    if (vowels.includes(char)) {
      count++;
    }
  }
  return count;
}

module.exports = {
  checkPalindrome,
  countVowels,
};
