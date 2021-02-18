import mysql.connector
from flask import Flask, request, Response
from flask_cors import CORS, cross_origin
import json
app = Flask(__name__)

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="tp4_python"
)
mycursor = mydb.cursor()

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/')
@cross_origin()
def hello_world():
    return "Bienvenue sur la page d'acceuil"

@app.route('/todo', methods = ['GET','POST'])
@cross_origin()
def todo():
    if request.method == 'GET':

        if request.args.get('date') is None:
            mycursor.execute("SELECT * FROM todolist")
            myresult = mycursor.fetchall()
            json_test = json.dumps(myresult, ensure_ascii=False).encode('UTF-8')
            return Response(json_test, mimetype='text/json')

        if request.args.get('date') is not None:
            params = request.args.get('date')
            mycursor.execute("SELECT * FROM todolist WHERE deadline="+params)
            myresult = mycursor.fetchall()
            if len(myresult) > 0:
                item = json.dumps(myresult, ensure_ascii=False).encode('UTF-8')
                return Response(item, mimetype='text/json')
            else:
                return "Auncune tâche", 404

    elif request.method == 'POST':
        if request.get_json(silent=True) is not None:
            params = request.get_json()
            params2 = params['deadline']
            params3 = params['title']
            params4 = params['Description']
            params5 = params['done']
            sql = "INSERT INTO todolist (deadline, title, Description, done) VALUES (%s, %s, %s, %s)"
            val = [(params2, params3, params4, params5)]
            mycursor.executemany(sql, val)
            mydb.commit()
            return "Created", 201
        else:
            return "Bad request", 400


@app.route('/todo/<int:id>', methods = ['GET','DELETE','PUT','PATCH'])
@cross_origin()
def todo_id(id):

    if request.method == 'GET':
        mycursor.execute("SELECT * FROM todolist WHERE id="+str(id))
        myresult = mycursor.fetchall()
        if myresult != []:
            item = json.dumps(myresult, ensure_ascii=False).encode('UTF-8')
            return Response(item, mimetype='text/json')
        else:
            return "Not found", 404

    elif request.method == 'DELETE':
        mycursor.execute("SELECT * FROM todolist WHERE id="+str(id))
        myresult = mycursor.fetchall()
        if myresult != []:
            sql = ("DELETE FROM todolist WHERE id="+str(id))
            mycursor.execute(sql)
            mydb.commit()
            return "OK", 200
        else:
            return "No Content", 204

    elif request.method == 'PUT':
        params = request.get_json()
        params2 = params['deadline']
        params3 = params['title']
        params4 = params['Description']
        params5 = params['done']
        val = (params2, params3, params4, params5, id)
        sql = "UPDATE todolist SET deadline='%s', title='%s', Description='%s', done='%s' WHERE id ='%s'" % val
        mycursor.execute(sql)
        mydb.commit()
        return "OK", 200

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)


