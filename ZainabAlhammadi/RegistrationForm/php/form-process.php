<?php 
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
 
require 'config.php';
 
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
 

 if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = $_POST['first-name'] ?? '';
    $middleName = $_POST['middle-name'] ?? '';
    $lastName = $_POST['last-name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone-number'] ?? '';
    $address = $_POST['street-home-addrees'] ?? '';
    $area = $_POST['area'] ?? '';
    $city = $_POST['city'] ?? '';
    $country = $_POST['country'] ?? '';
    $birthDate = $_POST['month'] . '/' . $_POST['day'] . '/' . $_POST['year'];
    $gender = $_POST['gender'] ?? '';
    $course = $_POST['select-your-course'] ?? '';
    $preferredDate = $_POST['preferred-start-date'] ?? '';
    $preferredTime = $_POST['preferred-time-for-online-sessions'] ?? '';
    $preferredDays = $_POST['preferred-training-days'] ?? '';
    $device = $_POST['device'] ?? '';
    $os = $_POST['operating-system'] ?? '';
    $internetAccess = $_POST['internet-access'] ?? '';
    $skillLevel = $_POST['skill-level'] ?? '';
    $onlinePlatform = $_POST['online-platform'] ?? '';
    $learningNeeds = $_POST['specific-learning-needs'] ?? '';
    $comments = $_POST['additional-comments'] ?? '';

    // File uploads
    $profilePicture = $_FILES['profile-picture'];
    $personalId = $_FILES['personal-id'];


    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->isSMTP();                                            
        $mail->Host = MAILHOST;
        $mail->SMTPAuth = true;                                   
        $mail->Username = USERNAME;                  
        $mail->Password = PASSWORD;                           
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         
        $mail->Port = 587;                                        

        //Recipients
        $mail->setFrom(SEND_FROM, SEND_FROM_NAME);
        $mail->addAddress('zainab3017@gmail.com', 'Zainab');

        // Attach uploaded files
        if ($profilePicture['error'] == 0) {
            $mail->addAttachment($profilePicture['tmp_name'], $profilePicture['name']);
        }
        if ($personalId['error'] == 0) {
            $mail->addAttachment($personalId['tmp_name'], $personalId['name']);
        }

        //Content
        $mail->isHTML(true);                                  
        $mail->Subject = 'New Registration Form Submission';
        $mail->Body    = "<h3>Form Submission Details</h3><br>" .
            "<p><strong>Name:</strong> $firstName $middleName $lastName</p>" .
            "<p><strong>Email:</strong> $email</p>" .
            "<p><strong>Phone:</strong> $phone</p>" .
            "<p><strong>Address:</strong> $address, $area, $city, $country</p>" .
            "<p><strong>Birth Date:</strong> $birthDate</p>" .
            "<p><strong>Gender:</strong> $gender</p>" .
            "<p><strong>Course:</strong> $course</p>" .
            "<p><strong>Preferred Date:</strong> $preferredDate</p>" .
            "<p><strong>Preferred Time:</strong> $preferredTime</p>" .
            "<p><strong>Preferred Days:</strong> $preferredDays</p>" .
            "<p><strong>Device:</strong> $device</p>" .
            "<p><strong>Operating System:</strong> $os</p>" .
            "<p><strong>Internet Access:</strong> $internetAccess</p>" .
            "<p><strong>Skill Level:</strong> $skillLevel</p>" .
            "<p><strong>Familiar with Online Platform:</strong> $onlinePlatform</p>" .
            "<p><strong>Specific Learning Needs:</strong> $learningNeeds</p>" .
            "<p><strong>Additional Comments:</strong> $comments</p>";

        $mail->send();
        echo "success";
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    echo "There was a problem with your submission, please try again.";
}
?>
