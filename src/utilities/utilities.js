
const decapitalize = ([first,...rest])=>first.toLowerCase()+rest;
const decapitalizeWords = (word,splitby=" ",mergeby=" ")=>{
    wordArr = word.split(splitby)
    wordArr.forEach(theWord => decapitalize(theWord));
    wordArr.join(mergeby)
    return wordArr
}
module.exports = {decapitalize, decapitalizeWords}