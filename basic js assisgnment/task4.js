const shape = {
    area: function () {
        return this.length * this.breadth;
    }
}

const rectangle = {
    length: 10,
    breadth: 5,
    area: shape.area
}

const square = {
    length: 4,
    breadth: 4,
    area: shape.area
}

console.log("Area of Rectangle:", rectangle.area())
console.log("Area of Square:", square.area())