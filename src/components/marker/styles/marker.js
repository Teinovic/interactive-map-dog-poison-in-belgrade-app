import styled from "styled-components";

export const MarkerDiv = styled.div`
    width:0;
    height:0;
`

export const Span = styled.span`
    display:flex;
    justify-content:center;
    align-items:center;
    box-sizing:border-box;
    width: 30px;
    height: 30px;
    color:#fff;
    background: #4D2D73;
    border:solid 2px;
    border-radius: 0 70% 70%;
    box-shadow:0 0 2px #000;
    cursor: pointer;
    transform-origin:0 0;
    transform: rotateZ(-135deg);
`

export const Bold = styled.b`
    transform: rotateZ(135deg)
`

export const TemporarySpan = styled.span`
    background: #D3D3D3;
`