import React, { useState } from 'react';
import shrtcode from '../apis/shrtcode';

import { Input } from './view/Input';
import { Label } from './view/Label';
import { Button } from './view/Button';
import DisplayLink from './DisplayLink';

const Search = () => {
  const [link, setLink] = useState('');
  const [short, setShort] = useState('');

  // Link Validation Function
  const checkLink = (string) => {
    // Regex to check if string is a valid URL
    const res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    if (res) {
      getLink();
    } else {
      setShort('Please add a Vaild Link');
    }
  };

  // Function that calls the API if link is valid
  const getLink = async () => {
    await shrtcode
      .get(`shorten?url=${link}`)
      .then((response) => {
        setShort(response.data.result.short_link);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Label htmlFor='input'>Long Link Here:</Label>
      <Input id='input' type='text' onChange={(e) => setLink(e.target.value)} />
      <Button onClick={() => checkLink(link)}>Get Link</Button>
      {short && (
        <>
          <h2>Short Link:</h2>

          <DisplayLink shortend={short} />
        </>
      )}
    </>
  );
};

export default Search;
