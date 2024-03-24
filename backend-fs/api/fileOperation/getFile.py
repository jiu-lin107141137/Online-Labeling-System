import os
import base64
import json
import filetype
from io import BytesIO
from PIL import Image

def getFile(taskId: str, subTaskId: str, fileName: str):
    taskId = taskId.lower()
    subTaskId = subTaskId.lower()

    root = os.getcwd()
    fileName_without_extension = fileName[0:fileName.rindex('.')]
    raw_path = os.path.join(root, f'projects/{taskId}/{subTaskId}/{fileName}')

    if filetype.is_image(raw_path):
        return rt_image(root, raw_path, taskId, fileName, fileName_without_extension)
    elif filetype.is_document(raw_path) or raw_path.endswith('.txt'):
        return rt_document(root, raw_path, taskId, fileName, fileName_without_extension)

def rt_document(root, raw_path, taskId, file_name, file_name_w):
    raw_text = None
    with open(raw_path, 'r') as fp:
        raw_text = fp.read()
    
    labeled_path = os.path.join(root, f'projects/{taskId}/labeled/{file_name_w}.json')
    if not os.path.exists(labeled_path):
        return {
            'question': raw_text,
        }, -1
    else:
        try:
            with open(labeled_path, 'r') as fp:
                labeled_data: dict = json.load(fp)
        except:
            return {
                'question': raw_text,
            }, -1
        return {
            'question': raw_text,
        }, labeled_data


def rt_image(root, raw_path, taskId, file_name, file_name_w):
    raw_img = None
    try:
        raw_img = Image.open(raw_path)
        ext = file_name.split('.')[-1]
        prefix = f'data:image/{ext};base64,'
        outputBuffer = BytesIO()
        raw_img.save(outputBuffer, format=raw_img.format)
        rawImageByteData = outputBuffer.getvalue()
        rawImageBase64Str = base64.b64encode(rawImageByteData)
        rawImageBase64Str = prefix + rawImageBase64Str.decode()
    except IOError:
        return -1, -1

    labeled_path = os.path.join(root, f'projects/{taskId}/labeled/{file_name_w}.json')
    if not os.path.exists(labeled_path):
        return {
            'base64': rawImageBase64Str,
            "size": (raw_img.width, raw_img.height)
        }, -1
    else:
        # print(labeled_path)
        try:
            with open(labeled_path, 'r') as fp:
                labeled_data: dict = json.load(fp)
                labeled_data.pop('base64_img_data', None)
                # print(labeled_data)
        except Exception as e:
            print(e)
            return {
                'base64': rawImageBase64Str,
                "size": (raw_img.width, raw_img.height)
            }, -1
        
        # labeled_data[fileName]

        return {
            'base64': rawImageBase64Str,
            "size": (raw_img.width, raw_img.height)
        }, labeled_data

