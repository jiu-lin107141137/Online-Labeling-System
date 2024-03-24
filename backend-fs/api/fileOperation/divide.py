from typing import Tuple, Union
from pathlib import Path
from .createNewFolder import createNewFolder
from .getFileCount import getFileCount
import os
import json

def divide(folderGuid: str, subFolderInfos: list, fa: list, ra: list) -> Union[int, Tuple[int, list]]:

    def folderExists(folderGuid: str) -> bool:
        dir_path = os.getcwd()+"/projects/"+folderGuid
        projectFolderPath = Path(dir_path)
        return projectFolderPath.exists()
    
    '''
    subFolderInfo:
    {
        folderFileCount: int,
        folderName: str,
        folderGuid: str,
        folderLabelerId: str,
        files: [str] <---- added by backend
    }
    '''
    # check if the format of data is correct and count how many files requested to be operated

    folderGuid = folderGuid.lower()
    for i in range(len(subFolderInfos)):
        subFolderInfos[i]['folderGuid'] = subFolderInfos[i]['folderGuid'].lower()


    if not folderExists(folderGuid=folderGuid):
        return 0 # folder doesn't exist
    
    dir_path = os.getcwd()+"/projects/"+folderGuid

    listFileCount: int = 0
    for item in subFolderInfos:
        if "folderFileCount" in item:
            listFileCount += item['folderFileCount']
        else:
            return -1 # incorrect format

    # count how many files are in the specific folder
    files:Tuple[int, list, list] = getFileCount(folderGuid=folderGuid, getFileList=True)
    # for path in os.listdir(dir_path):
    #     if os.path.isfile(os.path.join(dir_path, path)):
    #         fileCount += 1
    
    # check if the flie number and the requested number are same
    if files[0] != listFileCount:
        return -2 # incorrect sum of files

    # create folders
    movedFileCount: int = 0
    currentFolderIndex: int = 0
    createState = createNewFolder(folderGuid=folderGuid, subFolderList=subFolderInfos)

    if createState == -1:
        return -3 # unknown error while creating new sub folders
    elif createState == 0:
        return -4 # the sub folder had existed and has one more files
    
    countTmp = 0
    perfixOfCount = []
    write_json = {}

    write_json['attrs'] = {
        'file': fa,
        'region': ra
    }

    for i in range(len(subFolderInfos)):
        # m = hashlib.shake_256()
        # m.update(folderInfo[i]['name'].encode())
        countTmp += subFolderInfos[i]['folderFileCount']
        perfixOfCount.append(countTmp)
        subFolderInfos[i]['fileNames'] = []
        subFolderInfos[i]['folderGuid'] = subFolderInfos[i]['folderGuid'].lower()
        write_json[subFolderInfos[i]['folderGuid']] = {
            'info' : {
                'guid': subFolderInfos[i]['folderGuid'],
                'folderName': subFolderInfos[i]['folderName'],
                'labelerId': subFolderInfos[i]['folderLabelerId'],
            },
            'files': []
        }

    while movedFileCount < listFileCount:
        subFolderDir = dir_path + '/' + files[1][movedFileCount]

        subFolderPath: Path = Path(subFolderDir)

        subFolderPath.rename(dir_path + '/' + subFolderInfos[currentFolderIndex]['folderGuid'] + '/' + files[1][movedFileCount])

        write_json[subFolderInfos[currentFolderIndex]['folderGuid']]['files'].append({
            'fileName': files[1][movedFileCount],
            'status': 0,
        })
        # subFolderInfos[currentFolderIndex]['fileNames'].append(files[1][movedFileCount])
        movedFileCount += 1
        if(movedFileCount == perfixOfCount[currentFolderIndex]):
            currentFolderIndex += 1

        
    configDir = r'' + dir_path + '/' + 'config.json'
    # if not os.path.exists(configDir):
    with open(configDir, 'w+') as fp:
        json.dump(write_json, fp, ensure_ascii=False)

    return 1