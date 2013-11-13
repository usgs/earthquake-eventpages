GIT INSTALL

### Fork the project repository ###

1. Fork the project into your GitHub user account.
  1. Sign in to GitHub.
  2. Go to `https://github.com/usgs/geomag-baseline-calculator`.
  2. Click the **Fork** button near the top right of the page.

1. Make sure you Add an SSH Key to GitHub for the computer you're 
   working on into your GitHub account, see below for specifics.

1. Clone from fork (update for your fork).
   Navigate to the _HOME_ directory that you want to use for projects.
   Replace `[your username]` with your GitHub username.
   ```git clone git@github.com:[your username]/earthquake-eventpages.git 
   earthquake-eventpages```
   ```cd earthquake-eventpages```

1. Add upstream remote for primary (use terminal)
   ``` 
   git remote add upstream git@github.com:usgs/earthquake-eventpages.git
   ```
   Check your remotes with `git remote -v`, it should look like this
   ```origin  git@github.com:[your username]/earthquake-eventpages.git (fetch)```
   ```origin  git@github.com:[your username]/earthquake-eventpages.git (push)```
   ```upstream        git@github.com:usgs/earthquake-eventpages.git (fetch)```
   ```upstream        git@github.com:usgs/earthquake-eventpages.git (push)```


### Add an SSH Key to GitHub ###

  1. `ssh-keygen -t rsa -b 2048` (in terminal)
  2. Press **Enter** to accept the default save location.
  3. Enter a passphrase that you will remember.
  4. `cat ~/.ssh/id_rsa.pub`  
     Copy the text block that is displayed.
     This is your SSH key.  
     If you're on Window and can't copy the text from the terminal, go
     to `C:\Users\[your username here]\.ssh` and open the `id_rsa.pub` file
     with notepad.
  5. In GitHub, click **Edit Your Profile**.
  6. Select **SSH Keys** on the left.
  7. Click **Add SSH key**. Give it a meaningful title.
  8. Copy your SSH Key into the Key, and click **Add key**.
