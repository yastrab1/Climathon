import React from 'react';

interface Props {
  text: string;
  component: React.ReactNode;
  count: number;
}

export default function Category({ text, component, count }: Props) {
    return (
        <button className="p-3 gap-4 bg-white rounded-lg flex flex-row items-center text-xl font-sans font-medium shadow-xl">
          {component} <div className="flex justify-between w-full text-sm items-center"><div>{text}</div><div>{count}</div></div>
        </button>
    );
}