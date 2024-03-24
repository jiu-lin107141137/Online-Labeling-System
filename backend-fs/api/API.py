from flask import jsonify, Response
from api import fileOperation

class API:
    def __init__(self) -> None:
        ...

    def put_review(self, taskGuid, subTaskGuid, review) -> Response:
        try:
            rt = fileOperation.putReview(taskGuid, subTaskGuid, review)
        except Exception as e:
            print(e)
            return jsonify({
                'status': 500,
                'message': 'Unexcepted error occurred!',
                'rt': False,
            }), 500
        
        if rt[0]:
            return jsonify({
                'status': 200,
                'message': rt[1],
                'rt': rt[0]
            }), 200
        else:
            return jsonify({
                'status': 401,
                'message': rt[1],
                'rt': rt[0]
            }), 401

    def put_labeled(self, taskGuid, subTaskGuid, labeled) -> Response:
        try:
            res = fileOperation.putLabeled(taskGuid, subTaskGuid, labeled)
        except Exception as e:
            print(e)
            return jsonify({
                'status': 500,
                'message': 'Put data failed',
                'rt': False,
            }), 500

        if res:
            return jsonify({
                'status': 200,
                "message": "Put data successfully!",
                'rt': True,
            }), 200
        else:
            return jsonify({
                'status': 400,
                'message': 'Pt data failed',
                'rt': False,
            }), 400
        
    def get_file(self, taskGuid, subTaskGuid, fileName) -> Response:
        try:
            raw, labeled = fileOperation.getFile(taskGuid, subTaskGuid, fileName)
        except Exception as e:
            print(e)
            return jsonify({
                'status': 400,
                "message": 'Unknown error occurred while fetching image from file server.',
            }), 400

        if raw == -1:
            return jsonify({
                "status": 404,
                "message": "The image requested is not found."
            }), 404

        return jsonify({
            "status": 200,
            "message": 'Fetch image successfully!',
            "raw": raw,
            "labeled": labeled,
        }), 200

    def get_attributes(self, taskId) -> Response:
        try:
            rt = fileOperation.getAttributes(taskId)
        except Exception as e:
            print(e)
            return jsonify({
                'status': 400,
                "message": 'Unknown error occurred!',
            }), 400

        return jsonify({
            'status': 200,
            'message': 'get attributes successfully!',
            'attributes': rt
        }), 200
        
    def get_file_list(self, taskGuid, subTaskGuid) -> Response:
        try:
            rt = fileOperation.getFileList(taskGuid, subTaskGuid)
        except Exception as e:
            print(e)
            return jsonify({
                'status': 400,
                "message": 'Unknown error occurred!',
                'fileList': []
            }), 400

        return jsonify({
            'status': 200,
            'message': 'get file list successfully!',
            'fileList': rt
        }), 200

    def get_projects_folder_list(self) -> Response:
        try:
            folders = fileOperation.getFolderNameList()
        except Exception as e:
            print(e)
            return jsonify({
                'status': 400,
                "message": 'Unknown error occurred!',
                'list': []
            }), 400
        
        return jsonify({
            'status': 200,
            'message': 'get successfully',
            'list': folders
        }), 200
          
    def create_projects_folder(self, guid) -> Response:
        res = fileOperation.createNewFolder(guid)

        if res == 1:
            return jsonify({
                'status': 200,
                'message': 'created successfully',
                'folder_guid': guid
            }), 200
        elif res == 0:
            return jsonify({
                'status': '400',
                'message': 'Folder exsisted',
                'folder_guid': guid
            }), 400
        else:
            return jsonify({
                'status': 500,
                'message': 'unknown error occurred',
                'folder_guid': guid
            }), 500
        
    def get_file_count(self, guid, flag=True) -> Response:
        l = fileOperation.getFileCount(guid, flag)

        return jsonify({
            'status': 200,
            'massage': 'successfully',
            'info': l
        }), 200
        
    def divide_folder(self, guid, infos, fa, ra) -> Response:
        try:
            res = fileOperation.divide(guid, infos, fa, ra)
        except Exception as e:
            print(e)
            return jsonify({
                'status': 500,
                'message': 'unknown error occurred'
            }), 500

        if res == 1:
            return jsonify({
                'status': 200,
                'message': 'created successfully',
            }), 200
        elif res == 0:
            return jsonify({
                'status': 401,
                'message': 'path doesn\'t exist'
            }), 401
        elif res == -1:
            return jsonify({
                'status': 401,
                'message': 'incorrect parameter format'
            }), 401
        elif res == -2:
            return jsonify({
                'status': 401,
                'message': 'incorrect sum of files'
            }), 401
        elif res == -3:
            return jsonify({
                'status': 500,
                'message': 'unknown error while creating new sub folders'
            }), 500
        elif res == -4:
            return jsonify({
                'status': 401,
                'message': 'the sub folder had existed and has one or more files in'
            }), 401
        
        '''
         1  -> successfully
         0  -> file doesn't exist
        -1 -> incorrect format
        -2 -> incorrect sum of files
        -3 -> unknown error while creating new sub folders
        -4 -> the sub folder had existed and has one more files
        '''

    def get_subtask(self, taskGuid, labelerId) -> Response:
        subtasks = fileOperation.getSubtask(taskGuid, labelerId)

        return jsonify({
            'status': 200,
            'massage': 'successfully',
            'subtasks': subtasks
        }), 200
