import React from 'react';
export const Badge = ({ children, onClick, ...props }: any) => (
    <div onClick={onClick} data-testid="badge" {...props}>{children}</div>
);
