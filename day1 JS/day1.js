// let x = 15 ;

// console.log(x)
// console.log(typeof (x))
// console.log(typeof typeof x)

// let x = 75 
// console.log( x > 20 ? "true" : "false" )


// let grade = 80

// if (grade >= 90){
// console.log("Grade : a")
// }

// else if (grade >= 80){
// console.log("Grade : b")
// }

// else{
// console.log("Grade : fail ")
// }


// let x = 80 ;

// switch (x){
//     case 1 :
//     console.log("Printed 1")
//     break ;
//     case 2 :
//     console.log("Printed 2")
//     break ;
//     case 3 :
//     console.log("Printed 3")
//     break ;
//     default :
//     console.log("Printed 4")
//     break ;

// }


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


largest([1,5,3,6])


const shape = {
   
    length : 10,
    breadth : 20,
    area : function(){console.log(this.length * this.breadth) }

}

shape.area();