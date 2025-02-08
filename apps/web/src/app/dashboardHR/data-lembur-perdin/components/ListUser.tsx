'use client';

import useGetAllUser from '@/hooks/adminHR/useGetAllUser';
import React from 'react';
import CardUser from './CardUser';

const ListUser = () => {
  const { data: dataUsers } = useGetAllUser();

  return (
    <div className="flex gap-10 flex-wrap">
      {dataUsers?.response.map((user) => {
        return <CardUser key={user.id} id={user.id} name={user.name} />;
      })}
    </div>
  );
};

export default ListUser;
