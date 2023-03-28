import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Inter', sans-serif;
    background: ${(props) => props.theme['gray-600']};
    color: ${(props) => props.theme['gray-300']};
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }

  button {
    cursor: pointer
  }

  :focus {
      outline: 0;
      box-shadow: 0 0 0 2px ${(props) => props.theme['gray-400']};
    }
`
