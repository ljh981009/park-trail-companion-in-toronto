import React from 'react';

export const Button = ({ children, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button onClick={onClick} {...props}>{children}</button>
);

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} />;

export const Badge = ({ children, onClick, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div onClick={onClick} data-testid="badge" {...props}>{children}</div>
);
