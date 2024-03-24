import os
from pathlib import Path

def getFolderNameList() -> list:
    dir_path = os.getcwd()+"/projects/"
    projectFolderPath = Path(dir_path)
    folders = []
    for child in projectFolderPath.iterdir():
        if(child.is_dir()):
            folders.append(child.name)
    return folders