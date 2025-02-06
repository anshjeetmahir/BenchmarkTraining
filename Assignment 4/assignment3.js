let memoryLeakArray = [];
let leakInterval, monitorInterval;


function simulateMemoryLeak() {
    leakInterval = setInterval(() => {
        memoryLeakArray.push(new Array(1000000));

        console.log(`Memory Leak: Array length = ${memoryLeakArray.length}`);

        if (memoryLeakArray.length >= 15) {
            stopAllProcesses();
        }
    }, 1000);
}


function monitorMemoryUsage() {
    if (performance.memory) {
        monitorInterval = setInterval(() => {
            console.log(`Heap Size: ${(performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`);//coverting bytes to MB and fixing numbers to 2 after decimal
        }, 2000);
    }
}


function stopAllProcesses() {
    clearInterval(leakInterval);
    clearInterval(monitorInterval);
    memoryLeakArray = [];//to free memory
    console.log("Memory leak simulation stopped, and memory cleared.");
}


simulateMemoryLeak();
monitorMemoryUsage();


//output
// Memory Leak: Array length = 1
// assignment3.js:9 Memory Leak: Array length = 2
// assignment3.js:21 Heap Size: 78.78 MB
// assignment3.js:9 Memory Leak: Array length = 3
// assignment3.js:9 Memory Leak: Array length = 4
// assignment3.js:21 Heap Size: 89.37 MB
// assignment3.js:9 Memory Leak: Array length = 5
// assignment3.js:9 Memory Leak: Array length = 6
// assignment3.js:21 Heap Size: 97.61 MB
// assignment3.js:9 Memory Leak: Array length = 7
// assignment3.js:9 Memory Leak: Array length = 8
// assignment3.js:21 Heap Size: 43.13 MB
// assignment3.js:9 Memory Leak: Array length = 9
// assignment3.js:9 Memory Leak: Array length = 10
// assignment3.js:21 Heap Size: 55.01 MB
// assignment3.js:9 Memory Leak: Array length = 11
// assignment3.js:9 Memory Leak: Array length = 12
// assignment3.js:21 Heap Size: 58.11 MB
// assignment3.js:9 Memory Leak: Array length = 13
// assignment3.js:9 Memory Leak: Array length = 14
// assignment3.js:21 Heap Size: 65.75 MB
// assignment3.js:9 Memory Leak: Array length = 15
// assignment3.js:31 Memory leak simulation stopped, and memory cleared.