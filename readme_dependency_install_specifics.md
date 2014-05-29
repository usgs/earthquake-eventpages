Readme dependencies

---
### Windows ###

1. You will need a terminal tool for Windows. I used [Git Bash][] to test these
   steps, but [Cygwin][] or another unix like editor should work fine too.
  1. Download [Git Bash][].
  2. Click **Next** on the welcome screen.
  3. Click **Next** to acknowledge the license.
  4. Click **Next** to keep the default directory.
  5. Click **Next** to Select Components.  
     You may add Quick Launch and Desktop icons here if you'd like.
  6. Click **Next** to confirm the Start Menu Folder.
  7. PATH environment. I recommend the __last option__ here to include Unix
     tools, but if you don't understand what that entails use the
     _second option_ which still adds Git to your system PATH then click **Next**.
  8. Line Ending Conversion. Keep the first option selected, click **Next**.
  9. Click **Finish** when the installation is complete.

1. Install the newest release of [Node][] for Windows, using the Windows
   Installer (.msi).
  1. Click **Next** on the welcome screen.
  1. Accept the License Agreement, then click **Next**.
  1. Click **Next** to keep the default directory.
  1. Click **Next** to intall the default features of Node.
  1. Click **Install** to begin the installation.
  1. Click **Finish** when the installation is complete.

1. Install the newest release of [Ruby][] for Windows, using the executable.
  1. Select your language of choice, then click **OK**.
  1. Accept the License Agreement, then click **Next**.
  1. Select the check box to Add Ruby to your PATH then click **Install**.
  1. Click **Finish** when the installation is complete.

1. Install PHP, from zip.
  1. Download the appropriate zip file from http://windows.php.net/download/
  1. Unzip the folder and copy the contents into a new folder on your C:\ drive.
     `C:\php54`
  1. Add PHP to your PATH.
    1. Right-Click on **My Computer** (or **Computer**) -> **Properties**.
    1. Click **Advanced system settings**.
    1. Click the **Advanced** tab at the top.
    1. Click on **Environment Variables...*.
    1. Find **Path** under the **System variables**, then click **Edit...*
    1. Make sure there is a **;** (semi-colon) after the last item in the list, then add
       `C:\php54;`

1. Close and re-open your terminal so that your new PATH is loaded.  
   Make sure to navigate back to your `geomag-baseline-calculator` project directory.
   `git config --global url."https://".insteadOf git://`  

[Git Bash]: http://git-scm.com/download/win
[Cygwin]: http://cygwin.com/install.html
[Node]: http://nodejs.org/download/
[Ruby]: http://rubyinstaller.org/

---
### Mac ###

1. install xcode  
   `https://developer.apple.com/xcode/`

2. install homebrew  
   `http://mxcl.github.io/homebrew/`

3. Use homebrew to install node, git, ruby, and php  
   `brew install node`  
   `brew install git`  
   `brew install ruby`  
   `brew tap josegonzalez/php`  
   `brew install php54`  

3. Use npm to install grunt.
   `npm install -g grunt-cli`  

4. Update paths as needed in your `~/.bash_profile`:  
   `# brew installed binaries`  
   `export PATH=$PATH:/usr/local/bin`  
   `# npm installed binaries`  
   `export PATH=$PATH:/usr/local/share/npm/bin`  
   `# gem installed binaries`  
   `export PATH=$PATH:/usr/local/opt/ruby/bin`  

5. Close and re-open your terminal so that your new PATH is loaded.  
   Make sure to navigate back to your `geomag-baseline-calculator` project directory.
