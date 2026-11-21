
const wait = (ms) => new Promise (res => setTimeout(res,ms))


async function run(){
    await wait(1000)
    console.log("waited 1 sec")
}

run()