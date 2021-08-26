import {Container} from './styles/coordinates'

export default function Coordinates({ children, ...restProps }) {
    return (
        <Container { ...restProps }>{ children }</Container>
    )
}
