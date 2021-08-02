const logBtn = document.getElementById('log');
logBtn.addEventListener('click', fetchData);

async function fetchData() {

    const response = await fetch('http://192.168.0.250:1000/json/getComments?postid=1');
    const data = await response.json();

    data.forEach(obj => {
        Object.entries(obj).forEach(([key, value]) => {
            console.log(`${key} ${value}`);
        });
        console.log('-------------------');
    });
}