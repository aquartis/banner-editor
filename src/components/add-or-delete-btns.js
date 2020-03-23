import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import PropTypes from 'prop-types';


const AddOrDeleteBtns = ({ active, func }) => {
  AddOrDeleteBtns.propTypes = {
    active: PropTypes.shape({
      add: PropTypes.bool.isRequired,
      delet: PropTypes.bool.isRequired
    }).isRequired,
    func: PropTypes.shape({
      addNewBanner: PropTypes.func.isRequired,
      deleteBanner: PropTypes.func.isRequired
    }).isRequired
  };

  const plusIcon = <FontAwesomeIcon icon={faPlus} />;
  const deleteIcon = <FontAwesomeIcon icon={faTrashAlt} />;
  const addBtn = active.add ? (
    <Button onClick={() => func.addNewBanner()} disabled>
      <span>{plusIcon}</span>
      Add
    </Button>
  )
    : (
      <Button onClick={() => func.addNewBanner()}>
        <span>{plusIcon}</span>
        Add
      </Button>
    );

  const deleteBtn = active.delet ? (
    <Button onClick={() => func.deleteBanner()}>
      <span>{deleteIcon}</span>
      Delete
    </Button>
  )
    : (
      <Button display="none" onClick={() => func.deleteBanner()}>
        <span>{deleteIcon}</span>
        Delete
      </Button>
    );
  return (
    <ButtonsSection>
      <ButtonsContainer>
        {addBtn}
        {deleteBtn}
      </ButtonsContainer>
    </ButtonsSection>

  );
};

const ButtonsSection = styled.div`
position:absolute;
 width:30%;
 height:30vh;
 display:flex;
 flex-direction:column;
 justify-content: center;
 right:0;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin:0 auto;
  width:30%;
  height: 100%;
  align-items: flex-end;
  justify-content: center;
`;
const Button = styled.button`
    display:${(props) => props.display || 'block'}
    width: 100%;
    height: 50px;
    margin:0.5rem;
    font-size:1.5rem;
    text-align: center;
    background: transparent;
    border:2px solid #000;
    border-radius:3px;
    box-shadow: 7px 10px 5px 0px rgba(0,0,0,0.75);
`;

export default AddOrDeleteBtns;
