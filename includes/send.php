<?php
// Error reporting, turn off when we launch
error_reporting(E_ALL);
ini_set('display_errors', 1);

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Recipient email 
    $recipient = 'no-replay@ajayantonyraj.ca';
    $subject = 'Portfolio Contact Form - New Message';
    
    // Get raw form data
    $first_raw = $_POST['first_name'] ?? '';
    $last_raw = $_POST['last_name'] ?? '';
    $email_raw = $_POST['email'] ?? '';
    $msg_raw = $_POST['message'] ?? '';
    $social_raw = $_POST['social'] ?? ''; 

    // Sanitize inputs
    $first = trim(strip_tags($first_raw));
    $last = trim(strip_tags($last_raw));

    $visitor_name = trim($first . ' ' . $last);
    
    // Clean and validate email
    $email_clean = str_replace(["\r", "\n", "%0a", "%0d"], '', trim($email_raw));
    $visitor_email = filter_var($email_clean, FILTER_VALIDATE_EMAIL);

    $message = trim(strip_tags($msg_raw));
    $social = trim(strip_tags($social_raw));

    // Validation array
    $fail = [];
    
    if($first == '') {
        $fail[] = 'first_name';
    }
    if($last == '') {
        $fail[] = 'last_name';
    }
    if(!$visitor_email) {
        $fail[] = 'email';
    }
    if($message == '') {
        $fail[] = 'message';
    }
    
    // If validation fails
    if(!empty($fail)) {
        $error_msg = urlencode('Please fix: ' . implode(', ', $fail));
        header("Location: ../contact.php?msg=$error_msg");
        exit;
    }

    // Build email body
    $emailBody = "You have received a new message from your portfolio website:\r\n\r\n";
    $emailBody .= "Name: {$visitor_name}\r\n";
    $emailBody .= "Email: {$visitor_email}\r\n";
    if($social != '') {
        $emailBody .= "Social Media: {$social}\r\n";
    }
    $emailBody .= "\r\nMessage:\r\n{$message}\r\n\r\n";
    $emailBody .= "---\r\n";
    $emailBody .= "Sent: " . date('F j, Y, g:i a') . "\r\n";

    // Email headers
    $fromAddress = "noreply@ajayantoneyraj-portfolio.com";
    $headers = "From: Portfolio Website <{$fromAddress}>\r\n";
    $headers .= "Reply-To: {$visitor_email}\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

    // Send email
    $send = mail($recipient, $subject, $emailBody, $headers);

    if($send) {
        $thankyou = urlencode("Thank you for your message, " . htmlspecialchars($visitor_name, ENT_QUOTES, 'UTF-8') . "! You'll get a reply within 24 hours.");
        header("Location: ../contact.php?msg=$thankyou&success=1");
        exit();
    } else {
        $error = urlencode("Message failed to send. Please try again later.");
        header("Location: ../contact.php?msg=$error");
        exit();
    }

} else {
    echo "<p>Invalid request method</p>";
}
?>