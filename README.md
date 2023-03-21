Steps to be followed after cloning the repo:

## Installation

Add the neccesary use node version `16.13.1` and npm version `8.1.1`

```bash
npm install
```

## Starting the Application

Kindly run start redis in your background. Then run the following commands

```bash
npm start
```

the server now runs on `http://localhost:3000`

## Using Module Styles

Currently we support module css in Wap i.e) you can directly import styles in your `jsx,tsx,` file. This not only creates local scope but also give `87.1%` [global coverage](https://browserl.ist/?q=last+2+version) for browsers.

To use this feature follow the below steps.

```javascript
import style from '../styles';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function component(props) {
  return <div className={cx('header', { toggle: props.toggle })}></div>;
}
```

## Adding Svg Icons

Install svgr cli in your system [SVGR CLI](https://react-svgr.com/docs/cli/). Then run the following commands npx @svgr/cli `ICON NAME`. For example if you have a file named `trackIcon.svg` in your current folder then run

```sh
npx @svgr/cli SvgHelp.svg
```

in your terminal. Then copy paste the generated react file

```javascript

const SvgHelp = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
    </svg>
  );
};

export default SvgHelp;
```

in the `src/icons` folder, so that you can later import it in your application.
