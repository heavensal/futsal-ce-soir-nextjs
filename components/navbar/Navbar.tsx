"use client"; // S'assure que ce module est exécuté côté client seulement.

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

import { signIn, signOut, useSession  } from 'next-auth/react';



export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const { data: session } = useSession()



  return (
    <header className="sticky top-0 z-30">
      <nav className="h-16 bg-opacity-20 shadow-lg backdrop-blur-md flex justify-between">
        {/* Logo et lien d'accueil */}
        <div className="flex items-center ml-4">
          <Link href="/" aria-label='Accueil'>
              <Image src="/ballon.png" alt="Logo Futsal Ce Soir" width={40} height={40} />
          </Link>
        </div>

        {/* Bouton de menu pour mobile */}
        <div className="flex items-center mr-4">
          <button className="flex items-center px-3 py-2 border rounded text-white border-white" aria-label="Open menu" onClick={toggleMenu}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

        {/* Off-canvas menu */}
        <div className={`navbar-offcanvas overflow-x-hidden fixed top-0 right-0 h-screen w-4/5 shadow-md z-50 transition-transform duration-300 bg-lime-800 ${isOpen ? "" : "translate-x-full"}`}>

        <div className='grid grid-cols-2'>
            <div className='flex items-center justify-center border border-yellow-600'>
              <Image src={session?.user?.image || "/default-avatar.png"} alt={session?.user?.name || "User Avatar"} width={50} height={50} />
              <p>{session?.user?.name}</p>
            </div>
          <div className="flex justify-end items-center p-4">
            <button className="flex items-center px-3 py-2 border rounded text-white border-white" aria-label="Close menu" onClick={toggleMenu}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>


          <ul className="p-4">

            <li className="off-canvas-menu-item my-2 text-center">
              <button onClick={()=> signIn("google", { redirectTo: "/"})} className="px-2 py-1 rounded-lg inline-block duration-150 hover:bg-white hover:text-green-800">
                  Connexion
              </button>
            </li>

            <li className="off-canvas-menu-item my-2 text-center">
              <button onClick={()=> signOut({ redirectTo: "/"})} className="px-2 py-1 rounded-lg inline-block duration-150 hover:bg-white hover:text-green-800">
                  Déconnexion
              </button>
            </li>


            <li className="off-canvas-menu-item my-2">
              <Link href="/events" onClick={toggleMenu} className="px-2 py-1 rounded-lg inline-block w-full duration-150 hover:bg-white hover:text-green-800">
                  Créer un Evénement Futsal
              </Link>
            </li>

            <li className="off-canvas-menu-item my-2">
              <Link href="/dashboard" onClick={toggleMenu} className="px-2 py-1 rounded-lg inline-block w-full duration-150 hover:bg-white hover:text-green-800">
                  Mon Profil
              </Link>
            </li>

            <li className="off-canvas-menu-item my-2">
              <Link href="/" onClick={toggleMenu} className="px-2 py-1 rounded-lg inline-block w-full duration-150 hover:bg-white hover:text-green-800">
                  Tous les Futsals
              </Link>
            </li>

            <li className="off-canvas-menu-item my-2">
              <Link href="/events" onClick={toggleMenu} className="px-2 py-1 rounded-lg inline-block w-full duration-150 hover:bg-white hover:text-green-800">
                  Mes Futsal
              </Link>
            </li>

            <li className="off-canvas-menu-item my-2">
              <Link href="/friends" onClick={toggleMenu} className="px-2 py-1 rounded-lg inline-block w-full duration-150 hover:bg-white hover:text-green-800">
                  Mes Amis
              </Link>
            </li>

            <li className="off-canvas-menu-item my-2">
              <Link href="/" onClick={toggleMenu} className="px-2 py-1 rounded-lg inline-block w-full duration-150 hover:bg-white hover:text-green-800">
                  Mes Invitations
              </Link>
            </li>

            <li className="off-canvas-menu-item my-2">
              <Link href="/" onClick={toggleMenu} className="px-2 py-1 rounded-lg inline-block w-full duration-150 hover:bg-white hover:text-green-800">
                  Espace Discussion
              </Link>
            </li>
          </ul>

          <div id="choose-status" className='grid grid-cols-2 px-8'>
            <button className="px-2 py-1 bg-green-600 border-green-800 border-2 w-full">
                Agent Libre
            </button>
            <button className="px-2 py-1 bg-green-600 border-green-800 border-2 w-full">
                Joueur Privé
            </button>
          </div>

        </div>

        {/* Overlay pour mobile menu */}
        <div id="overlay" className={`fixed inset-0 h-screen bg-black bg-opacity-50 z-40 ${isOpen ? "block" : "hidden"}`} onClick={toggleMenu}></div>
      </nav>
    </header>
  );
}
