

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')



weatherForm.addEventListener('submit', (e)=>{
  e.preventDefault()
  const location = search.value
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  messageThree.textContent = ''

  fetch(`/weather?address=${location}`).then((res)=>{
  res.json().then((data) => {
    if(data.error) {
      messageOne.textContent = data.error
    } else {
      messageOne.textContent = `探索エリア ${data.location}` 
      messageTwo.textContent = `取得日時 ${data.localtime}`
      messageThree.textContent = `天気 ${data.descriptions[0]}  / 気温：${data.temperature}℃　体感気温：${data.feelslike}℃`
    }
  })
})
})