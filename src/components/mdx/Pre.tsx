import styled from 'styled-components'

const CodeBlock = styled.pre`
    background-color: #1e1e1e;
    padding: 20px;
    border-radius: 5px;
    display: block;
    overflow-x: auto;
    margin-right: 25px;
    margin-left: 25px;

    code {
      color: #fff;
      line-height:1.5rem;
      font-family: Roboto
    }
`

export default CodeBlock;