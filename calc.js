module.exports = {
    sum: (x,y)=>{
        return x + y;
    },
    sub: (x,y)=>{
        return x - y;
        
    },
    mult: (x,y)=>{
        return x * y;
        
    },
    div: (x,y)=>{
        return x / y;   
    },
    calc: function(x,y){
        return this.sum(x,y)
    }
}