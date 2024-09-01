<?php
  //Import PHPMailer classes into the global namespace
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\SMTP;

  require '../assets/vendor/PHPMailer/src/Exception.php';
  require '../assets/vendor/PHPMailer/src/PHPMailer.php';
  require '../assets/vendor/PHPMailer/src/SMTP.php';

  // Replace contact@example.com with your real receiving email address
  $receiving_email_address = 'bayubayyz@gmail.com';


  try {

    //Create a new PHPMailer instance
    $mail = new PHPMailer();

    //Server settings
    $mail->isMail(); // Use PHP's mail() function instead of SMTP

    //Recipients
    $mail->setFrom($_POST['email'], $_POST['name']);
    $mail->addAddress('bayubayyz@gmail.com'); // Add the recipient's address


    //Content
    $mail->isHTML(true);
    $mail->Subject = $_POST['subject'];
    $mail->Body    = $_POST['message'];

    $mail->send();
    echo 'Message has been sent';
  } catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
  }

  // if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
  //   include( $php_email_form );
  // } else {
  //   die( 'Unable to load the "PHP Email Form" Library!');
  // }

  // $contact = new PHP_Email_Form;
  // $contact->ajax = true;
  
  // $contact->to = $receiving_email_address;
  // $contact->from_name = $_POST['name'];
  // $contact->from_email = $_POST['email'];
  // $contact->subject = $_POST['subject'];

  // // Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
  // /*
  // $contact->smtp = array(
  //   'host' => 'example.com',
  //   'username' => 'example',
  //   'password' => 'pass',
  //   'port' => '587'
  // );
  // */

  // $contact->add_message( $_POST['name'], 'From');
  // $contact->add_message( $_POST['email'], 'Email');
  // $contact->add_message( $_POST['message'], 'Message', 10);

  // // echo $contact->send();

  // if($contact->send()) {
  //   echo 'Message sent successfully!';
  // } else {
  //   echo 'Message sending failed!';
  // }
?>
