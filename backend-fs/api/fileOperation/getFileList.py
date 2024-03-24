import os
import json

def getFileList(taskId: str, subTaskId: str) -> list:
    taskId = taskId.lower()
    subTaskId = subTaskId.lower()
    dir = r'' + os.getcwd() + "/projects/" + taskId +'/config.json'


    with open(dir) as fp:
        config: dict = json.load(fp)
        for k, v in config.items():
            if k == subTaskId:
                return v['files']

    return []