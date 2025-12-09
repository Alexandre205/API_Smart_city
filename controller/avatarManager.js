import {saveAvatar} from '../model/avatarManager.js';

const avatarFolder = "./upload/avatar";

export function avatarValidation (req, res){
    const avatar = req.file;
    if(avatar === undefined)
    {
        res.sendStatus(400);
    } else {
        const promises = [];
        promises.push(
            saveAvatar(avatar.buffer, req.session.id, avatarFolder)
        );

        Promise.all(promises).then(() => {
            res.sendStatus(201);
        })
            .catch(error => {
                console.error(error);
                res.sendStatus(500);
            });
    }
}