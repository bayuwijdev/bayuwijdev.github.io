<?php

class PHP_Email_Form {

  public $to;
  public $from_name;
  public $from_email;
  public $subject;
  public $smtp = array(); // SMTP settings (if needed)
  private $messages = array();

  // Function to add messages
  public function add_message($content, $label = '', $priority = 10) {
    $this->messages[] = array('content' => $content, 'label' => $label, 'priority' => $priority);
  }

  // Function to send the email
  public function send() {
    $email_headers = "From: " . $this->from_name . " <" . $this->from_email . ">\r\n";
    $email_headers .= "Reply-To: " . $this->from_email . "\r\n";
    $email_headers .= "MIME-Version: 1.0\r\n";
    $email_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $email_body = "";
    foreach ($this->messages as $message) {
      $email_body .= $message['label'] . ": " . $message['content'] . "\n";
    }

    if (!empty($this->smtp)) {
      // If SMTP settings are provided, use PHPMailer or similar to send via SMTP
      return $this->send_via_smtp($email_body, $email_headers);
    } else {
      // Send using PHP's mail function
      return mail($this->to, $this->subject, $email_body, $email_headers);
    }
  }

  // SMTP mail sending function (optional, if you need SMTP)
  private function send_via_smtp($email_body, $email_headers) {
    // Include PHPMailer or similar library
    // Set SMTP details, prepare email, and send
    // This function would be more complex and would require additional code/libraries.
    return true; // Placeholder return
  }
}

?>