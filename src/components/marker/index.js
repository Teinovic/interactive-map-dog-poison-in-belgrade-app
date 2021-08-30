import { MarkerDiv, Span, Bold, TemporarySpan } from './styles/marker'

export default function MarkerContainer({ children, ...restProps }) {
    return (
        <MarkerDiv { ...restProps }>{ children }</MarkerDiv>
    )
}

MarkerContainer.Span = function MarkerSpan({ children, ...restProps }) {
    return (
        <Span { ...restProps }>{ children }</Span>
    )
}

MarkerContainer.Bold = function MarkerBold({ children, ...restProps }) {
    return (
        <Bold { ...restProps }>{ children }</Bold>
    )
}

MarkerContainer.TemporarySpan = function MarkerTemporarySpan({ children, ...restProps }) {
    return (
        <TemporarySpan { ...restProps }>{ children }</TemporarySpan>
    )
}