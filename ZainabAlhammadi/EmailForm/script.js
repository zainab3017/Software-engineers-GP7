document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect the form data
    var name = document.querySelector('input[name="name"]').value;
    var password = document.querySelector('input[name="password"]').value;
    var feedback = document.querySelector('textarea[name="feedback"]').value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var subjects = Array.from(document.querySelectorAll('input[name="subject"]:checked'))
                        .map(function(el) {
                            return el.value;
                        }).join(", ");

    // Send the email using EmailJS
    emailjs.send("service_0z06xqt", "template_o17sh8g", {
        name: name,
        password: password,
        feedback: feedback,
        gender: gender,
        subjects: subjects
    })
    .then(function(response) {
       alert('SUCCESS!', response.status, response.text);
    }, function(error) {
       alert('FAILED...', error);
    });
});
