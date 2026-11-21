const cylinder = {
    radius: 5,
    height: 10,

    area: function () {
        return Math.PI * this.radius * this.radius * this.height
    }
};

console.log("Area of Cylinder:", cylinder.area())