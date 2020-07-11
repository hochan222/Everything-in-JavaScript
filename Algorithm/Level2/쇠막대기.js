function solution(arrangement) {
    var data = arrangement, 
        stack = [], count = 0, before = '';
    
    data.split('').map( v => {
        console.log(before, v, stack, count);
        stack.push(v);
        
        if ( v === ')' ) {
            if ( before === '(' && stack.length === 2 ) {
                stack.pop();
                stack.pop();
            } else if (before === '(') {
                count += stack.length -2;
                stack.pop();
                stack.pop();
            } else if (before === ')' && stack[stack.length-2] === '(') {
                stack.pop();
                stack.pop();
                count++;
            }
        }
        before = v;
        
    });

    //console.log(count);
    return count;
}