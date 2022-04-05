let inputString = 'abcabcabcabcabcabc'; 
console.log('input string', inputString)

///////* --------------- encoder start -----------------

let findLongestMatch = (target, pos) => { 
    let i = 0; 
    let maxCount = 0;
    let maxPos = -1;
    let b1;
    while (i < pos) {
        let a1 = target[i]
        let idx = 0;
        b1 = target[pos+idx]
        if (b1 === undefined) {
            break;
        }
        let curCount = 0
        while(a1 == b1) {
            curCount++; idx++;
            if(curCount > maxCount) {
                maxCount = curCount;
                maxPos = i;
            }
            a1 = target[i+idx]
            b1 = target[pos+idx]
        }
        i++
    }
    return [maxPos, maxCount, target[pos + maxCount]];
} 

let c=String.fromCharCode
let triplet = (start,len,char) => {
    return `${c(35+start)}${c(35+len)}${char?char:''}`
}

let encode = str => {
    let res=str.slice(0,3);
    for(let i=3; i < str.length;i++) {
        let [pos, count, char] = findLongestMatch(str, i)
        if (pos == -1) res += triplet(0,0,str[i])
        else {
            res += triplet(pos, count, char)
            i+=count;
        }
    }
    return res
}

///////* --------------- encoder end -----------------

let encoded = encode(inputString)

console.log(`encoded string "${encoded}"`)


///////* --------------- decoder start -----------------

let unpack =(prev, [a,b,c]) => {
    let start=a.charCodeAt(0) - 35
    let len=b.charCodeAt(0) - 35;

    let idx = start;
    while(len>0) {
        prev += prev[idx]
        idx++; len--;
    }

    return prev + (c?c:'')
}

let decode=str=>str.length <=3 
    ? str 
    : str.slice(3).match(/.{1,3}/g).reduce(unpack, str.slice(0,3))

///////* --------------- decoder end-----------------

console.log('decoded string', decode(encoded))