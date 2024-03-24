import os
import base64
import json
import filetype
from io import BytesIO
from PIL import Image

def putLabeled(taskId: str, subTaskId: str, labeled: dict):
    taskId = taskId.lower()
    subTaskId = subTaskId.lower()

    root = os.getcwd()
    rawPath = \
        os.path.join(root, f'projects/{taskId}/{subTaskId}/')
    labeledPath = \
        os.path.join(root, f'projects/{taskId}/labeled/')
    configPath = \
        os.path.join(root, f'projects/{taskId}/config.json')
    try:
        with open(configPath) as fp:
            config = json.load(fp)
    except:
        return False
    
    for fn in labeled.keys():
        # try to load the image and base64
        rawFilePath = os.path.join(rawPath, fn)
        if filetype.is_image(rawFilePath):
            rawImage = None
            try:
                rawImage = Image.open(rawFilePath)
                ext = fn.split('.')[-1]
                prefix = f'data:image/{ext};base64,'
                outputBuffer = BytesIO()
                rawImage.save(outputBuffer, format=rawImage.format)
                rawImageByteData = outputBuffer.getvalue()
                rawImageBase64Str = base64.b64encode(rawImageByteData)
                rawImageBase64Str = prefix + rawImageBase64Str.decode()
            except:
                return False
            '''
            fulfill the missing information:
                base64_img_data, height and width
            '''
            labeled[fn]['base64_img_data'] = rawImageBase64Str
            labeled[fn]['width'] = rawImage.width
            labeled[fn]['height'] = rawImage.height
        elif filetype.is_document(rawFilePath) or rawFilePath.endswith('.txt'):
            rawData = ''
            try:
                with open(rawFilePath, 'r') as fp:
                    rawData = fp.read()
            except:
                return False
            labeled[fn]['data'] = rawData
            labeled[fn]['name'] = fn

    fileNameSet:set = set()

    # save the labeled data 
    fn: str
    for fn, fl in labeled.items():
        fn_without_extension = fn[0: fn.rindex('.')]
        dataPath = os.path.join(labeledPath, f'{fn_without_extension}.json')
        with open(dataPath, 'w') as fp:
            json.dump(fl, fp, ensure_ascii=False)
        fileNameSet.add(fn)

    # modify the config file
    for i in range(0, len(config[subTaskId]['files'])):
        if config[subTaskId]['files'][i]['fileName'] in fileNameSet:
            config[subTaskId]['files'][i]['status'] = 1

    # save the config file
    with open(configPath, 'w+') as fp:
        json.dump(config, fp, ensure_ascii=False)
    
    return True
