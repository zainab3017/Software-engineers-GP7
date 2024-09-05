<?php
$to = "your_email@example.com"; // Replace with your email
$subject = "Test Mail";
$message = "This is a test email sent from PHP.";
$headers = "From: test@yourdomain.com";

if (mail($to, $subject, $message, $headers)) {
    echo "Test email sent successfully!";
} else {
    echo "Failed to send test email.";
}
?>