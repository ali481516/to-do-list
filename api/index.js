var Express = require("express");
var bodyParser = require("body-parser");

var app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var cors = require('cors')
app.use(cors())

var mysql = require("mysql");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 't1'
})



var fs = require('fs');
const { response } = require("express");


app.listen(49146, () => {
    connection.connect(function (err) {
        if (err) throw err;
        console.log('Connected to DB');
    });

});

app.get('/react', (request, response) => {
    response.json('Hello World');
    // console.log('Hello World');
})


app.get('/react/api/users', (request, response) => {
    var query = `SELECT * from users`;
    connection.query(query, function (err, rows, fields) {
        if (err) {
            response.send('Failed');
        }
        response.send(rows);
    })

})

app.post('/react/api/add-user', (request, response) => {

    var query = `INSERT into users
    (user_name, password, email)
                VALUE (?,?,?)`;
    var values = [
        request.body['UserName'],
        request.body['Password'],
        request.body['Email']
    ];

    connection.query(query, values, function (err, rows, fields) {
        if (err) {
            response.send('Failed');
        }
        response.json('Added Successfully');
    })

})
app.post('/react/api/auth-users', (request, response) => {

    var query = `SELECT password, user_id
    From users
    WHERE user_name = ?`;
    var values = [
        request.body['UserName']
    ];

    connection.query(query, values, function (err, rows, fields) {
        if (err) {
            response.send('Failed');
        }
        // response.json(rows[0].password)
        if(request.body['Password'] == rows[0].password){
            response.status(200);
            // response.json("Authenticated Successfully")
            response.json(rows[0].user_id)
            
        }else{
            response.status(401);
            response.json("Authenticated Failed")
        }
    })

})

app.post('/react/api/add-task', (request, response) => {

    var query = `INSERT INTO tasks
    (task_title, expire_date, is_done, user_id)
    VALUES(?, DATE(NOW()), false, ?)`;
    var values = [
        request.body['title'],
        request.body['userId']
    ];

    connection.query(query, values, function (err, rows, fields) {
        if (err) {
            response.send('Failed');
        }
        response.json("task added successfully")
    })

})


app.get('/react/api/tasks', (request, response) => {

    var query = `SELECT * 
    FROM tasks
    WHERE user_id = ?`;

    var values = [
        request.query.userId
    ];

    connection.query(query, values, function (err, rows, fields) {
        if (err) {
            response.send('Failed');
        }
        response.json(rows)
    })

})

app.put('/react/api/update-task', (request, response) => {

    var query = `UPDATE tasks
    SET task_title=?
    WHERE task_id=?`;
    var values = [
        request.body['title'],
        request.body['id']
    ];
    connection.query(query, values, function (err, rows, fields) {
        if (err) {
            response.send('Failed');
        }
        response.json('Task title updated Successfully');
    })

})

app.put('/react/api/update-task-expire-date', (request, response) => {

    var query = `UPDATE tasks
    set expire_date=?
    where task_id=?`;
    var values = [
        request.body['expireDate'],
        request.body['id']
    ];

    connection.query(query, values, function (err, rows, fields) {
        if (err) {
            response.send('Failed');
        }
        response.json('Task expire date updated Successfully');
    })

})

app.put('/react/api/update-task-status', (request, response) => {

    var query = `UPDATE tasks
    set is_done=?
    where task_id=?`;
    var values = [
        request.body['status'],
        request.body['id']
    ];

    connection.query(query, values, function (err, rows, fields) {
        if (err) {
            response.send('Failed');
        }
        response.json('Task status updated Successfully');
    })

})


app.delete('/react/api/delete-task/:id', (request, response) => {

    var query = `DELETE from tasks
     where task_id=?`;
    var values = [
        parseInt(request.params.id)
    ];

    connection.query(query, values, function (err, rows, fields) {
        if (err) {
            response.send('Failed');
        }
        response.json('Task deleted Successfully');
    })

})











app.post('/react/api/add-sub-task', (request, response) => {

    var query = `INSERT INTO sub_tasks
    (title, expire_date, is_done, tasks_task_id)
    VALUES('New sub task...', DATE(NOW()), false, ?)`;
    var values = [
        request.body['taskId'],
    ];

    connection.query(query, values, function (err, rows, fields) {
        if (err) {
            response.send('Failed');
        }
        response.json("Sub task added successfully")
    })

})

app.get('/react/api/sub-tasks', (request, response) => {

    var query = `SELECT * FROM sub_tasks`;

    connection.query(query, function (err, rows, fields) {
        if (err) {
            response.send('Failed');
        }
        response.json(rows)
    })

})

app.put('/react/api/update-sub-task', (request, response) => {

    var query = `UPDATE sub_tasks
    set title=?
    where sub_task_id=?`;
    var values = [
        request.body['title'],
        request.body['id']
    ];

    connection.query(query, values, function (err, rows, fields) {
        if (err) {
            response.send('Failed');
        }
        response.json('Sub Task title updated Successfully');
    })

})

app.put('/react/api/update-sub-task-expire-date', (request, response) => {

    var query = `UPDATE sub_tasks
    set expire_date=?
    where sub_task_id=?`;
    var values = [
        request.body['expireDate'],
        request.body['id']
    ];

    connection.query(query, values, function (err, rows, fields) {
        if (err) {
            response.send('Failed');
        }
        response.json('Sub task expire date updated Successfully');
    })

})

app.put('/react/api/update-sub-task-status', (request, response) => {

    var query = `UPDATE sub_tasks
    set is_done=?
    where sub_task_id=?`;
    var values = [
        request.body['status'],
        request.body['id']
    ];

    connection.query(query, values, function (err, rows, fields) {
        if (err) {
            response.send('Failed');
        }
        response.json('Sub task status updated Successfully');
    })

})

app.delete('/react/api/delete-sub-task/:id', (request, response) => {

    var query = `DELETE from sub_tasks
     where sub_task_id=?`;
    var values = [
        parseInt(request.params.id)
    ];

    connection.query(query, values, function (err, rows, fields) {
        if (err) {
            response.send('Failed');
        }
        response.json('Sub task deleted Successfully');
    })

})