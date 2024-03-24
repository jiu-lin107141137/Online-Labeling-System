import os
import json

def getAttributes(taskGuid: str) -> tuple:
    taskGuid = taskGuid.lower()

    configPath = os.path.join(os.getcwd(), f'projects/{taskGuid}/config.json')
    if not os.path.exists(configPath):
        return ([], [])
    else:
        try:
            with open(configPath) as fp:
                config: dict = json.load(fp)
                return (config['attrs']['file'], config['attrs']['region'])
        except:
            return ([], [])