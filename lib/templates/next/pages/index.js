import { Button } from "@swim/shared"
// import Link from "next/link"
// import gql from "graphql-tag"
import styled from "styled-components"
// import { useQuery } from "@apollo/react-hooks"
// import { useRouter } from "next/router"
import { withApollo } from "../apollo/client"

// color: ${(props) => props.theme.colors.primary};
const Masthead = styled.div`
  color: ${({ theme }) => theme.colors.primary};
`
const Index = (props) => {
  return <h1>David's Pool Maintenance</h1>
}

export default withApollo(Index)

// TODO: Implement when you reach user registration process

// const ViewerQuery = gql`
//   query ViewerQuery {
//     viewer {
//       id
//       email
//     }
//   }
// `

// const Index = () =>
// {
//   const router = useRouter()
//   const { data, loading } = useQuery(ViewerQuery)

//   if (
//     loading === false &&
//     data.viewer === null &&
//     typeof window !== 'undefined'
//   ) {
//     router.push('/signin')
//   }

//   if (data && data.viewer) {
//     return (
//       <div>
//         You're signed in as {data.viewer.email} goto{' '}
//         <Link href="/about">
//           <a>static</a>
//         </Link>{' '}
//         page. or{' '}
//         <Link href="/signout">
//           <a>signout</a>
//         </Link>
//       </div>
//     )
//   }

//   return <p>Loading...</p>
// }
