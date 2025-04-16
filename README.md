Do you push to GitHub after every change?

No, definitely not. Pushing after every single change is generally a bad idea. Here's why and what you should do instead:

Why not push after every change?

Too frequent pushes:
Creates a lot of noise in the repository's history, making it harder to track meaningful changes.
Can trigger unnecessary builds or deployments if you have automated systems set up.
Interrupts your workflow and makes it difficult to work on a feature cohesively.
Incomplete/broken code:
You might push code that's in a broken or incomplete state, which can disrupt collaborators or cause issues if the code is deployed.
Best Practices for Local Development and Pushing

Here's a recommended workflow:

Work on a Feature/Task:

Make several changes to your code as you develop a specific feature or fix a bug. This might involve modifying multiple files (index.html, space-to-brain.js, styles.css in your case).
Focus on getting that feature or fix working correctly on your local machine.
Use VS Code to edit your files, test your changes in a browser, and debug as needed.
Stage Your Changes:

Once you have a set of related changes that work together and accomplish a specific goal, use git add to stage the files you want to include in your commit.
git add . (adds all changes in the current directory)
git add <file_name> (adds a specific file)
Use VS Code's Source Control panel for a visual way to stage changes.
Commit Your Changes:

Create a commit with a clear and concise message that describes the changes you made.
git commit -m "Implemented scrolling animation for layers" (Good)
git commit -m "changes" (Bad)
Commits should be logical units of work. Each commit should bring the codebase to a working state.
VS Code provides an interface for writing commit messages.
Repeat Steps 1-3:

Continue working on your project, making changes, staging, and committing locally.
You'll likely have multiple local commits before you're ready to push.
Push to GitHub:

When you're ready to share your changes with others, back up your work, or integrate with the remote repository, use git push.
This is typically done:
When a feature is complete.
At the end of a work session.
Before collaborating with others.
Before deploying your code.
Example Scenario with Your Files

Let's say you want to:

Change the background color of your website.
Adjust the scaling of the "earth" layer.
Here's how you might approach it:

Change Background Color:

Edit styles.css to change the background property of the body.
Test the change in your browser.
Adjust Earth Scaling:

Edit space-to-brain.js to change the scale value for the "earth" layer in the textures array.
Test the change in your browser.
Stage Changes:

git add styles.css space-to-brain.js or git add .
Commit Changes:

git commit -m "Updated background color and adjusted earth layer scaling"
Push (when ready):

git push origin main
Branching (Advanced but Highly Recommended)

For larger projects or when collaborating, using Git branches is essential:

Create a branch for each feature/bug fix:
git checkout -b feature/new-animation
Work on the branch: Make your changes, stage, and commit.
Push the branch: git push origin feature/new-animation
Merge the branch into the main branch (using GitHub's Pull Requests).
Key Takeaways

Commit frequently locally, with clear messages.
Push less frequently, when you have a complete unit of work.
Use branches to isolate features and facilitate collaboration.
By following these practices, you'll maintain a clean and organized Git history, making your development process smoother and more efficient.
