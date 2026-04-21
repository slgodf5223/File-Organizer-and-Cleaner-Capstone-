# File-Organizer-and-Cleaner-Capstone-
This project proposal focuses on the development of a File Organizer and Cleaner. This project will revolve around a software application that is used to scan selected directories and automatically organize such files into a respected folder dependent on the file type.

## Web Demo
A static website prototype is available in this repository:

- `index.html`
- `styles.css`
- `script.js`

### Local usage
1. Open `index.html` in your browser.
2. Enter file names separated by commas.
3. Click **Organize** to view the suggested category distribution.

### Notes
- This demo is browser-based and does not move files (security restrictions).
- For real folder scanning and file moves, use `organizer.js` in Node.js.


## Node.js CLI organizer
A command-line organizer is available in `organizer.js`.

Run:

```bash
node organizer.js <source_directory> [--recursive] [--dry-run] [--dest <folder>]
```

- `--recursive`: scan subfolders
- `--dry-run`: show moves without executing
- `--dest <folder>`: output folder name inside source (default: `organized`)

### Example

```bash
node organizer.js "C:\\Users\\You\\Downloads" --recursive --dry-run
```


