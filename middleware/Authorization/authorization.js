export function isAdmin(status) {
    return status === 'admin';
};

export function isValidId(sessionId,idToCheck){
    return String(sessionId) === String(idToCheck)
}