import os
import json

def putReview(taskId: str, subTaskId: str, review: list) -> tuple[bool, str]:
    taskId = taskId.lower()
    subTaskId = subTaskId.lower()

    root = os.getcwd()
    configPath = \
        os.path.join(root, f'projects/{taskId}/config.json')
    
    try:
        with open(configPath) as fp:
            config = json.load(fp)
    except: 
        return (False, 'load file failed!')
    
    if len(review) != len(config[subTaskId]['files']):
        return (False, 'the length of file list is incorrect!')
    
    config[subTaskId]['files'] = review

    # save the config file
    with open(configPath, 'w') as fp:
        json.dump(config, fp, ensure_ascii=False)
    
    return (True, 'save file successfully!')