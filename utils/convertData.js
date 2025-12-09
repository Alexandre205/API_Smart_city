export const extractXAndY = (coordonneeStr)=>{
    if(coordonneeStr){
        const [x, y] = coordonneeStr.split(',').map(Number);
        return {x,y};
    }
}

export const extractFields = (stringFields)=>{
    if(stringFields){
        let arrFields = stringFields.split(',');
        return arrFields;
    }
}