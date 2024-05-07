import React from 'react';
import Link from 'next/link';

interface MenuItem {
  // icon: React.ElementType;
  text: string;
  href?: string;
}

const MenuCard = ({ items }: { items: MenuItem[] }) => {
  const itemsList = items.map((item, index) => (
    <React.Fragment key={index}>
      <Link href={item.href ? item.href : "/"}>
        <div className='flex gap-2 group hover:bg-gray-200 rounded-sm h-10 justify-items-start items-center gap-x-6 px-4'>
          {/* <item.icon className='group-hover:stroke-gray-600' /> */}
          {item.text}
        </div>
      </Link>
      {index === 3 && <hr className='my-2' />}
    </React.Fragment>
  ));

  return (
    <div className='flex-0 max-w-56'>
      {itemsList}
      <div className='flex gap-2 group hover:bg-gray-200 rounded-sm h-10 justify-items-start items-center gap-x-6 px-4'>
        <p>订阅</p>
      </div>
    </div>
  );
};

export default MenuCard;

