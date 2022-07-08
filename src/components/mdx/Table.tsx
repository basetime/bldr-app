import styled from 'styled-components'

const Table = styled.table`
    th {
      text-align: left;
      border-bottom: 1px solid #1e1e1e;
    }

    tr {
      line-height: 1.5rem
    }

    tr td {
      padding-right:4rem;
    }

    th, tr, td {
      font-family: Roboto;  
    }
`

export default Table;