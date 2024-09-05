<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $fullName = $_POST['fullName'];
    $dob = $_POST['date'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $gender = $_POST['gender'];
    $country = $_POST['country'];
    $address = $_POST['address'];
    $course = $_POST['course'];
    $startDate = $_POST['startd'];
    $skills = $_POST['skills'];
    $os = $_POST['os'];
    $internet = $_POST['internet'];
    $laptop = $_POST['laptop'];
    $commitment = $_POST['commitment'];

    // Define the recipient email
    $to = "zainab3017@gmail.com"; // Replace with your email
    $subject = "New Course/Diploma Form Submission";

    // Create the message body
    $message = "
    Full Name: $fullName\n
    Date of Birth: $dob\n
    Phone: $phone\n
    Email: $email\n
    Gender: $gender\n
    Country: $country\n
    Address: $address\n
    Course: $course\n
    Preferred Start Date: $startDate\n
    Skills: $skills\n
    Operating System: $os\n
    Internet Speed: $internet\n
    Laptop Availability: $laptop\n
    Commitment: $commitment
    ";

    // Define the email headers
    $headers = "From: $email";

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        echo "Form submitted successfully.";
    } else {
        echo "Error: Form submission failed.";
    }
} else {
    echo "Invalid request.";
}
?>
