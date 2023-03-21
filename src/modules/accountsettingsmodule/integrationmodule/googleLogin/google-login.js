/* eslint-disable @typescript-eslint/no-unused-vars-experimental */
/* eslint-disable import/no-named-as-default-member */
import React, { useState } from 'react';
import { string, node, bool, func, object, array } from 'prop-types';
import useGoogleLogin from './use-google-login';
import ButtonContent from './button-content';
import Icon from './icon';

const GoogleLogin = (props) => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const {
    onSuccess,
    onAutoLoadFinished,
    onRequest,
    onFailure,
    onScriptLoadFailure,
    tag,
    type,
    className,
    disabledStyle,
    buttonText,
    children,
    render,
    theme,
    icon,
    disabled: disabledProp,
    clientId,
    cookiePolicy,
    loginHint,
    hostedDomain,
    autoLoad,
    isSignedIn,
    fetchBasicProfile,
    redirectUri,
    discoveryDocs,
    uxMode,
    scope,
    accessType,
    responseType,
    jsSrc,
    prompt,
  } = props;

  const { signIn, loaded } = useGoogleLogin({
    onSuccess,
    onAutoLoadFinished,
    onRequest,
    onFailure,
    onScriptLoadFailure,
    clientId,
    cookiePolicy,
    loginHint,
    hostedDomain,
    autoLoad,
    isSignedIn,
    fetchBasicProfile,
    redirectUri,
    discoveryDocs,
    uxMode,
    scope,
    accessType,
    responseType,
    jsSrc,
    prompt,
  });

  // if (render) {
  //   return render({ onClick: signIn, disabled })
  // }

  const initialStyle = {
    backgroundColor: theme === 'dark' ? 'rgb(66, 133, 244)' : '#fff',
    display: 'inline-flex',
    alignItems: 'center',
    color: theme === 'dark' ? '#fff' : 'rgba(0, 0, 0, .54)',
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, .24), 0 0 1px 0 rgba(0, 0, 0, .24)',
    padding: 0,
    borderRadius: 2,
    border: '1px solid transparent',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Roboto, sans-serif',
  };

  const hoveredStyle = {
    cursor: 'pointer',
    opacity: 0.9,
  };

  const activeStyle = {
    cursor: 'pointer',
    backgroundColor: theme === 'dark' ? '#3367D6' : '#eee',
    color: theme === 'dark' ? '#fff' : 'rgba(0, 0, 0, .54)',
    opacity: 1,
  };

  const defaultStyle = (() => {
    // if (disabled) {
    //   return Object.assign({}, initialStyle, disabledStyle)
    // }

    if (active) {
      if (theme === 'dark') {
        return Object.assign({}, initialStyle, activeStyle);
      }

      return Object.assign({}, initialStyle, activeStyle);
    }

    if (hovered) {
      return Object.assign({}, initialStyle, hoveredStyle);
    }

    return initialStyle;
  })();
  const googleLoginButton = React.createElement(
    tag,
    {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => {
        setHovered(false);
        setActive(false);
      },
      onMouseDown: () => setActive(true),
      onMouseUp: () => setActive(false),
      onClick: signIn,
      style: defaultStyle,
      type,
      className,
    },
    [
      icon && <Icon key={1} active={active} />,
      <ButtonContent icon={icon} key={2}>
        {children || buttonText}
      </ButtonContent>,
    ],
  );

  return googleLoginButton;
};

GoogleLogin.propTypes = {
  onSuccess: func.isRequired,
  onFailure: func.isRequired,
  onScriptLoadFailure: func,
  clientId: string.isRequired,
  jsSrc: string,
  onRequest: func,
  buttonText: node,
  scope: string,
  className: string,
  redirectUri: string,
  cookiePolicy: string,
  loginHint: string,
  hostedDomain: string,
  children: node,
  disabledStyle: object,
  fetchBasicProfile: bool,
  prompt: string,
  tag: string,
  autoLoad: bool,
  disabled: bool,
  discoveryDocs: array,
  uxMode: string,
  isSignedIn: bool,
  responseType: string,
  type: string,
  accessType: string,
  render: func,
  theme: string,
  icon: bool,
};

GoogleLogin.defaultProps = {
  type: 'button',
  tag: 'button',
  buttonText: 'Sign in with Google',
  scope: 'profile email',
  accessType: 'online',
  prompt: '',
  cookiePolicy: 'single_host_origin',
  fetchBasicProfile: true,
  isSignedIn: false,
  uxMode: 'popup',
  disabledStyle: {
    opacity: 0.6,
  },
  icon: true,
  theme: 'light',
  onRequest: () => {},
};

export default GoogleLogin;
