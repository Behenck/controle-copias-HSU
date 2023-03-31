import styled from 'styled-components'

export const NewDepartment = styled.form`
  width: 100%;
  max-width: 46rem;
  margin-top: -1.675rem;
  display: flex;
  gap: 0.5rem;
  padding: 0 1rem;

  input {
    width: 100%;
    padding: 1rem;

    background: ${(props) => props.theme['gray-500']};
    color: var(--gray-300);
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme['gray-700']};
    font-size: 1.2rem;

    &:first-child {
      width: 20%;
    }
  }
`

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  color: ${(props) => props.theme.white};

  transition: all 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`

export const ButtonEdit = styled(Button)`
  background: ${(props) => props.theme['purple-700']};
`
export const ButtonCreate = styled(Button)`
  background: ${(props) => props.theme['blue-700']};
`

export const Created = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  p {
    color: ${(props) => props.theme['blue-500']};
  }
`

export const Container = styled.div`
  width: 100%;
  max-width: 46rem;
  margin-top: 4rem;
  padding: 0 1rem 0.5rem 1rem;
`

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
`

export const Counter = styled.span`
  background: ${(props) => props.theme['gray-300']};
  color: ${(props) => props.theme['gray-700']};
  border-radius: 45%;
  padding: 0.125rem 0.5rem;
`

export const Done = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  p {
    color: ${(props) => props.theme['purple-500']};
  }

  a {
    color: ${(props) => props.theme['gray-300']};
    transition: all 0.2s;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &:hover {
      filter: brightness(0.9);
    }
  }
`

export const Content = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

// export const Content = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   margin-top: 2rem;
//   padding: 4rem;
//   border-top: 1px solid ${(props) => props.theme['gray-500']};
//   border-radius: 8px;

//   img {
//     margin-bottom: 1rem;
//     width: 3.5rem;
//     height: 3.5rem;
//   }

//   &::first-of-type {
//     font-weight: bold;
//   }
// `

// export const Select = styled.select`
//   width: 100%;
//   padding: 0 1rem;
//   background: ${(props) => props.theme['gray-500']};
//   color: var(--gray-300);
//   border-radius: 8px;
//   border: 1px solid ${(props) => props.theme['gray-700']};
//   font-size: 1.2rem;
// `

export const Row = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme['gray-500']};
  border-radius: 6px 0 0 6px;
  padding: 1rem;
  border: 1px solid ${(props) => props.theme['gray-400']};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;

  div {
    &:first-child {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.275rem;
    }

    div {
      margin-left: 0.5rem;

      &:last-child {
        width: 5rem;
      }
    }
  }
`

export const Box = styled.div`
  width: 100%;
  display: flex;
`

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    display: flex;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;

    svg {
      transition: all 0.2s;
      &:hover {
        filter: brightness(0.6);
      }
    }
  }
`

export const DepartmentName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;

  span {
    color: ${(props) => props.theme['gray-200']};
    font-size: 0.75rem;
  }
`
