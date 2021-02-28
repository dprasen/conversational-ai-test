const axios = require('axios');
const { htmlToText } = require('html-to-text');
const request = require('request');
const readline = require('readline');
const url = 'http://norvig.com/big.txt';

var wordsWithStats = {};
const occurence=0;

const makeCollection = async(text) => {
    let words = text.trim().split(' ');
    words.forEach(function (item, index) {
        let currentWord = item.toLocaleLowerCase();
        if(wordsWithStats.hasOwnProperty(currentWord)){
            wordsWithStats[currentWord].count++;
        }else{
            wordsWithStats[currentWord]={count:1}
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
 
 
  
 
 parseFile(url).then(()=>{console.log(wordsWithStats.slice(0,10))});

  //console.log(wordsList);