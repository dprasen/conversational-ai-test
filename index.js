const fetch = require('node-fetch');

// const processText = async() => {
//     const textResponse = await fetch('http://norvig.com/big.txt',);
//     const textData = await textResponse.json();
//     console.log(textData);
// }

const wordsWithStats = {};

fetch('http://norvig.com/big.txt')
    .then(res => res.text())
    .then(text => {
        let words = text.trim().split(' ');
        words.forEach(function (item, index) {
            let currentWord = item.toLocaleLowerCase();
            try{
                if(wordsWithStats.hasOwnProperty(currentWord)){
                    wordsWithStats[currentWord].count++;
                }else{
                    wordsWithStats[currentWord]={Text:currentWord, count:1, syn:'',pos:''};
                    const resp = fetch('https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20210216T114936Z.e4989dccd61b9626.373cddfbfb8a3b2ff30a03392b4e0b076f14cff9&lang=en-ru&text='+currentWord)
                    .then(r=>resp.json())
                    .then(x=>{
                      console.log(x)
                     //wordsWithStats[currentWord].syn=''+def[0].tr[0].syn[0].text+'';
                     //wordsWithStats[currentWord].pos=''+def[0].pos+'';
                    })                
                }    
            }
            catch(ex){console.log(ex)}    
        })
        return wordsWithStats;
    })
    .then(unsorted => console.log(unsorted))



// const getFirstUserData = async () => {
//     const response = await fetch('/users.json') // get users list
//     const users = await response.json() // parse JSON
//     const user = users[0] // pick first user
//     const userResponse = await fetch(`/users/${user.name}`) // get user data
//     const userData = await userResponse.json() // parse JSON
//     return userData
//   }
  
//   getFirstUserData()