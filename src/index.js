var twit = require('twit');
require('dotenv').config();







const T = new twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
});
console.log('rodando....');


function retweet(searchText) {
  // Params to be passed to the 'search/tweets' API endpoint
  let params = {
      q : searchText ,
      result_type : 'mixed',
      count : 25,
  }

  T.get('search/tweets', params, function(err_search, data_search, response_search){

      let tweets = data_search.statuses
      if (!err_search)
      {
          let tweetIDList = []
          for(let tweet of tweets) {
            if(tweet.text.startsWith("RT @")) {
              if(tweet.retweeted_status) {
                 tweetIDList.push(tweet.retweeted_status.id_str);
              }
              else {
                 tweetIDList.push(tweet.id_str);
              }
             }
             else {
                 tweetIDList.push(tweet.id_str);
             }
          }

          
        function onlyUnique(value, index, self) { 
            return self.indexOf(value) === index;
        }

        // Get only unique entries
        tweetIDList = tweetIDList.filter( onlyUnique )

          for (let tweetID of tweetIDList) {
              T.post('statuses/retweet/:id', {id : tweetID}, function(err_rt, data_rt, response_rt){
                  if(!err_rt){
                      console.log("\n\nRetweeted! ID - " + tweetID)
                  }
                  else {
                      console.log("\nError... Duplication maybe... " + tweetID)
                      console.log("Error = " + err_rt)
                  }
              })
          }
      }
      else {
          console.log("Error while searching" + err_search)
          process.exit(1)
      }
  })
}

setInterval(function() { retweet('#divulgameutrampo OR #DivulgaMeuTrampo'); }, 60000)





