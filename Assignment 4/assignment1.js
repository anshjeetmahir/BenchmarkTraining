
const data = ['Anshjeet', 'Akshay', 'Vishal', 'Chinmay', 'Ravi'];


function handleData(error, data) {
    if (error) {
        console.error(error);
    } else {
        console.log('Data received:', data);
    }
}

function fetchData(callback) {
    setTimeout(() => {
        const probError = Math.random() < 0.5;
        if (probError) {
            callback('Error: Failed to fetch data', null);
        } else {
            callback(null, data);
        }

    }, 2000);
}


console.log('Starting fetching data...');
fetchData(handleData);

// Starting fetching data...
//  Error: Failed to fetch data

// Starting fetching data...
//  Data received: (5) ['Anshjeet', 'Akshay', 'Vishal', 'Chinmay', 'Ravi']