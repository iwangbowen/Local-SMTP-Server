# Local-SMTP-Server
Set up a local SMTP server using node.js

Refer to this [website](https://nodemailer.com/about/) for more 
information concerning email sending.

Learn how to set up a local SMTP server on [here](https://nodemailer.com/extras/smtp-server/).
This module does not make any email deliveries by itself. smtp-server allows you to listen on 
ports 25/24/465/587 etc. using SMTP or LMTP protocol and that’s it. Your own application is 
responsible of accepting and delivering the message to destination.

smtp-server module is designed to implement SMTP protocol which allows the client to communicate
with the server. You can refer to [web page](http://www.cnblogs.com/xdp-gacl/p/4209586.html) to learn
more about SMTP protocol specifications and how to use telnet to communicate with specified servers directly. But it
doesn't actually send mails to the recipient addresses after completing the communication successfully.
So we use [module](https://github.com/guileen/node-sendmail) to learn how to send mail without setting 
up a SMTP server.
