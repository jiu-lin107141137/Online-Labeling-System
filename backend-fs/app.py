import logging
from flask import Flask, jsonify, request;
from flask_cors import CORS
from api import API
from authMiddleWare import user_authorize, admin_authorize

logging.getLogger('flask_cors').level = logging.DEBUG

app = Flask(__name__)
CORS(app)
# app.wsgi_app

api = API()

@app.route('/put/review', methods=['POST'])
@admin_authorize
def put_review():
    try:
        taskGuid = request.get_json()['taskGuid']
        subTaskGuid = request.get_json()['subTaskGuid']
        review = request.get_json()['review']
    except:
        return jsonify({
            'status': 401,
            'message': 'insufficient parameters',
            'rt': False,
        }), 401
    
    return api.put_review(taskGuid, subTaskGuid, review)

@app.route('/put/labeled', methods=['POST'])
@user_authorize
def put_labeled():
    try:
        taskGuid = request.get_json()['taskGuid']
        subTaskGuid = request.get_json()['subTaskGuid']
        labeled = request.get_json()['labeled']
    except:
        return jsonify({
            'status': 401,
            'message': 'insufficient parameters',
            'rt': False,
        }), 401

    return api.put_labeled(taskGuid, subTaskGuid, labeled)

@app.route('/get/file', methods=['POST'])
@admin_authorize
def get_file():
    try:
        taskGuid = request.get_json()['taskGuid']
        subTaskGuid = request.get_json()['subTaskGuid']
        fileName = request.get_json()['fileName']
    except:
        return jsonify({
            'status': 401,
            'message': 'insufficient parameters'
        }), 401
    
    return api.get_file(taskGuid, subTaskGuid, fileName)

@app.route('/get/attributes', methods=['POST'])
@user_authorize
def get_attributes():
    try:
        taskId = request.get_json()['taskGuid']
    except:
        return jsonify({
            'status': 401,
            'message': 'insufficient parameters'
        }), 401

    return api.get_attributes(taskId)


@app.route('/get/fileList', methods=['POST'])
@admin_authorize
def get_file_list():
    try:
        taskGuid = request.get_json()['taskGuid']
        subTaskGuid = request.get_json()['subTaskGuid']
    except:
        return jsonify({
            'status': 401,
            'message': 'insufficient parameters'
        }), 401
    
    return api.get_file_list(taskGuid, subTaskGuid)

@app.route('/get/folderList', methods=['POST'])
@admin_authorize
def get_projects_folder_list():
    # try: 
    #     name = request.get_json()['folderName']
    # except:
    #     return jsonify({
    #         'status': 400,
    #     })
    return api.get_projects_folder_list()

@app.route('/create/projectsFolder', methods=['POST'])
@admin_authorize
def create_projects_folder():
    try:
        guid = request.get_json()['folderGuid']
    except:
        return jsonify({
            'status': 400,
            'message': 'insufficient parameters'
        }), 400

    return api.create_projects_folder(guid)
    
@app.route('/get/fileCount', methods=['POST'])
@admin_authorize
def get_file_count():
    try:
        guid = request.get_json()['folderGuid']
    except:
        return jsonify({
            'status': 401,
            'message': 'insufficient parameters'
        }), 401

    return api.get_file_count(guid, True)

@app.route('/divide', methods=['POST'])
@admin_authorize
def divide_folder():
    try:
        jsonData = request.get_json()
        guid = jsonData['folderGuid']
        infos = jsonData['subFolderInfos']
        fa = jsonData['fileAttributes']
        ra = jsonData['regionAttributes']
    except:
        return jsonify({
            'status': 401,
            'message': 'insufficient parameters'
        }), 401

    return api.divide_folder(guid, infos, fa, ra)

@app.route('/get/subtasks', methods=['POST'])
@user_authorize
def get_subtask():
    try:
        taskGuid = request.get_json()['taskGuid']
        labelerId = request.get_json()['labelerId']
    except:
        return jsonify({
            'status': 401,
            'message': 'insufficient parameters'
        }), 401

    return api.get_subtask(taskGuid, labelerId)


if __name__ == '__main__':
    app.run(debug=True, port=5000, host="0.0.0.0")
