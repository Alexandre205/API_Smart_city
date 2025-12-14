export function isAdmin(status) {
    return status === 'admin';
};

export const userAuthentification = async(req,res,next)=>{
    if(!isAdmin(req.session.status)){
        
        req.val = {authId:req.session.id};
    }
    next();
}