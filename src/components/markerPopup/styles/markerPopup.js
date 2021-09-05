import styled from 'styled-components'

export const Container = styled.div`
    display: block;
    position: absolute;
    background-color: white;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: auto;
    padding: 1rem;
    border-radius: 15%;
    width: 200px;
` 
export const Coord = styled.p`

`
export const Input = styled.input`

` 
export const ConfirmationButton = styled.a`
    text-align: left;
    text-decoration: none;
    font-size: 1rem;
    display: block;
    padding: 0.2;
    margin-bottom: 0.5rem;
    color: black;
    :hover,
    :focus {
        color: #5DE0D3;
        cursor: pointer;
    }
` 
export const CancelButton = styled.button`

` 

