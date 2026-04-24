Plan: Run File Organizer on Your Personal Directory
TL;DR: Use the Node.js CLI (organizer.js) to scan and organize files in any directory. Run it via terminal with a dry-run first to preview changes safely, then run without --dry-run to actually move files.

_________________________________________________Steps___________________________________________________

Step1: In this terminal, type; " node -v "
    The system should reply back with v20.x.x or v24.14.x (just different versions of Node). If the system does not return the above, you need to download Node.js into you Visual Studio or other software. 

Step 2: Open Powershell on your windows device

Step 3: You need to call the organizer.js file. If your not sure find the file and hit ' copy path ' 
    so you now have the location. In power shell type the following command; " cd (Paste_Path_Here) " .
    An example would be the following " cd Desktop/File-Organizer-and-Cleaner-Capstone- " .

Step 4: Choose your directory that you would lik to be organized. An example may be your desktop or downloads.

Step 5: Do a dry run so you can see what wil happen. THIS WILL NOT MOVE ANYTHING. Type the following comand into  Powershell;  node organizer.js "Paste_Path_Here" --recursive --dest "MyOrganizedFiles" --dry-run

Step 6: Verify that the organization is what you would like. If so you may then insert the following comand which will move and organize files;  node organizer.js "Paste_Path_Here" --recursive -dest "MyOrganizedFiles"

_____________________________________________NOTES WHEN RUNNING____________________________________________

* You are inside the folder that has organized.js To double check input " dir " and you should see organized.js selected.

* If the intent is to organize your desktop or any other directory that already has files organized, the code will not alter pre existing organized files. 

* Make sure when running commands that there are no prexisting commands that are attempting to run or the command will not work. To make sure you can end all on going commands with ^C

