function add(a, b) {
    return a + b;
}
function sub(a, b) {
    return a - b;
}


module.exports = {
    addFn: add,
    subFn: sub
} 

//generally not used anonnymous functions
// exports.add = (a, b) => a + b;
// exports.sub = (a, b) => a - b;