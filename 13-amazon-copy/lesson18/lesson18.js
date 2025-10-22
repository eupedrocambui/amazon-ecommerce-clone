function requestXML() {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        console.log(xhr.response, 1);
    });

    xhr.open('GET', 'https://supersimplebackend.dev/greeting');
    xhr.send();
}

async function requestFetch() {
    try {
        const response = await fetch('https://amazon.com');
        console.log(response.text(), 2);
    } catch (error) {
        console.log('CORS error: ', error);
    }
}

async function requestFetchPost() {
    const response = await fetch('https://supersimplebackend.dev/greeting', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: 'Pedro'})
    })

    console.log(response.text(), 3);
}

async function request18g() {
    try {
        const response = await fetch('https://supersimplebackend.dev/greeting', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.status >= 400) {
            throw response;
        }
        
        //console.log(response.text());

    } catch (error) {
        if (error.status === 400) {
            const errorJSON = await error.json();
            console.log(errorJSON);
            
        } else {
            console.log('network error');
        }
    }

}


//requestXML();
//requestFetch();
//requestFetchPost();
request18g();