// positive or negetive
const chechNum = (x) =>{
  console.log( x >= 0 ? "Number is positive" : "Number is negetive")
}
chechNum(-1)

//largest in array

let largest = (arr) =>{
  
    let max =  arr[0]

    for(let i=0 ; i < arr.length ; i ++){
      
        if( arr[i] > max){
            max = arr[i]
        }
    }

    console.log(max)
}
