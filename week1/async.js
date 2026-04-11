console.log('Program ending');

async function timer(process){
    let t1=new Date().getTime();
    await process();
    let t2=new Date().getTime();
    console.log(`Time taken: ${t2-t1} ms`);
};


let p1= async function (){
    await setTimeout(async () => { //waits for x milliseconds before executing the function
        return('Process1 completed');
    }, 2000);
}

let p2= async function (){
    await setTimeout(async () => { //waits for x milliseconds before executing the function
        return('Process2 completed');
    }, 5000);
}

async function main(){
    await timer(p1);
    await timer(p2);
}

await main();