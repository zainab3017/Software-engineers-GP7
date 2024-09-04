function submitForm() {
    // Get all form inputs
    var inputs = document.querySelectorAll('input, select, textarea, checkbox, select');

    // Check if all inputs are filled
    var allFilled = true;
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value === '') {
            allFilled = false;
            break;
        }
    }

    // Display pop-up message
    if (allFilled) {
        alert('AL-BYAN INSTITUTE EDUCATION SUPPORT SERVICES\n\nForm submitted correctly!');

        // The code below is from the website : https://web3forms.com/ it is a code that connects the form with the site in order to receive emails and messages through it. from line No.20 to line No.57
        
        const form = document.getElementById('form');
        const result = document.getElementById('result');

        form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        result.innerHTML = "Please wait..."

        fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    result.innerHTML = "Form submitted successfully";
                } else {
                    console.log(response);
                    result.innerHTML = json.message;
                }
            })
            .catch(error => {
                console.log(error);
                result.innerHTML = "Something went wrong!";
            })
            .then(function() {
                form.reset();
                setTimeout(() => {
                    result.style.display = "none";
                }, 3000);
            });
        });
        
        // Reset form inputs
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }

        // if the above conditions does not work or the conditions are wrong so the below message will be displayed in line No 66 - 68

    } else {
        alert('AL-BYAN INSTITUTE EDUCATION SUPPORT SERVICES\n\nPlease fill all fields.');
    }
}
