import React from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { FaBook, FaGavel, FaInfo, FaCheck } from 'react-icons/fa';



export const links = [
  {
    title: 'Flota',
    links: [
      {
        name: 'Przegląd',
        path: 'bus/list',
        icon: <FaBook />,
      },
    ],
  },

  {
    title: 'Kierowcy',
    links: [
      {
        name: 'Przegląd',
        path: 'user/list',
        icon: <FaBook />,
      },
    ],
  },
  {
    title: 'Linie Autobusowe',
    links: [
      {
        name: 'Linie',
        path: 'busline/list',
        icon: <FaInfo />,
      },
      {
        name: 'Rejestracja Linii',
        path: 'busline/list',
        icon: <FaInfo />,
      },
      {
        name: 'Przystanki',
        path: 'busstop/list',
        icon: <FaCheck />,
      },
    ],
  },
];

export const adminLinks = [
  {
    title: 'Użytkownicy',
    links: [
      {
        name: 'Lista',
        path: '',
        icon: <FaBook />,
      },
      {
        name: 'Dodaj',
        path: 'register',
        icon: <FaBook />,
      },
    ],
  },
];

export const driverLinks = [
  {
    title: 'Zarządzaj',
    links: [
      {
        name: 'Moja trasa',
        path: '',
        icon: <FaBook />,
      },
      {
        name: 'Urlop',
        path: 'usterka',
        icon: <FaGavel />,
      },
      {
        name: 'Informacje',
        path: 'stanPojazdu',
        icon: <FiShoppingBag />,
      },
    ],
  },
];

export const mechanicLinks = [
  {
    title: 'Flota',
    links: [
      {
        name: 'Pojazdy',
        path: 'bus/list',
        icon: <FaBook />,
      },
      {
        name: 'Rejestracja pojazdu',
        path: 'bus/register',
        icon: <FaGavel />,
      },
    ],
  },
];

export const apiUrl = 'http://192.168.33.2:5000';

