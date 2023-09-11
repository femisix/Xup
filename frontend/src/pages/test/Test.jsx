import React, { useContext } from 'react';
import { AuthContext } from '../../AuthContext';

const Test = () => {
  const { state } = useContext(AuthContext);
  const { user } = state;
  return <div>{user.userName}</div>;
};

export default Test;
