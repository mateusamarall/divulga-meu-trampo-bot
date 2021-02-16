var twit = require('twit');
require('dotenv').config();


const Bot = new twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  });
  
  let querySearch = {
    valuesQuery:[
      {
        value:"#divulgameutrabalho"
      },
      {
        value:"divulgatrampo"
      }
    ]
  }
 //faz um map na variavel querySearch pegando os valores e jogando na variavel valuesToRetweet
let valuesToRetweet = querySearch.valuesQuery.map((valores,index)=> valores.value);

function BotInit() {
  
  //joga na variavel randmNumbers 0 ou 1 para que ajude na hora de buscar os tweets que foram declarados na variavel querySearch
   let randomNumbers = Math.round(Math.random(0,1));
   var query = {
     //Aqui o que vai buscar
     q: valuesToRetweet[randomNumbers],
     result_type: "recent",
     
    };
 
   
  
    // Este método busca os tweets mais recentes baseado na query
    Bot.get("search/tweets",query, BotGotLatestTweet);
  
    function BotGotLatestTweet(error, data, response) {
      // console.log(data);
      if (error) {
        console.log("bot não pode achar os ultimos tweets");
      } else {
        var id = {
          id: data.statuses[0].id_str,
        };
      }
      // Neste método será retweetado o tweet localizado
      Bot.post("statuses/retweet/:id", id, BotRetweeted);
  
      function BotRetweeted(error, response) {
        if (error) {
          console.log("não retwitado: " + error);
        } else {
          console.log("Bot retweeto: " + id.id);
        }
      }
    }
  }
  
  setInterval(BotInit, 5 * 1000);
  BotInit();





