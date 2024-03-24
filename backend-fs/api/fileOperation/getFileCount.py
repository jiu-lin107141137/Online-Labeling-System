import os
from typing import Tuple, Union

def getFileCount(folderGuid: str, getFileList: bool = False) -> Union[int, Tuple[int, list, list]]:
    # m = hashlib.shake_256()
    # m.update(folderGuide.encode())
    # folderGuid = m.hexdigest(10)
    dir_path = os.getcwd()+"/projects/"+folderGuid

    try:
        onlyfiles = next(os.walk(dir_path))
    except:
        return -1, [], []
    
    if 'config.json' in onlyfiles[2]:
        onlyfiles[2].remove('config.json')

    if not getFileList:
        return len(onlyfiles[2])
    else:
        return len(onlyfiles[2]), onlyfiles[2], onlyfiles[1]