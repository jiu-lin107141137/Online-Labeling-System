from functools import wraps
from flask import request, jsonify, Response
import jwt
from typing import Tuple

def user_authorize(fun):
    @wraps(fun)
    def decorated_function(*args, **kws):
        if not 'token' in request.get_json():
            return 'No token found!', 401
        token = request.get_json()['token']
        validate_result = validate(token)
        if validate_result[1] == 200:
            return fun(*args, **kws)
        else:
            return validate_result
    return decorated_function

def admin_authorize(fun):
    @wraps(fun)
    def decorated_function(*args, **kws):
        if not 'token' in request.get_json():
            return 'No token found!', 401
        token = request.get_json()['token']
        validate_result = validate(token, 1)
        if validate_result[1] == 200:
            return fun(*args, **kws)
        else:
            return validate_result
    return decorated_function
        
def validate(token: str, priority: int = 0) -> Tuple[Response, int]:
    try:
        result = jwt.decode(token, "RxjYf7pd4VbAPWHfQpDfsHEqthVrk/SiqKcxuRZIqAg=", "HS256")
        if priority == 1:
            if result['Priority'] < priority:
                print(f'{result["Priority"]} < {priority}')
                return jsonify({
                    'message': 'Pirority not enough!',
                    'status': 403
                }), 403
    except jwt.exceptions.ExpiredSignatureError:
        return jsonify({
            'message': 'Token expired!',
            'status': 403,
            'expired': True
        }), 403
    except:
        return jsonify({
            'message': 'Authorize failed!',
            'status': 401
        }), 401
    return jsonify({
        'message': 'Accept!',
        'status': 200
    }), 200

