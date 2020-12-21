import React, { useState } from 'react';
import shrtcode from '../apis/shrtcode';

import { Input } from './view/Input';
import { Label } from './view/Label';
import { Button } from './view/Button';
import DisplayLink from './DisplayLink';

const Search = () => {
  const [link, setLink] = useState('');
  const [short, setShort] = useState('');

  const checkLink = (string) => {
    const res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    if (res) {
      getLink();
    } else {
      setShort('Please add a Vaild Link');
    }
  };

  const getLink = async () => {
    await shrtcode
      .get(`shorten?url=${link}`)
      .then((response) => {
        setShort(response.data.result.short_link);
      })
      .catch((error) => {
        setShort('Please add a Vaild Link');
      });
  };

  return (
    <>
      <Label htmlFor=''>Long Link Here:</Label>
      <Input type='text' onChange={(e) => setLink(e.target.value)} />
      <Button onClick={() => checkLink(link)}>Get Link</Button>
      {short && <DisplayLink shortend={short} />}
    </>
  );
};

export default Search;
