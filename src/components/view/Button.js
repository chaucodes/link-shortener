import styled from 'styled-components';

export const Button = styled.a`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: gray;
  color: black;
  border: 2px solid white;
  cursor: pointer;

  :active {
    transform: translateY(0.9px);
  }
`;
