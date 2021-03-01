const axios = require('axios');
const { htmlToText } = require('html-to-text');
const request = require('request');
const readline = require('readline');
const url = 'http://norvig.com/big.txt';

var wordsWithStats = {};

const makeCollection = async(text) => {
    let words = text.trim().split(' ');
    words.forEach(function (item, index) {
        let currentWord = item.toLocaleLowerCase();
        if(wordsWithStats.hasOwnProperty(currentWord)){
            wordsWithStats[currentWord].count++;
        }else{
            wordsWithStats[currentWord]={Text:currentWord, count:1, syn:'',pos:''};
            //const resp = axios.get('https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20210216T114936Z.e4989dccd61b9626.373cddfbfb8a3b2ff30a03392b4e0b076f14cff9&lang=en-ru&text='+currentWord);
            //wordsWithStats[currentWord].syn=''+def[0].tr[0].syn[0].text+'';
            //wordsWithStats[currentWord].pos=''+def[0].pos+'';
        }
      });
    
}

const parseFile =  async(url) => {
    return new Promise((resolve, reject) => {
      const lineBuffer = [];   
      const rl = readline.createInterface({
        input: request.get(url).on('error', (err) => reject(err)),
      });
   
      rl
        .on('line', (line) => {         
          makeCollection(line);
        })
        .on('close', () => resolve(lineBuffer));
    });
  }
  
 const sorter = (a, b) => {
    return a.count - b.count;
 };
 
 const sortByCount = arr => {
    arr.sort(sorter);
 };
 
 
  
 
 parseFile(url).then(()=>{console.log(wordsWithStats)});

  //console.log(wordsList);