var Twitter = require('twit');
require('dotenv').config();



const Tweet = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
});
console.log('rodando....');

function action(event){
  const {retweeted_status, id_str, screen_name, is_quote_status} = event;
  const {name} = event.user;

  if(!retweeted_status && !is_quote_status){ // Se o status não for um retweet normal, nem um retweet com comentário
    Tweet.post(`statuses/retweet/${id_str}`, erro => { 
      if(erro){
        console.log("Erro no retweet: " + erro)
        // Caso haja um erro, informamos no console o mesmo
      }else {
        console.log("RETWEETADO: ", `https://twitter.com/${name}/status/${id_str}`)
        // Se der tudo certo, informamos no console junto com o URL do tweet retweetado
      }
    }) // Retweetar o tweet, e caso haja um erro, avisar no console. Se não, avisar no console que deu certo com o id do tweet
    
  }
  else {
       return 
       // Caso as condições não sejam atendidas, retornar a função vazia, indo para o próximo tweet
     }
}
var stream = Tweet.stream('statuses/filter', {track: '#divulgameutrampo'}) 
// Aqui dizemos para o programa verificar em modo streaming
stream.on('data', action) 
// Ao receber as informações (`data`), passar elas para a função action e chamar a mesma.
stream.on('error', erro => console.log("Erro: "+ erro)) 
// Caso haja algum erro, jogar o erro no console para verificarmos.


