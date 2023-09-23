import clsx from 'clsx';
import React from 'react';

import styles from './avatar.module.css';

export interface AvatarProps {
  /** User initials, e.g. John Smith = JS */
  initials: string;
  /** URL to the user avatar image */
  avatar?: string;
  className?: string;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  title?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  initials,
  avatar,
  style,
  textStyle,
  className,
  title,
}) => {
  if (avatar) {
    return (
      <img
        className={clsx(className, styles.avatar)}
        style={style}
        alt="user"
        src={avatar}
        title={title}
      />
    );
  }

  return (
    <div
      className={clsx(className, styles.avatar, styles.avatarPlaceholder)}
      style={{ backgroundColor: stringToHslColor(initials, 30, 80), ...style }}
      title={title}
    >
      <div className={styles.avatarInitials}>{initials}</div>
    </div>
  );
};

export function getUserName(
  user?: { firstName?: string; lastName?: string; email?: string },
  returnEmail?: boolean,
) {
  return user && (user.email || (user.firstName && user.lastName))
    ? user.firstName && user.lastName
      ? [user.firstName, user.lastName].join(' ')
      : returnEmail
      ? user.email
      : user.email.split('@')[0]
    : undefined;
}

export function getUserInitials(user?: {
  firstName?: string;
  lastName?: string;
  email?: string;
  fullName?: string;
}) {
  const { firstName, lastName, email, fullName } = user;
  if (firstName && lastName) {
    return firstName[0] + lastName[0];
  }
  if (firstName) {
    return firstName[0];
  }
  if (lastName) {
    return lastName[0];
  }
  if (email) {
    return email.slice(0, 2);
  }
  if (fullName) {
    const regex = /^[_aA-zZ0-9-]+(\.[_aA-zZ0-9-]+)*(\+[aA-zZ0-9-]+)?@[_aA-zZ0-9-]+(\.[_aA-zZ0-9-]+)*(\+[aA-zZ0-9-]+)?\.([aA-zZ0-9-]+)+$/;
    console.log(regex.test(fullName));
    if (regex.test(fullName)) {
      return fullName.slice(0, 2);
    }
    const arr = fullName.split(' ');
    return (arr[0] ? arr[0][0] : '') + (arr[1] ? arr[1][0] : '');
  }
  return '';
}

export function stringToHslColor(str: string, s: number, l: number) {
  var hash = 0;
  for (var i = 0; i < (str || '').length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  var h = hash % 360;
  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
}

export function randomColor() {
  let hex = Math.floor(Math.random() * 0xffffff);
  let color = '#' + hex.toString(16);

  return color;
}

export default Avatar;
