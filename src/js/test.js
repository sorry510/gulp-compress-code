const hello = 'hello world'
const sleep = (time)=> new Promise(resolve=> setTimeout(()=> resolve(), time))

!(async ()=> {
  await sleep(1000)
  console.log(hello)
})()