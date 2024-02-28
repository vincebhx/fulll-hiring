// Max number to test
const n = 15

// List of multiples to test with corresponding key.
// For scalability purposes. If we want to test another multiple, we add it in this array
const multiples = [
  { id: 3, text: 'Fizz' },
  { id: 5, text: 'Buzz' }
]

for (let i = 1; i < n + 1; i++) {
  let isMultiple = false
  let stringToDisplay = ''
  multiples.forEach((multiple) => {
    if (i % multiple.id === 0) {
      isMultiple = true
      stringToDisplay += multiple.text
    }
  })
  // If the number can be divided by any of the multiples, display the string. Otherwise display the number
  console.log(isMultiple ? stringToDisplay : i)
}
