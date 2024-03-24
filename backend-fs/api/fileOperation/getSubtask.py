import os
import json

def getSubtask(taskId:str, lablerId=None) -> list:
    def countUnlabeledAndUnaccpted(obj) -> list[int]:
        '''
        status
        0: not yet labeled
        1: labeled, waiting for review
        2: reviewed, and was rejected
        3: accepted
        '''
        labeled = 0
        accepted = 0
        rejected = 0
        for o in obj:
            if o['status'] == 1:
                labeled += 1
            elif o['status'] == 2:
                rejected += 1
            elif o['status'] == 3:
                accepted += 1
            
            
        return labeled, rejected, accepted
    
    taskId = taskId.lower()
    dir = r'' + os.getcwd() + "/projects/" + taskId +'/config.json'
    # print(dir)
    rt = []
    try:
        with open(dir) as fp:
            config: dict = json.load(fp)
            config.pop('attrs')
            if lablerId is not None:
                config = {k: v for k, v in config.items() if v['info']['labelerId'] == lablerId}
            for k, v in config.items():
                d = countUnlabeledAndUnaccpted(v['files'])
                rt.append({
                    'subtaskId': v['info']['guid'],
                    'folderName': v['info']['folderName'],
                    'fileCount': len(v['files']),
                    'labelerId': v['info']['labelerId'],
                    'labeled': d[0],
                    'rejected': d[1],
                    'accepted': d[2],
                })
    except:
        pass
    return rt