// components/ui/Text.tsx
import React from 'react';
import clsx from 'clsx';

type TextProps = React.HTMLProps<HTMLParagraphElement | HTMLHeadingElement>;

export const Text = ({ className, ...props }: TextProps) => {
  return <span className={clsx("text-base text-gray-700", className)} {...props} />;
};

