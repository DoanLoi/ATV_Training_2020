var pgp = require('pg-promise')(/* options */)
var db = pgp('postgres://postgres:doanvanloi99@localhost:5432/test');
export default db;