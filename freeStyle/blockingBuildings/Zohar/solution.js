
const findRoofTops = (arr) =>{
    const size = arr.length; 
    if(size < 1 ) return []
    const res = [0];
    const hash = {};
    arr.forEach((value , index )=> hash[index+1]= value);
    for(let i = 1 ; i<size ; i++){
        // check if prev building's height is higher then current 
        if(arr[i-1]> arr[i]) { 
            res.push(i-1+1)
        }
        // else check if prev building on result array is higher then current
        else if(hash[res[i-1]]>arr[i]) {
             res.push(res[i-1]);
        }
        else {
            res.push(0)
        }
    }
    return res
}

console.log(findRoofTops([101,87,122,208,74,107,152,130])); 
// result -> [0,1,0,0,4,4,4,7]
console.log(findRoofTops([]));
// result -> []
console.log(findRoofTops([200,1,100]));
// result -> [0,1,1]