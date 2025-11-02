* Instructions to Run the Game:-
  
Step 1: Open the Settings Page

Open settings.html in your browser.
(Right-click → Open with → Chrome/Edge)

Enter:

The URL or local path for Image 1 (original)

The URL or local path for Image 2 (modified)

Click “Load Images” — both images appear side by side.

Click on each difference area you want to mark.

A red circle appears on both images.

Each click adds a new “difference” coordinate.

click “Export JSON”.
This downloads a file called config.json.

Move that downloaded config.json file into your main project folder (same place as index.html).

Step 2: Play the Game

Open index.html in your browser.
You’ll see both images side by side.

Click on the differences you remember.

If you click correctly, a red circle appears on both images.

Your score increases each time.

When all differences are found, a success message appears:

🎉 Congratulations! You found all differences!

* How the Game Uses the config.json File:- 

The config.json file defines everything the game needs to run — images + difference coordinates.

Example:

{
  "image1": "images/original.jpg",
  "image2": "images/modified.jpg",
  "differences": [
    { "x": 120, "y": 150, "radius": 30 }
    { "x": 300, "y": 220, "radius": 25 },
    { "x": 450, "y": 100, "radius": 35 }
  ]
}
