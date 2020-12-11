# Tidy Components

Tidy Components is a Figma plugin that organizes all of the components and variants in alphabetical order on your page in a tidy manner.

![](TidyComponentsDemo.gif)


## Getting Started

When you first open the plugin, you are presented with a set of pre-defined parameters that can be used as-is to show you what is possible. 

## Options

| Parameter | Description | Value |
|----------|-------------|------|
| `Direction` | The direction in which the components groups will be laid out. | _Horizontal_, Vertical |
| `Levels` | The hierarchy levels in which your components will be organized. | 1 to 100 |
| `Margin` | Distance between each group. | Number in pixels |
| `Gutter` | Distance between each component. | Number in pixels |
| `Display Title` | The parent category name will be displayed before of each group. | _checked_, unchecked |
| `Rename duplicates` | If multiple components have the exact same name, they will be renamed with incremental numbers. | checked, _unchecked_ |
| `Zoom to center` | After cleaning up your 💩, view will zoom out to show all components. | _checked_, unchecked |
| `Sort alphabetically` | Tidy will sort your components and variants alphabetically. | checked, _unchecked_ |

## Found a bug or have an idea?

This is a team of **one**, but if you have any good ideas or constructive feedback, please do not hesitate to share your thoughts [by creating a new issue](https://github.com/cross-team/figma-tidy-components/issues/new) - screen captures are welcomed.

## Show your support

If you find this plugin useful, feel free to [buy me a 🍺](https://www.patreon.com/mpaiva) at my Patreon page. Thanks! 🙏
 
## Contribute
- Run `yarn` to install dependencies.
- Run `yarn build:watch` to start webpack in watch mode.
- Open `Figma` > `Plugins` > `Development` > `New Plugin...` and choose manifest.json file from this repo.
- Create a Pull Request for your branch
