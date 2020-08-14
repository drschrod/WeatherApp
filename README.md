# WeatherApp

## How to setup

### Mac
1. Install brew
    `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`
2. Install cocoapods via brew
    `brew install cocoapods`
3. Install xcode command line tools
4. Run initial setup
    ``` bash
    # From the root project directory...
    make initial-setup
    ```

### [Windows](https://reactnative.dev/docs/environment-setup)

_Note_: If you run VS Code as administrator, the terminal in the application will have admin priveliges

1. Run the following command in powershell (via admin priv. NOTE: You will need to restart your VS code session if using the terminal in that app): 
    ```powershell
    Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
    ```
2. Install needed packages: `choco install -y nodejs.install python2 jdk8 yarn`
3. [Install android studio](https://developer.android.com/studio)
4. Set env variables (TODO: Make this part of the makefile for ease of install)
    ```powershell
        $Env:ANDROID_HOME = "D:\Programs\android_studio_sdk"
    ``` 
    - Note: you want to use the path to wherever you installed the android studio sdk's
5. `yarn install`
6. `%ANDROID_HOME%/tools/bin/sdkmanager --licenses`
7. `yarn android`


``` bash
# From the root project directory...
make initial-setup
```

## How to run
Specifically how to run after initially setting up.
If you close the project or reboot your computer for whatever reason and want to start working on the project again use these commands:
```bash
make run-ios
```

## Linting:

To run the linter just run:

`make lint` or `make lint-fix`

The linter will catch and fix any syntax/styling errors for you

## Make auto completion in terminal
Run these set of commands if using ZSH
```
compaudit | xargs chmod g-w
echo `zstyle ':completion:*:*:make:*' tag-order 'targets'` >> ~/.zshrc
echo `autoload -U compinit && compinit` >> ~/.zshrc
```

If you're not using zsh, [reference this on instructions how to switch](https://www.howtogeek.com/444596/how-to-change-the-default-shell-to-bash-in-macos-catalina/) 
