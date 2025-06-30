import { Link as ExpoLink, LinkProps as ExpoLinkProps } from 'expo-router';
import { FC } from 'react';
import { cn } from '../utils/cn';

type LinkProps = ExpoLinkProps & {
  title: string;
};

export const Link: FC<LinkProps> = ({ title, className, ...props }) => {
  return (
    <ExpoLink {...props} className={cn('text-accent', className)}>
      {title}
    </ExpoLink>
  );
};
