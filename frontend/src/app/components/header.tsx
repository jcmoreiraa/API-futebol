import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <header className='p-2 bg-black text-white text-[30px] drop-shadow-2xl shadow-white items-center justify-around flex'>
      <Link href='https://thmestatistica.com' className='text-white cursor:pointer px-14' >
        THM
      </Link>
      <Link href={'../'} className='text-[24px]'> 
      Home
      </Link>

      <Link href={'../times'} className='text-[24px]'>
      Times do Campeonato
      </Link>
      <Link href={'../jogadores'} className='text-[24px]'>
      Jogadores
      </Link>
      <Link href={'../partidas'}>
      Partidas</Link>
    </header>
  );
}

export default Header;
