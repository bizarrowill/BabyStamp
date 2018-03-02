var connection;
if(process.env.JAWSDB_URL) {
  //Heroku deployment
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  //local host
    connection = mysql.createConnection({
        root: 8080,
        host: "localhost",
        user: "root",
        password: "root",
        database: "stamplist_db",
    });
};