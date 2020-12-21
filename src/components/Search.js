import React, { useState } from 'react';
import { Button, TextField, LinearProgress } from '@material-ui/core';

import styled from 'styled-components';

import shrtcode from '../apis/shrtcode';
import DisplayLink from './DisplayLink';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const HTTP_URL_VALIDATOR_REGEX = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

const Search = () => {
  const [link, setLink] = useState('');
  const [short, setShort] = useState('');
  const [loading, setLoading] = useState(false);

  // Submit form function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkLink(link)) {
      getLink(link);
      setLink('');
      setLoading(!loading);
    }
  };

  // Link Validation Function
  const checkLink = (string) => {
    // Regex to check if string is a valid URL
    return string.match(HTTP_URL_VALIDATOR_REGEX);
  };

  // Function that calls the API if link is valid
  const getLink = async () => {
    await shrtcode
      .get(`shorten?url=${link}`)
      .then((response) => {
        setShort(response.data.result.short_link);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <StyledForm onSubmit={(e) => handleSubmit(e)} autoComplete='off'>
        {/* <Label htmlFor='input'>Long Link Here:</Label> */}
        <TextField
          style={{ marginBottom: '20px' }}
          label='Link'
          variant='outlined'
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        {!loading && (
          <Button
            onClick={(e) => handleSubmit(e)}
            variant='contained'
            color='primary'
          >
            Submit
          </Button>
        )}

        {loading && <LinearProgress />}
      </StyledForm>
      {short && (
        <>
          <h2>Short Link: </h2>

          <DisplayLink shortend={short} />
        </>
      )}
    </>
  );
};

export default Search;
