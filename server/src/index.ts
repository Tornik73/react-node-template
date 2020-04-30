import "./config/db.seed";
import sequelize from "./config/db.connection";
import App from "./App";
import CONFIG from "./config/config";
const PORT = CONFIG.PORT;
// sequelize.sync().then(result=>{
//   if(typeof result === 'string') {
//     console.log(result);
//   }
//
// }).catch(err=> console.log('Error' + err));

App.server.listen(PORT, err => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server is listening on ${PORT}`);
});

