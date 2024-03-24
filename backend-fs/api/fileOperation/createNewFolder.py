import os
from pathlib import Path

def createNewFolder(folderGuid: str, subFolderList: list = []) -> int:
    # m = hashlib.shake_256()
    # m.update(folderGuid.encode())
    # folderGuid = m.hexdigest(10)
    dir_path = os.getcwd()+"/projects/"+folderGuid
    if len(subFolderList) == 0:
        projectFolderPath = Path(dir_path)
        try:
            projectFolderPath.mkdir(parents=True, exist_ok=False)
            return 1
        except FileExistsError:
            return 0
        except:
            return -1
    else:
        for subFolder in subFolderList:
            # m = hashlib.shake_256()
            # m.update(subFolder["name"].encode())
            # subFolderGuid = m.hexdigest(10)
            sub_dir_path = dir_path + '/' + subFolder["folderGuid"]
            subFolderPath = Path(sub_dir_path)
            try:
                subFolderPath.mkdir(parents=True, exist_ok=False)
            except FileExistsError:
                if next(os.walk(sub_dir_path))[2]:
                    return 0
            except:
                return -1
        labeled_dir_path = dir_path + '/' + 'labeled'
        subFolderPath = Path(labeled_dir_path)
        if not subFolderPath.exists():
            try:
                subFolderPath.mkdir(parents=True, exist_ok=False)
            except FileExistsError:
                if next(os.walk(sub_dir_path))[2]:
                    return 0
            except:
                return -1
        return 1