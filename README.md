# WeatherApp

## How to setup

``` bash
# From the root project directory...
make initial-setup
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
