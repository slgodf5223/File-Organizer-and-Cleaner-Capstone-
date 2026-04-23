Plan: Run File Organizer on Your Personal Directory
TL;DR: Use the Node.js CLI (organizer.js) to scan and organize files in any directory. Run it via terminal with a dry-run first to preview changes safely, then run without --dry-run to actually move files.

                                Steps

Open a terminal in your system (Windows PowerShell or Command Prompt)

Navigate to the project folder

Test with dry-run first (see what would happen without moving files):

Replace YourName with your actual username. Add --recursive if you want subfolders included:

Run the organizer for real (once you approve the dry-run preview):

This creates an organized folder inside Downloads and moves files into categories (images, documents, audio, code, others)

node organizer.js "C:\Users\YourName\Downloads" --recursive --dest "MyOrganizedFiles"

                        Relevant files

organizer.js — Core logic; defines file categories and handles scanning/moving
                        Verification

Run with --dry-run and review the console output to confirm files are being categorized correctly
Check that subfolder organization looks right (images → images/, documents → documents/, etc.)
Run without --dry-run and verify the organized folder was created with proper subfolders

