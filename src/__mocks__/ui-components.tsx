import React from 'react';

export const Button = ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>{children}</button>
);

export const Input = (props: any) => <input {...props} />;

export const Badge = ({ children, onClick, ...props }: any) => (
    <div onClick={onClick} data-testid="badge" {...props}>{children}</div>
);
