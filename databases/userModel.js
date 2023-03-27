import Pool from 'postgres';
import myURI from 'postgres://yevlswll:dFJAcC8DZ4RSLwSrPWaqAqfYMR3rE1hT@ruby.db.elephantsql.com/yevlswll';

const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  coonnectionString: URI
});

const queryDB = {
  query: (text, params, callback) => {
    console.log('userModel => executed query: ', text);
    return pool.query(text, params, callback);
  }
};

export default queryDB; 