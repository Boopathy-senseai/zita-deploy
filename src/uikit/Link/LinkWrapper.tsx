import type { HTMLAttributeAnchorTarget, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  children: ReactNode;
  to?: string;
  className?: string;
  onClick?: (arg?: any) => void;
  target?: HTMLAttributeAnchorTarget;
  replace?: boolean;
};

const LinkWrapper = ({
  to,
  children,
  className,
  onClick,
  target,
  replace,
}: Props) => {
  const href = to || '/';
  return (
    <Link
      replace={replace}
      target={target}
      to={href}
      className={className}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

LinkWrapper.defaultProps = {
  to: '/',
  className: '',
  onClick: undefined,
  replace: false,
};
export default LinkWrapper;
