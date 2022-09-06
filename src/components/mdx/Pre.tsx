import styled from 'styled-components'

const CodeBlock = styled.pre`
    background-color: #1e1e1e;
    padding: 10px;
    border-radius: 5px;
    display: block;
    overflow-x: auto;

    code {
      color: #fff;
      background-color: #1e1e1e;
      line-height: 1.75rem;
      font-family: Roboto
      white-space: pre-line;
      padding: 0px;
    }

    @media (max-width: 768px) {
     code {
      font-size: .75rem;
      line-height: 1.5rem;
     }
    }
`

export default CodeBlock;